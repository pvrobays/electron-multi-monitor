import { MonitorFactory } from "./monitor/MonitorFactory";
import { IMultiMonitor, MultiMonitor } from "./MultiMonitor";

export class MultiMonitorFactory {
    
    create(): IMultiMonitor {
        
        const monitorFactory = new MonitorFactory();
        
        const multiMonitor = new MultiMonitor(monitorFactory);
        
        return multiMonitor;
    }
}