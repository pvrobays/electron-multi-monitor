
interface Window {
    currentMonitor?: any; //TODO: create better declaration; or remove?
    electronMultiMonitor?: IElectronMultiMonitor;
    mainWindow?: Window;
}

interface IElectronMultiMonitor {
    readonly mainWindow: Window;
    readonly otherMonitors: IOtherMonitor[];
    readonly numberOfMonitors: number;

    registerOtherMonitor(window: Window): Window;
}

interface IOtherMonitor {
    readonly htmlRoot: HTMLElement;
    readonly window: Window;
}