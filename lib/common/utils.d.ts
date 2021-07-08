/// <reference types="jest" />
export declare function sleep(msec: any): Promise<unknown>;
export declare const waitUntil: (asyncService: () => Promise<any>, stopCondition: (result: any) => boolean, { timeout, timeInterval, timeoutMsg, hint, }: {
    timeInterval?: number;
    timeout?: number;
    timeoutMsg?: string;
    hint?: {
        loading: string;
        success: string;
        fail: string;
    };
}) => Promise<any>;
