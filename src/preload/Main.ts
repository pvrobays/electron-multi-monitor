import { remote } from "electron";
import { MainMonitor } from "../monitor/MainMonitor";

console.warn("Loading preload/Main.js...");

const currentMonitor: MainMonitor = remote.getCurrentWindow() as MainMonitor;

const { numberOfOthersToOpen } = currentMonitor;

for (let i = 0; i < numberOfOthersToOpen; i++) {
    window.open("about:blank", `MM-other-${i}`);
}

console.warn("Loaded preload/Main.js...");