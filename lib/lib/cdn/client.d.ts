export default class Client {
    private client;
    constructor(accessKeyId: string, accessKeySecret: string);
    /**
     * 使用AK&SK初始化账号Client
     * @param accessKeyId
     * @param accessKeySecret
     * @return Client
     * @throws Exception
     */
    private createClient;
    /**
     * 设置edge script灰度配置
     */
    setEsStagingConfig({ domain, rule }: {
        domain: string;
        rule: string;
    }): Promise<void>;
    /**
     * @description 获取灰度环境配置信息
     */
    describeCdnDomainStagingConfig(domain: string): Promise<any>;
    /**
     * 将edge script灰度配置发布到线上环境
     */
    publishEsStagingConfigToProduction(domain: string): Promise<void>;
}
