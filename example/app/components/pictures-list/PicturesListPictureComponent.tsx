import { observer } from "mobx-react";
import React from "react";
import { injectFromApp } from "../../App";
import { IPicturesStore } from "../../stores/PicturesStore";

export interface IPicturesListPictureComponentProps {
    pictureId: string;
    picturesStore?: IPicturesStore;
}

@injectFromApp<IPicturesListPictureComponentProps>(stores => ({
    picturesStore: stores.picturesStore
}))
@observer
export class PicturesListPictureComponent extends React.Component<IPicturesListPictureComponentProps> {

    private select = (pictureId: string) => {
        console.log(`🎆 clicked on pictureId ${ pictureId }`);
        this.props.picturesStore!.setSelectedPictureId(pictureId);
    };

    render() {
        const { pictureId, picturesStore } = this.props;
        const { selectedPictureId } = picturesStore!;

        return <div className={ `pure-u-1-5 picture-container ${ selectedPictureId === pictureId ? "selected" : "" }` }
                    key={ pictureId }
                    onClick={ () => this.select(pictureId) }>
            <h3 className="picture-title">{ pictureId }</h3>
            <div  className="pure-img picture-placeholder">
                <img src={ `https://picsum.photos/seed/${ pictureId }/300/300` } alt={ pictureId } className="pure-img" />
            </div>
        </div>
    }
}