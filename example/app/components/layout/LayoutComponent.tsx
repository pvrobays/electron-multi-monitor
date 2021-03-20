import React from "react";

export interface ILayoutComponentProps {
    rank: number;
    numberOfMonitors: number;
}

/**
 * General Layout component which will be shown on each monitor
 */
export class LayoutComponent extends React.Component<ILayoutComponentProps> {
    
    render() {
        const { children, rank, numberOfMonitors } = this.props;
        
        return <div>
            <div className="header">
                <div className="pure-menu pure-menu-horizontal">
                    <a className="pure-menu-heading" href="">Photo Gallery</a>

                    <ul className="pure-menu-list">
                        <li className="pure-menu-item pure-menu-selected"><a href="#" className="pure-menu-link">Home</a></li>
                    </ul>
                    
                    <div className="info">
                        Monitor number #{ rank } / { numberOfMonitors }
                    </div>
                </div>
            </div>
            <div className="content">
                { children }
            </div>
            <div className="footer">
                View the source of this multi monitor web application on <a href="https://github.com/pvrobays/electron-multi-monitor">github.com/pvrobays/electron-multi-monitor</a>. Made with ♥ in Belgium ⚫🟡🔴
            </div>
        </div>;
    }
}