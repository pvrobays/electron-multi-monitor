import { BrowserWindow, BrowserWindowConstructorOptions, Event, Referrer } from "electron";
import { MainMonitor } from "./monitor/MainMonitor";
import { IMonitorFactory } from "./monitor/MonitorFactory";
import { MultiMonitorFactory } from "./MultiMonitorFactory";


export interface IMultiMonitor {
    readonly monitors: BrowserWindow[];

    openUrl(url: string, numberOfMonitors: number): Promise<void>;
    destroyAllMonitors(): void;
}

export class MultiMonitor implements IMultiMonitor {
    public static instance: IMultiMonitor = new MultiMonitorFactory().create();
    
    private _mainMonitor: MainMonitor | null;
    private _otherMonitors: BrowserWindow[];
    
    constructor(
        private readonly monitorFactory: IMonitorFactory
    ) {
        this._otherMonitors = [];
        this._mainMonitor = null;
    }
    
    get monitors(): BrowserWindow[] {
        if (!this._mainMonitor) return this._otherMonitors;
        return [this._mainMonitor, ...this._otherMonitors];
    }
    
    async openUrl(url: string, numberOfMonitors: number): Promise<void> {
        if (numberOfMonitors < 1)
            throw new Error("numberOfMonitors should be at least 1");
        
        this.destroyAllMonitors();
        
        
        const { monitorFactory } = this;

        this._mainMonitor = monitorFactory.createMain(numberOfMonitors - 1);
        this.monitors.push(this._mainMonitor);

        this._mainMonitor.webContents.openDevTools(); //TODO remove

        //TODO: refactor to use webContents.setWindowOpenHandler
        this._mainMonitor.webContents.on('new-window', this.onNewWindow);

        await this._mainMonitor.loadURL(url);
    }
    
    destroyAllMonitors() {
        const { monitors } = this;
        
        for (const monitor of monitors) {
            monitor.destroy();
        }
        
        this._mainMonitor = null;
        this._otherMonitors = [];
    }
    
    private onNewWindow = (event: Event, url: string, frameName: string, disposition: string, options: BrowserWindowConstructorOptions, additionalFeatures: string[], referrer: Referrer) => {
        console.debug(`on mainMonitor 'new-window' - url: ${ url } - frameName: ${ frameName }`);
        
        if (frameName.substr(0, 8) !== "MM-other") {
            console.debug(`we're not interested in frame ${ frameName } since it doesn't start with 'MM-other'`);
            return;
        }
        
        const { monitorFactory } = this;

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
            
            browserWindow.webContents.openDevTools(); //TODO: remove
            
            //TODO set bounds etc.
            browserWindow.setSize(1280, 1024);
        });
    }
    
    private addOtherMonitor(monitor: BrowserWindow) {
        this._otherMonitors.push(monitor);
    }
}