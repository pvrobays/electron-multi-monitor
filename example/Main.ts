import { app } from "electron";
// import { IMultiMonitor, MultiMonitor } from "../src/MultiMonitor";
// @ts-ignore
import { IMultiMonitor, MultiMonitor } from "../../dist/MultiMonitor";

const numberOfWindowsToOpen = 2;

let multiMonitor: IMultiMonitor | null = null;

function onReady() {
    console.log("app ready");

    multiMonitor = MultiMonitor.instance;
    
    // const url = "https://google.com";
    // const url = "about:blank";
    const url = `file://${__dirname}/../app/index.html`;
    
    multiMonitor.openUrl(url, numberOfWindowsToOpen).then(() => {
        console.log("Monitor windows are opened & loaded!");
    });
}

app.on('ready', onReady);

app.on('window-all-closed', function() {
    if (process.platform !== 'darwin') {
        app.quit();
    }
    
    multiMonitor = null;
});

app.on('activate', function() {
    if (multiMonitor === null) {
        onReady();
    }
});