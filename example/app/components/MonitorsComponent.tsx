import * as React from "react";
import ReactDOM from "react-dom";
import { MonitorComponent } from "./MonitorComponent";

export class MonitorsComponent extends React.Component {

    constructor(props) {
        super(props);
        
        const { otherMonitors } = window.electronMultiMonitor;

        //Remove all child elements from the htmlRoot; React Portal doesn't remove those by default
        for (const otherMonitor of otherMonitors) {
            const { htmlRoot } = otherMonitor;
            while (htmlRoot.firstChild) {
                htmlRoot.removeChild(htmlRoot.firstChild);
            }
        }
    }

    render() {
        const { otherMonitors, mainWindow, numberOfMonitors } = window.electronMultiMonitor;

        return <>
            <MonitorComponent rank={ 1 } currentWindow={ mainWindow } numberOfMonitors={ numberOfMonitors } key={ 0 }/>
            {
                otherMonitors.map((value, index) =>
                    ReactDOM.createPortal(
                        <MonitorComponent rank={ index + 2 } key={ index + 1 } numberOfMonitors={ numberOfMonitors } currentWindow={ value.window }/>,
                        value.htmlRoot
                    )
                )
            }
        </>;
    }
}