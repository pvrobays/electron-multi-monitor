interface Window {
    electronMultiMonitor: IElectronMultiMonitor
}

interface IElectronMultiMonitor {
    readonly mainWindow: Window;
    readonly otherMonitors: IOtherMonitor[];
    readonly numberOfMonitors: number;

    // registerOtherMonitor(window: Window): Window;
}

interface IOtherMonitor {
    readonly htmlRoot: HTMLElement;
    readonly window: Window;
}