import Cdn20180510 from '@alicloud/cdn20180510';
export default class Client {
    /**
     * 使用AK&SK初始化账号Client
     * @param accessKeyId
     * @param accessKeySecret
     * @return Client
     * @throws Exception
     */
    static createClient(accessKeyId: string, accessKeySecret: string): Cdn20180510;
    static main(args: string[]): Promise<void>;
}
