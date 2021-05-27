import FC from '@alicloud/fc2';
import logger from '../common/logger';

FC.prototype.listLayers = async function(query?, headers?) {
  let data = [];
  let hasNextToken = false;

  do {
    const res = await Client.fcClient.get('/layers', query, headers);
    logger.debug(`get /laysers res: ${JSON.stringify(res)}`);
    
    const { layers, nextToken } = res.data;
    if (nextToken) {
      query.nextToken = nextToken;
      hasNextToken = true;
    } else {
      hasNextToken = false;
    }
    data = data.concat(layers);
  } while(hasNextToken);

  return data;
}
FC.prototype.listLayerVersions = async function(layerName, headers?) {
  return await Client.fcClient.get(`/layers/${layerName}/versions`, null, headers);
}
FC.prototype.getLayerVersion = async function(layerName, version, headers?) {
  return await Client.fcClient.get(`/layers/${layerName}/versions/${version}`, null, headers);
}
FC.prototype.publishLayerVersion = async function(layerName, body = {}, headers?) {
  return (await Client.fcClient.post(`/layers/${layerName}/versions`, body, headers)).data;
}

export default class Client {
  static fcClient: any;

  static setFcClient(region: string, credentials) {
    const {
      AccountID,
      AccessKeyID,
      AccessKeySecret,
    } = credentials;

    const fcClient = new FC(AccountID, {
      accessKeyID: AccessKeyID,
      accessKeySecret: AccessKeySecret,
      region,
      timeout: 6000000,
    });

    this.fcClient = fcClient;

    return fcClient;
  }
}
