import Client from './client';
import { sleep } from '../../common/utils';
import { spinner } from '@serverless-devs/core';

export default class addEdgeScript {
  private client: Client;
  constructor(accessKeyId: string, accessKeySecret: string) {
    this.client = new Client(accessKeyId, accessKeySecret);
  }
  async init({ domain, fcDomain }) {
    await this.client.setEsStagingConfig({
      domain,
      rule: `if match_re($uri, '^/api') {\n rewrite(concat('http://${fcDomain}', substr($uri, 5, len($uri))), 'redirect')\n}`,
    });
    const spin = spinner('configuring edge script...');
    for (let i = 0; i < 5; i++) {
      try {
        await sleep(5000);
        await this.client.publishEsStagingConfigToProduction(domain);
        break;
      } catch (e) {
        await sleep(2000);
      }
    }
    spin.succeed('edge script configured successfully');
  }
}
