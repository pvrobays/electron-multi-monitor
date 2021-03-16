import { BrowserWindowConstructorOptions, Referrer } from "electron";
import path from "path";
import { Monitor } from "./monitor/Monitor";
import { IMonitorFactory } from "./monitor/MonitorFactory";
import { MultiMonitorFactory } from "./MultiMonitorFactory";


export interface IMultiMonitor {
    readonly monitors: Monitor[];

    openUrl(url: string, numberOfMonitors: number): Promise<void>;
    destroyAllMonitors(): void;
}

export class MultiMonitor implements IMultiMonitor {
    public static instance: IMultiMonitor = new MultiMonitorFactory().create();
    
    private _monitors: Monitor[];
    private _mainMonitor: Monitor | null;
    
    constructor(
        private readonly monitorFactory: IMonitorFactory
    ) {
        this._monitors = [];
        this._mainMonitor = null;
    }
    
    get monitors(): Monitor[] {
        return this._monitors;
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
        const { _monitors } = this;
        
        for (const monitor of _monitors) {
            monitor.destroy();
        }
        
        this._monitors = [];
    }
    
    private onNewWindow = (event: Event, url: string, frameName: string, disposition: string, options: BrowserWindowConstructorOptions, additionalFeatures: string[], referrer: Referrer) => {
        console.debug(`on mainMonitor 'new-window' - url: ${ url } - frameName: ${ frameName }`);
        
        if (frameName.substr(0, 8) !== "MM-other") {
            console.debug(`we're not interested in frame ${ frameName } since it doesn't start with 'MM-other'`);
            return;
        }
        
        const { monitorFactory } = this;

        monitorFactory.updateOptions(options);
    };
}