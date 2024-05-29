import {MonitorFactory} from "./monitor/MonitorFactory";
import {IMultiMonitor, MultiMonitor} from "./MultiMonitor";
import {MainProcessApi} from "./preload/MainProcessApi";
import {ConsoleLogger, ILog} from "./utils/Logs";

export class MultiMonitorFactory {
    
    constructor(
        private readonly ipcMain: Electron.IpcMain,
        private readonly log: ILog = new ConsoleLogger(),
    ) {
        
    }
    
    create(): IMultiMonitor {
        const { ipcMain, log } = this;
        
        const monitorFactory = new MonitorFactory();
        
        const mainProcessApi = new MainProcessApi(ipcMain, log);
        mainProcessApi.initialize(); //TODO PJ: check if we should only trigger this once
        
        const multiMonitor = new MultiMonitor(monitorFactory);
        
        return multiMonitor;
    }
}