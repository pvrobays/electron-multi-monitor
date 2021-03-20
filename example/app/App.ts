import { inject } from "mobx-react";
import { IStoresToProps } from "mobx-react/dist/types/IStoresToProps";
import { IPicturesStore } from "./stores/PicturesStore";

export interface IApp {
    stores: IAppStores
}

export class App implements IApp {
    
    constructor(
        public readonly stores: IAppStores
    ) {
        
    }
    
    
}

export interface IAppStores {
    picturesStore: IPicturesStore;
}

export function injectFromApp<TProps extends object>(fn: IStoresToProps<IAppStores, Partial<TProps>>) {
    return inject(fn);
}