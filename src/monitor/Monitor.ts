import { BrowserWindow, BrowserWindowConstructorOptions } from "electron";

export class Monitor extends BrowserWindow {
    public isMain: boolean;
    
    constructor(options: BrowserWindowConstructorOptions) {
        super(options);
        
        this.isMain = false;
    }
}