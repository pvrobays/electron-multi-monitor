import { BrowserWindowConstructorOptions } from "electron";
import path from "path";
import { MainMonitor } from "./MainMonitor";
import { Monitor } from "./Monitor";

export interface IMonitorFactory {
    createMain(numberOfOthersToOpen: number): Monitor;

    updateOptions(options: BrowserWindowConstructorOptions): void;
}

export class MonitorFactory implements IMonitorFactory {

    createMain(numberOfOthersToOpen: number): Monitor {
        const rank = 0;
        const browserWindowOptions: BrowserWindowConstructorOptions = {
            // show: false,
            // x: 0,
            // y: 0,
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
                nodeIntegration: false,
                preload: path.join(__dirname, "../preload/Main.js"),
                nativeWindowOpen: true,
                affinity: "MULTI-MONITOR",
                enableRemoteModule: true //TODO: try to remove this by using IPC calls
            }
        };

        const monitor = new MainMonitor(numberOfOthersToOpen, browserWindowOptions);

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