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

        return <div className={ `pure-u-1-5 ${ selectedPictureId === pictureId ? "selected" : "" }` }
                    key={ pictureId }
                    onClick={ () => this.select(pictureId) }>
            <p>{ pictureId }</p>
            <img src={ `https://picsum.photos/seed/${ pictureId }/200/300` } alt={ pictureId }/>
        </div>
    }
}