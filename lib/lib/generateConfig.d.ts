export interface HttpTriggerConfig {
    authType: string;
    methods: string[];
    name?: string;
    qualifier?: string;
}
export interface IOssTriggerConfig {
    bucketName: string;
    events: string[];
    filter: {
        prefix: string;
        suffix: string;
    };
}
export declare function instanceOfHttpTriggerConfig(data: any): data is HttpTriggerConfig;
export declare function instanceOfIOssTriggerConfig(data: any): data is IOssTriggerConfig;
export default class GenerateConfig {
    static generateConfig(inputs: any, command?: string): Promise<any>;
    static getCustomDomain(inputs: any, region: any, serviceName: any): Promise<{
        customDomain: any;
        domainName: any;
    }>;
    static execIndexjs(codeUri: any): Promise<void>;
    static getTriggers({ codeUri, http, routerItem }: {
        codeUri: any;
        http: any;
        routerItem: any;
    }): Promise<{
        name: string;
        type: string;
        config: any;
        qualifier?: undefined;
    } | {
        name: any;
        type: string;
        qualifier: any;
        config: Pick<any, "authType" | "methods">;
    }>;
}
