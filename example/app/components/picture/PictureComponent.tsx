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
    
    private closePicture = () => {
        this.props.picturesStore!.setSelectedPictureId(null);
    };
    
    render() {
        const { selectedPictureId } = this.props.picturesStore!;
        
        if (!selectedPictureId)
            return <p>Select a picture</p>;
        
        return <div className="picture-viewport">
            <h1 className="picture-title">Picture: { selectedPictureId }</h1>
            <h1 className="picture-close" onClick={ this.closePicture }>X</h1>
            <img src={`https://picsum.photos/seed/${selectedPictureId}/1280/1024`} alt={ selectedPictureId } className="pure-img" />
            <p className="powered-by">Picurues are powered by <a href={"https://picsum.photos/"} target="another">Picsum Photos</a></p>
        </div>;
    }
}