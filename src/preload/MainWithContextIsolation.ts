import { remote, contextBridge } from "electron";
import { ElectronMultiMonitor } from "../browser/ElectronMultiMonitor";
import { MainMonitor } from "../monitor/MainMonitor";

console.warn("Loading preload/Main.js...");

const currentMonitor: MainMonitor = remote.getCurrentWindow() as MainMonitor;
contextBridge.exposeInMainWorld("currentMonitor", currentMonitor);
console.log("currentMonitor: ", currentMonitor);

const { numberOfOthersToOpen } = currentMonitor;

if (typeof(numberOfOthersToOpen) !== "undefined") {
    console.log("🔳 Main monitor");

    const numberOfMonitors = numberOfOthersToOpen + 1;
    const electronMultiMonitor = new ElectronMultiMonitor(window, numberOfMonitors);
    contextBridge.exposeInMainWorld("electronMultiMonitor", electronMultiMonitor);

    for (let i = 0; i < numberOfOthersToOpen; i++) {
        window.open("about:blank", `MM-other-${i}`);
    }
}
else {
    console.log("🔳 Other monitor");

    if (!window.opener)
        throw new Error("This should be an 'other monitor' but there's no window.opener defined! Can't connect the multiple monitors!");

    console.warn("window.opener", window.opener);

    const opener = window.opener as Window;
    const { electronMultiMonitor } = opener;
    if (!electronMultiMonitor)
        throw new Error("This should be an 'other monitor' but the window.opener has no 'electronMultiMonitor' object! Can't connect the multiple monitors!");

    const mainWindow = electronMultiMonitor.registerOtherMonitor(window);
    contextBridge.exposeInMainWorld("mainWindow", mainWindow);
}

console.warn("Loaded preload/Main.js...");