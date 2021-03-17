import React from "react";

export interface IMonitorComponentProps {
    rank: number;
    numberOfMonitors: number;
    currentWindow: Window;
}

export class MonitorComponent extends React.Component<IMonitorComponentProps> {

    render() {
        const { rank, numberOfMonitors } = this.props;
        
        return <>
            <h1>Hello world!</h1>
            <p>I'm monitor number #{ rank } / { numberOfMonitors }</p>
        </>;
    }
}