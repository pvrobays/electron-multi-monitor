import { BrowserWindowConstructorOptions } from "electron";
import { IMultiMonitor } from "../MultiMonitor";
import { Monitor } from "./Monitor";

export class MainMonitor extends Monitor {
    public isMain: boolean;
    public numberOfOthersToOpen: number;
    public multiMonitor: IMultiMonitor;
    
    constructor(multiMonitor: IMultiMonitor, numberOfOthersToOpen: number, options: BrowserWindowConstructorOptions) {
        super(options);

        this.isMain = true;
        this.numberOfOthersToOpen = numberOfOthersToOpen;
        this.multiMonitor = multiMonitor;
    }
}