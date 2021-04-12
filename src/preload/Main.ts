import { remote } from "electron";
import { ElectronMultiMonitor } from "../browser/ElectronMultiMonitor";
import { MainMonitor } from "../monitor/MainMonitor";
// import { contextBridge } from "electron";

console.warn("Loading preload/Main.js...");

const currentMonitor: MainMonitor = remote.getCurrentWindow() as MainMonitor;
// contextBridge.exposeInMainWorld("currentMonitor", currentMonitor);
window.currentMonitor = currentMonitor;
window.multiMonitor = currentMonitor?.multiMonitor;

const { numberOfOthersToOpen } = currentMonitor;

if (typeof(numberOfOthersToOpen) !== "undefined") {
    console.log("🔳 Main monitor");

    const numberOfMonitors = numberOfOthersToOpen + 1;
    const electronMultiMonitor = new ElectronMultiMonitor(window, numberOfMonitors);
    // contextBridge.exposeInMainWorld("electronMultiMonitor", electronMultiMonitor);
    window.electronMultiMonitor = electronMultiMonitor;
    
    const { href } = window.location;
    for (let i = 0; i < numberOfOthersToOpen; i++) {
        window.open(href, `MM-other-${i}`);
    }
}
else {
    console.log("🔳 Other monitor");
    
    if (!window.opener)
        throw new Error("This should be an 'other monitor' but there's no window.opener defined! Can't connect the multiple monitors!");
    
    const opener = window.opener as Window;
    console.warn("window.opener", opener);
    // contextBridge.exposeInMainWorld("customOpener", opener);
    const { electronMultiMonitor } = opener;
    if (!electronMultiMonitor)
        throw new Error("This should be an 'other monitor' but the window.opener has no 'electronMultiMonitor' object! Can't connect the multiple monitors!");
    
    const mainWindow = electronMultiMonitor.registerOtherMonitor(window);
    // contextBridge.exposeInMainWorld("mainWindow", mainWindow);
    window.mainWindow = mainWindow;
}

console.warn("Loaded preload/Main.js...");