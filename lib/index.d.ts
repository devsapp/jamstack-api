import BaseComponent from './common/base';
import { InputProps } from './common/entity';
export default class FunctionComponent extends BaseComponent {
    getFcDeploy(): Promise<any>;
    private formatHttpConfig;
    deploy(inputs: InputProps): Promise<any[] | {
        customDomain: string;
        'fc-deploy-response': any[];
    }>;
    remove(inputs: InputProps): Promise<void>;
    publicLayerVersion(inputs: InputProps): Promise<any>;
}
