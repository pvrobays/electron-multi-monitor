import {MainMonitor} from "../monitor/MainMonitor";
import {ILog} from "../utils/Logs";
import {BrowserWindow} from "electron";
import {SerializableMonitor} from "../monitor/SerializableMonitor";

export interface IMainProcessApi {
    initialize(): void;
}

export class MainProcessApi implements IMainProcessApi {
    public static readonly GetCurrentWindow: string = "getCurrentWindow";

    constructor(
        private readonly ipcMain: Electron.IpcMain,
        private readonly log: ILog,
    ) {
        
    }
    
    initialize(): void {
        const { ipcMain } = this;

        //Sync calls
        ipcMain.on(MainProcessApi.GetCurrentWindow,
            (e) => e.returnValue = this.onGetCurrentWindow(e.sender));
        
        //TODO: Implement
        
    }

    private onGetCurrentWindow(webContents: Electron.WebContents): SerializableMonitor | undefined {
        const { log } = this;
        log.debug(`Received IPC call: onGetMasterInfo`);
        const browserWindow = BrowserWindow.fromWebContents(webContents);
        if (!browserWindow) {
            log.error("Received a onGetCurrentWindow call, but couldn't find a BrowserWindow with the passed webContents!", webContents);
            return undefined;
        }

        return new SerializableMonitor(browserWindow as MainMonitor);
    }
}