export interface ILog {
    /**
     * Log an error message
     */
    error(...params: any[]): void;

    /**
     * Log a warning message
     */
    warn(...params: any[]): void;

    /**
     * Log an informational message
     */
    info(...params: any[]): void;

    /**
     * Log a verbose message
     */
    verbose(...params: any[]): void;

    /**
     * Log a debug message
     */
    debug(...params: any[]): void;
}

export class ConsoleLogger implements ILog {
    debug(...params: any[]): void {
        console.debug(params);
    }

    error(...params: any[]): void {
        console.error(params);
    }

    info(...params: any[]): void {
        console.log(params);
    }

    verbose(...params: any[]): void {
        console.debug(params);
    }

    warn(...params: any[]): void {
        console.warn(params);
    }

}