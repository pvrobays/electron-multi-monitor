import * as React from "react";
import ReactDOM from "react-dom";
import { MonitorComponent } from "./MonitorComponent";

export class AppComponent extends React.Component {

    render() {
        const { otherMonitors, mainWindow, numberOfMonitors } = window.electronMultiMonitor;
        
        return <>
            <MonitorComponent rank={ 1 } currentWindow={ mainWindow } numberOfMonitors={ numberOfMonitors } key={ 0 } />
            {
                otherMonitors.map((value, index) => 
                    ReactDOM.createPortal(
                        <MonitorComponent rank={ index + 2} key={ index + 1} numberOfMonitors={ numberOfMonitors } currentWindow={ value.window } />,
                        value.htmlRoot
                    )
                )
            }
        </>;
    }
}