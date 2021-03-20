import { action, autorun, makeObservable, observable, runInAction } from "mobx";

const wordSeeds = "rush rich opposition dough responsible available strap cherry jet temptation suspect official halt faint robot ambition scholar frequency corner overwhelm terms omission loot appeal hell laundry nest presence delete praise machinery convention punish dividend attract slant party tower patch preference pill entitlement sweat romantic TRUE beam gap econobox radical impulse intermediate proof director sex white bullet outlook particle incident personality safe question ride relate archive quality weed betray lane harmony miscarriage premium talented track cable field kinship expression quarrel friend load draw witness incongruous resignation grimace west bike pneumonia fish night brother family file privilege plaintiff lot deny computing firm"; 

export interface IPicturesStore {
    readonly pictureIds: string[];
    selectedPictureId: string | null;
    
    setSelectedPictureId(pictureId: string | null);
}

export class PicturesStore implements IPicturesStore {

    @observable
    public readonly pictureIds: string[];
    
    @observable
    public selectedPictureId: string | null;
    
    constructor() {
        this.pictureIds = wordSeeds.split(" ");
        this.selectedPictureId = this.pictureIds[0] ?? null;
        
        makeObservable(this);
    }
    
    @action
    setSelectedPictureId = (pictureId: string | null) => {
        this.selectedPictureId = pictureId;
    }
}