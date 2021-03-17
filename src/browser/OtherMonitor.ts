
export interface IOtherMonitor {
    readonly htmlRoot: HTMLElement;
    readonly window: Window;
}

export class OtherMonitor implements IOtherMonitor {
    
    constructor(
        public readonly window: Window
    ) {
        
    }
    
    get htmlRoot(): HTMLElement {
        return this.window.document.body;
    }
}