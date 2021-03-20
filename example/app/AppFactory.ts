import { App, IApp, IAppStores } from "./App";
import { PicturesStore } from "./stores/PicturesStore";

export interface IAppFactory {
    create(): IApp;
}

export class AppFactory implements IAppFactory {
    
    create(): IApp {
        
        const picturesStores = new PicturesStore();
        
        const appStores: IAppStores = {
            picturesStore: picturesStores
        };
        
        return new App(appStores);
    }
    
}