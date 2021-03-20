import { configure } from "mobx";
import * as React from "react";
import ReactDOM from "react-dom";
import { AppComponent } from "./AppComponent";
import { AppFactory } from "./AppFactory";

(() => {
    if (!window.electronMultiMonitor) {
        console.warn("We're not the Main window, so we won't execute any code to avoid errors.");
        return; // Only the main window should execute this code
    }
    
    //mobx configuration - mobx = simple state management library. If you don't know it yet, look it up; it's awesome! https://github.com/mobxjs/mobx
    configure({
        enforceActions: "observed",
        useProxies: "always",
    });

    const appFactory = new AppFactory();
    const app = appFactory.create();

    window["app"] = app; 
    
    ReactDOM.render(<AppComponent app={ app }/>, document.body);
})();