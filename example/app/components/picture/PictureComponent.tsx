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
        const { type, picturesStore } = this.props;
        const { selectedPictureId } = picturesStore!;

        if (!selectedPictureId)
            return <p>Select a picture</p>;


        let typeExtra: string;
        switch (type) {
            case 2:
                typeExtra = "?grayscale";
                break;
            case 3:
                typeExtra = "?blur";
                break;
            case 4:
                typeExtra = "?grayscale&blur=2";
                break;
            case 5:
                typeExtra = "?grayscale&blur=5";
                break;
            case 1:
            default:
                typeExtra = "";
                break;
        }

        return <div className="picture-viewport">
            <h1 className="picture-title">Picture: { selectedPictureId }</h1>
            <h1 className="picture-close" onClick={ this.closePicture }>X</h1>
            <img src={ `https://picsum.photos/seed/${ selectedPictureId }/1280/1024${ typeExtra }` } alt={ selectedPictureId } className="pure-img"/>
            <p className="powered-by">Picurues are powered by <a href={ "https://picsum.photos/" } target="another">Picsum Photos</a></p>
        </div>;
    }
}