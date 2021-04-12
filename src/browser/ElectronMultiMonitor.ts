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
    
    private _numberOfMonitors: number;
    
    constructor(
        public readonly mainWindow: Window,
        numberOfMonitors: number
    ) {
        this.otherMonitors = [];
        this._numberOfMonitors = numberOfMonitors;
        
        if (numberOfMonitors === 1)
            this.triggerOnReady();
    }
    
    get numberOfMonitors(): number {
        return this._numberOfMonitors;
    }

    registerOtherMonitor(window: Window): Window {
        
        const otherMonitor = new OtherMonitor(window);
        
        this.otherMonitors.push(otherMonitor);
        
        if (this.otherMonitors.length === this.numberOfMonitors) {
            this.triggerOnReady();
        }
        
        return this.mainWindow;
    }

    /**
     * inner call.
     * Used to open a window with a certain ID, when the MultiMonitor instance requests so.
     * @param id
     */
    _addMonitor(id: string): boolean {
        console.log(`_addMonitor '${id}'`);
        const { mainWindow } = this;
        
        this._numberOfMonitors++;
        mainWindow.open(mainWindow.location.href, `MM-other-${id}`);

        console.log(`_addMonitor opened '${id}'`);
        
        return true;
    }

    private triggerOnReady() {
        setTimeout(() => {
            if (this.onReady)
                this.onReady(this);
        }, 10);
    }
}