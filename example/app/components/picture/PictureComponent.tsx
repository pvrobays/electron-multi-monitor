import { observer } from "mobx-react";
import React from "react";
import { injectFromApp } from "../../App";
import { IPicturesStore } from "../../stores/PicturesStore";

export interface IPictureComponentProps {
    type: number;
    picturesStore?: IPicturesStore;
}

@injectFromApp<IPictureComponentProps>(stores => ({
    picturesStore: stores.picturesStore
}))
@observer
export class PictureComponent extends React.Component<IPictureComponentProps> {
    
    render() {
        const { selectedPictureId } = this.props.picturesStore!;
        
        if (!selectedPictureId)
            return <p>Select a picture</p>;
        
        return <p>Picture: { selectedPictureId }</p>;
    }
}