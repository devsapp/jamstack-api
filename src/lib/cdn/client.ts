import Cdn20180510, * as $Cdn20180510 from '@alicloud/cdn20180510';
import * as $OpenApi from '@alicloud/openapi-client';

export default class Client {
  private client: Cdn20180510;
  constructor(accessKeyId: string, accessKeySecret: string) {
    this.client = this.createClient(accessKeyId, accessKeySecret);
  }

  /**
   * 使用AK&SK初始化账号Client
   * @param accessKeyId
   * @param accessKeySecret
   * @return Client
   * @throws Exception
   */
  private createClient(accessKeyId: string, accessKeySecret: string): Cdn20180510 {
    let config = new $OpenApi.Config({
      // 您的AccessKey ID
      accessKeyId: accessKeyId,
      // 您的AccessKey Secret
      accessKeySecret: accessKeySecret,
    });
    // 访问的域名
    config.endpoint = 'cdn.aliyuncs.com';
    return new Cdn20180510(config);
  }

  /**
   * 设置edge script灰度配置
   */
  async setEsStagingConfig({ domain, rule }: { domain: string; rule: string }): Promise<void> {
    const setCdnDomainStagingConfigRequest = new $Cdn20180510.SetCdnDomainStagingConfigRequest({
      domainName: domain,
      functions: JSON.stringify([
        {
          functionArgs: [
            { argName: 'name', argValue: 'jamstack' },
            { argName: 'rule', argValue: rule },
            { argName: 'enable', argValue: 'on' },
            { argName: 'pri', argValue: '0' },
            { argName: 'pos', argValue: 'head' },
            { argName: 'enable', argValue: 'on' },
            { argName: 'brk', argValue: 'off' },
            { argName: 'option', argValue: '' },
          ],
          functionName: 'edge_function',
        },
      ]),
    });
    await this.client.setCdnDomainStagingConfig(setCdnDomainStagingConfigRequest);
  }
  /**
   * @description 获取灰度环境配置信息
   */
  async describeCdnDomainStagingConfig(domain: string): Promise<any> {
    const describeCdnDomainStagingConfigRequest = new $Cdn20180510.DescribeCdnDomainStagingConfigRequest(
      {
        domainName: domain,
        functionNames: 'edge_function',
      },
    );
    return await this.client.describeCdnDomainStagingConfig(describeCdnDomainStagingConfigRequest);
  }
  /**
   * 将edge script灰度配置发布到线上环境
   */
  async publishEsStagingConfigToProduction(domain: string): Promise<void> {
    const publishStagingConfigToProductionRequest = new $Cdn20180510.PublishStagingConfigToProductionRequest(
      {
        domainName: domain,
        functionName: 'edge_function',
      },
    );
    await this.client.publishStagingConfigToProduction(publishStagingConfigToProductionRequest);
  }
}
