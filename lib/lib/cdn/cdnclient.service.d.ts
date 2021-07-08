import Cdn20180510 from '@alicloud/cdn20180510';
export default class Client {
    client: Cdn20180510;
    constructor(accessKeyId: string, accessKeySecret: string);
    /**
     * 使用AK&SK初始化账号Client
     * @param accessKeyId
     * @param accessKeySecret
     * @return Client
     * @throws Exception
     */
    private createClient;
    main(args: string[]): Promise<void>;
}
