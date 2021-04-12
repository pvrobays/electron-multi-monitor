import { BrowserWindow, BrowserWindowConstructorOptions, Event, Referrer } from "electron";
import Deferred from "./functions/Deferred";
import { newGuid } from "./functions/newGuid";
import { MainMonitor } from "./monitor/MainMonitor";
import { IMonitorFactory } from "./monitor/MonitorFactory";
import { MultiMonitorFactory } from "./MultiMonitorFactory";


export interface IMultiMonitor {
    readonly monitors: BrowserWindow[];

    openUrl(url: string, numberOfMonitors: number): Promise<void>;
    addMonitor(): Promise<boolean>;
    destroyAllMonitors(): void;
}

export class MultiMonitor implements IMultiMonitor {
    public static instance: IMultiMonitor = new MultiMonitorFactory().create();
    
    private _mainMonitor: MainMonitor | null;
    private _otherMonitors: BrowserWindow[];
    
    private _onNewWindowListeners: { [name: string]: Deferred<void> };
    
    constructor(
        private readonly monitorFactory: IMonitorFactory
    ) {
        this._otherMonitors = [];
        this._mainMonitor = null;
        this._onNewWindowListeners = {};
    }
    
    get monitors(): BrowserWindow[] {
        if (!this._mainMonitor) return this._otherMonitors;
        return [this._mainMonitor, ...this._otherMonitors];
    }
    
    openUrl = async (url: string, numberOfMonitors: number): Promise<void> => {
        if (numberOfMonitors < 1)
            throw new Error("numberOfMonitors should be at least 1");
        
        this.destroyAllMonitors();
        
        const { monitorFactory } = this;

        this._mainMonitor = monitorFactory.createMain(this, numberOfMonitors - 1);
        this.monitors.push(this._mainMonitor);

        // this._mainMonitor.webContents.openDevTools();

        //TODO: refactor to use webContents.setWindowOpenHandler
        this._mainMonitor.webContents.on('new-window', this.onNewWindow);

        await this._mainMonitor.loadURL(url);
    };

    addMonitor = async (): Promise<boolean> => {
        const { _mainMonitor, _onNewWindowListeners } = this;
        if (!_mainMonitor) return false;
        
        const guid = newGuid();
        const deferred = new Deferred<void>();
        _onNewWindowListeners[guid] = deferred;
        
        try {
            const result = await _mainMonitor.webContents.executeJavaScript(`window.electronMultiMonitor._addMonitor("${guid}");`);
            if (!result)
                return false;
        }
        catch (e) {
            console.error("remote executed code threw an exception:", e);
            return false;
        }
        
        await deferred.promise; // wait for the window to be opened, and created
        
        return true; //TODO PJ: add an event listener in the preload script, for when monitors change, that the react component can rerender
    };
    
    destroyAllMonitors = () => {
        const { monitors } = this;
        
        for (const monitor of monitors) {
            monitor.destroy();
        }
        
        this._mainMonitor = null;
        this._otherMonitors = [];
    };
    
    private onNewWindow = (event: Event, url: string, frameName: string, disposition: string, options: BrowserWindowConstructorOptions, additionalFeatures: string[], referrer: Referrer) => {
        console.debug(`on mainMonitor 'new-window' - url: ${ url } - frameName: ${ frameName }`);
        
        if (frameName.substr(0, 9) !== "MM-other-") {
            console.debug(`we're not interested in frame ${ frameName } since it doesn't start with 'MM-other'`);
            return;
        }
        
        const frameId = frameName.substring(9);
        console.debug(`on MainMonitor 'new-window' with frameId ${frameId}`);
        
        const { monitorFactory, _mainMonitor, _onNewWindowListeners } = this;

        monitorFactory.updateOptions(options);

        // @ts-ignore TODO: check to solve this typing issue
        options.webContents.once('dom-ready', (event: Event) => {

            // @ts-ignore TODO: check to solve this typing issue
            const browserWindow = BrowserWindow.fromWebContents(event.sender);
            
            if (!browserWindow) {
                console.warn(`Couldn't create a BrowserWindow from the event.sender`);
                return;
            }
            
            this.addOtherMonitor(browserWindow);
            
            // browserWindow.webContents.openDevTools();
            
            //TODO set bounds etc.
            browserWindow.setSize(1280, 1024);
            browserWindow.setPosition(1280, 0);
        });


        let domLoaded = false;
        // @ts-ignore TODO: check to solve this typing issue
        options.webContents.on('dom-ready', (event: Event) => {
            domLoaded = true;
            if (_onNewWindowListeners.hasOwnProperty(frameId)) {
                _onNewWindowListeners[frameId].resolve();
                delete _onNewWindowListeners[frameId];
            }
        });

        // @ts-ignore TODO: check to solve this typing issue
        options.webContents.on('will-navigate', (e, url) => {
            if (!_mainMonitor) return;
            if (_mainMonitor.webContents.getURL() === url && !domLoaded)
                return; //only pass the same url to the mainMonitor when the dom was already loaded
            console.info('Other window received url navigation which it will send to the main window:', url);
            e.preventDefault();
            domLoaded = false;
            _mainMonitor.loadURL(url);
        });
    }
    
    private addOtherMonitor(monitor: BrowserWindow) {
        this._otherMonitors.push(monitor);
    }
}