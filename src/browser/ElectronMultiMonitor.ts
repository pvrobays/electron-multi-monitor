import { IOtherMonitor, OtherMonitor } from "./OtherMonitor";

export interface IElectronMultiMonitor {
    readonly mainWindow: Window;
    readonly otherMonitors: IOtherMonitor[];
    readonly numberOfMonitors: number;

    registerOtherMonitor(window: Window): Window;
}

export class ElectronMultiMonitor implements IElectronMultiMonitor {
    readonly otherMonitors: IOtherMonitor[];
    
    public onReady?: (electronMultiMonitor: IElectronMultiMonitor) => void;
    
    constructor(
        public readonly mainWindow: Window,
        public readonly numberOfMonitors: number
    ) {
        this.otherMonitors = [];
        
        if (numberOfMonitors === 1)
            this.triggerOnReady();
    }

    registerOtherMonitor(window: Window): Window {
        
        const otherMonitor = new OtherMonitor(window);
        
        this.otherMonitors.push(otherMonitor);
        
        if (this.otherMonitors.length === this.numberOfMonitors) {
            this.triggerOnReady();
        }
        
        return this.mainWindow;
    }

    private triggerOnReady() {
        setTimeout(() => {
            if (this.onReady)
                this.onReady(this);
        }, 10);
    }
}