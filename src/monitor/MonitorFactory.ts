import { BrowserWindowConstructorOptions } from "electron";
import path from "path";
import { IMultiMonitor } from "../MultiMonitor";
import { MainMonitor } from "./MainMonitor";

export interface IMonitorFactory {
    createMain(multiMonitor: IMultiMonitor, numberOfOthersToOpen: number): MainMonitor;

    updateOptions(options: BrowserWindowConstructorOptions): void;
}

export class MonitorFactory implements IMonitorFactory {

    createMain(multiMonitor: IMultiMonitor, numberOfOthersToOpen: number): MainMonitor {
        const rank = 0;
        const browserWindowOptions: BrowserWindowConstructorOptions = {
            // show: false,
            x: 0,
            y: 0, //TODO: make the webapp itself change the bounds of the window
            width: 1280,
            height: 1024,
            minWidth: 600,
            minHeight: 600,
            resizable: true,
            movable: true,
            titleBarStyle: "default",
            backgroundColor: "#FFFFFF",
            title: `Multi Monitor #${ rank }`,
            webPreferences: {
                contextIsolation: false, //TODO: find fix for window.opener? Create our own Html file?
                nodeIntegration: false,
                preload: path.join(__dirname, "../preload/Main.js"),
                nativeWindowOpen: true,
                affinity: "MULTI-MONITOR",
                enableRemoteModule: true //TODO: try to remove this by using IPC calls
            }
        };

        const monitor = new MainMonitor(multiMonitor, numberOfOthersToOpen, browserWindowOptions);

        return monitor;
    }

    updateOptions(options: BrowserWindowConstructorOptions) {
        if (!options.webPreferences)
            throw new Error("webPreferences of the new pop-up window are undefined");
        
        options.webPreferences.preload = path.join(__dirname, './preload/Other.js');
        options.webPreferences.nativeWindowOpen = true;
        options.webPreferences.affinity = 'MULTI-MONITOR';
        options.webPreferences.nodeIntegration = false;
        options.webPreferences.enableRemoteModule = true; //TODO: try to remove this by using IPC calls
    }
}