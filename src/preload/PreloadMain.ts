console.warn("Loading preload/PreloadMain.js...");

import {contextBridge, ipcRenderer} from "electron";
// import {MainProcessApi} from "./MainProcessApi";
import {SerializableMonitor} from "../monitor/SerializableMonitor";

contextBridge.exposeInMainWorld("electronMultiMonitor", {
    // currentMonitor: ipcRenderer.sendSync(MainProcessApi.GetCurrentWindow) as SerializableMonitor,
    currentMonitor: ipcRenderer.sendSync("getCurrentWindow") as SerializableMonitor,
});

console.warn("Loaded preload/PreloadMain.js!");