import {app, ipcMain} from "electron";
// @ts-ignore
import {IMultiMonitor, MultiMonitor} from "../../dist";
//import { IMultiMonitor, MultiMonitor } from "electron-multi-monitor"; //when using via npm
import {MultiMonitorFactory} from "../src";

const numberOfWindowsToOpen = 2;

let multiMonitor: IMultiMonitor | null = null;

function onReady() {
    console.log("app ready");

    // multiMonitor = MultiMonitor.instance;
    multiMonitor = new MultiMonitorFactory(ipcMain).create();
    
    // const url = "https://google.com";
    // const url = "about:blank";
    const url = `file://${__dirname}/../../app/index.html`;
    
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