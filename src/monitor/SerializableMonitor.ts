import {Monitor} from "./Monitor";
import {isMainMonitor} from "./MainMonitor";

export class SerializableMonitor {
    public isMain: boolean;
    public numberOfOthersToOpen: number;
    
    constructor(monitor: Monitor) {
        this.isMain = monitor.isMain ?? false;
        this.numberOfOthersToOpen = isMainMonitor(monitor) ? monitor.numberOfOthersToOpen : 0;
        
        // We could expose more properties of the BrowserWindow here, if needed
    }
}