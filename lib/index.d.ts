export default class FunctionComponent {
    getFcDeploy(): Promise<any>;
    deploy(inputs: any): Promise<any[]>;
    remove(inputs: any): Promise<void>;
    publicLayerVersion(inputs: any): Promise<any>;
}
