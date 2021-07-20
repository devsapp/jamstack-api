import BaseComponent from './common/base';
import { InputProps } from './common/entity';
export default class FunctionComponent extends BaseComponent {
    getFcDeploy(): Promise<any>;
    deploy(inputs: InputProps): Promise<{
        customDomain: any;
        response: any[];
    }>;
    remove(inputs: InputProps): Promise<void>;
    publicLayerVersion(inputs: InputProps): Promise<any>;
}
