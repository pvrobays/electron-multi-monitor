import * as React from "react";
import { IApp } from "./App";
import { Provider } from "mobx-react"
import { MonitorsComponent } from "./components/MonitorsComponent";

export interface IAppComponentProps {
    app: IApp;
}

export class AppComponent extends React.Component<IAppComponentProps> {

    render() {
        const { app } = this.props;
        //If you want, here you can write code that should only happen on the main window.

        //Once you're done, call the <MonitorsComponent /> which will render the UI for all the monitors
        return <Provider { ...app.stores }>
            <MonitorsComponent/>
        </Provider>;
    }
}