export default class FunctionComponent {
    getFcDeploy(): Promise<any>;
    deploy(inputs: any): Promise<{
        customDomain: any;
        response: any[];
    }>;
    remove(inputs: any): Promise<void>;
    publicLayerVersion(inputs: any): Promise<any>;
}
