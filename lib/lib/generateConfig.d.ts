export interface HttpTriggerConfig {
    authType: string;
    methods: string[];
    name?: string;
    qualifier?: string;
}
export declare function instanceOfHttpTriggerConfig(data: any): data is HttpTriggerConfig;
export default class GenerateConfig {
    static generateConfig(inputs: any, common?: string): Promise<any>;
    static getCustomDomain(inputs: any, region: any, serviceName: any): Promise<any[]>;
    static getPrivateConfig(codeUri: any): {
        privateFunctionConfig: any;
        privateHttp: any;
    } | {
        privateFunctionConfig: {};
        privateHttp?: undefined;
    };
    static getPublishConfig(sourceCode: any): any;
}
