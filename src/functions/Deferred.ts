export default class Deferred<T> {
    private _resolve: (value: T) => void;
    private _reject: (reason: any) => void;
    private readonly _promise: Promise<T>;

    constructor() {
        this._resolve = undefined!; // ignore, it's immediately defined
        this._reject = undefined!; // ignore, it's immediately defined
        this._promise = new Promise<T>((resolve, reject) => {
            this._resolve = resolve;
            this._reject = reject;
        });
    }

    public get promise(): Promise<T> {
        return this._promise;
    }

    public resolve(value: T) {
        this._resolve(value);
    }

    public reject(value: T) {
        this._reject(value);
    }
}