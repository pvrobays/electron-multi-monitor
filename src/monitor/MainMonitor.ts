import { BrowserWindowConstructorOptions } from "electron";
import { Monitor } from "./Monitor";

export class MainMonitor extends Monitor {
    public isMain: boolean;
    public numberOfOthersToOpen: number;

    constructor(numberOfOthersToOpen: number, options: BrowserWindowConstructorOptions) {
        super(options);

        this.isMain = true;
        this.numberOfOthersToOpen = numberOfOthersToOpen;
    }
}

export function isMainMonitor(monitor: Monitor): monitor is MainMonitor {
    return monitor.isMain;
}