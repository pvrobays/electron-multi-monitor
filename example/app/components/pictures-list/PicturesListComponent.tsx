import { observer } from "mobx-react";
import React from "react";
import { injectFromApp } from "../../App";
import { IPicturesStore } from "../../stores/PicturesStore";
import { PicturesListPictureComponent } from "./PicturesListPictureComponent";

export interface IPicturesListComponentProps {
    picturesStore?: IPicturesStore
}

@injectFromApp<IPicturesListComponentProps>(stores => ({
    picturesStore: stores.picturesStore
}))
@observer
export class PicturesListComponent extends React.Component<IPicturesListComponentProps> {

    render() {
        const { pictureIds } = this.props.picturesStore!;

        return <div className="pure-g">
            {
                pictureIds.map(pictureId => <PicturesListPictureComponent pictureId={ pictureId } />)
            }
        </div>;
    }
}