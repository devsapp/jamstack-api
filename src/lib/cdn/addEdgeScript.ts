import Client from './client';
import { waitUntil } from '../../common/utils';
import { get, find } from 'lodash';

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
    await waitUntil(
      async () => {
        return await this.client.describeCdnDomainStagingConfig(domain);
      },
      (result) => {
        const domainConfigs = get(result, 'body.domainConfigs');
        const edge = find(domainConfigs, (item) => item.functionName === 'edge_function');
        return get(edge, 'status') === 'success';
      },
      { timeInterval: 500 },
    );
    await this.client.publishEsStagingConfigToProduction(domain);
  }
}
