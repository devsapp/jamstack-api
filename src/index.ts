import { cloneDeep, isEmpty } from 'lodash';
import { loadComponent, getCredential } from '@serverless-devs/core';
import { detectUseOfLayer } from './lib/utils';
import GenerateConfig from './lib/generateConfig';
import Layer from './lib/layer';
import logger from './common/logger';

export default class FunctionComponent {

  async getFcDeploy() {
    process.env['s-default-deploy-type'] = 'sdk';
    return await loadComponent('devsapp/fc-deploy');
  }

  async te() {
  console.log('===');
    return await getCredential('env');
  }

  public async deploy(inputs) {
    if (!inputs.credentials) {
      inputs.credentials = await getCredential(inputs.project.access);
    }

    const configs = await GenerateConfig.generateConfig(cloneDeep(inputs));

    const region = configs[0].region;
    const serviceName = configs[0].service.name;
    const customDomains = await GenerateConfig.getCustomDomain(cloneDeep(inputs), region, serviceName);

    // layer
    const functionPath = inputs.props.sourceCode;
    if (!detectUseOfLayer(functionPath)) {
      throw new Error('Failed to get layer configuration.');
    }

    const layer = new Layer({ region, credentials: inputs.credentials })
    const coreLayer = await layer.getLayerConfig(serviceName, functionPath);
    if (isEmpty(coreLayer)) {
      throw new Error('Failed to get layer configuration.');
    }
    logger.debug(`coreLayer: ${coreLayer}`);

    const fcDeploy = await this.getFcDeploy();
    const res = [];
    for (const config of configs) {
      config.customDomains = customDomains;
      const { layers } = config.function;

      /**
       * 查看是否配置了 layer
       *  如果没有配置则直接使用 layer
       *  如果配置了 layer，则查看 arn 和 layer name 是否一致
       *    一致则使用用户的指定配置
       *    不一致则追加一个 layer 配置
       */
       if (layers) {
        const [arn, layerName] = coreLayer.split('#');
        if (isEmpty(layers.filter(item => item.startsWith(`${arn}#${layerName}`)))) {
          layers.push(coreLayer);
        }
      } else {
        config.function.layers = [coreLayer]
      }

      inputs.props = config;
      inputs.args = inputs.args.includes('--debug') ? '--debug' : '';
      res.push(await fcDeploy.deploy(inputs));
    }

    return res;
  }

  public async remove(inputs) {
    if (!inputs.credentials) {
      inputs.credentials = await getCredential(inputs.project.access);
    }

    const configs = await GenerateConfig.generateConfig(cloneDeep(inputs));

    const fcDeploy = await this.getFcDeploy();

    const endConfigs = configs.pop();
    for (const config of configs) {
      inputs.props = config;
      inputs.args = inputs.args.includes('--debug') ? 'function --debug' : 'function';
      await fcDeploy.remove(inputs);
    }
    inputs.props = endConfigs;
    inputs.args = inputs.args.includes('--debug') ? 'service --debug' : 'service';
    await fcDeploy.remove(inputs);
  }

  public async publicLayerVersion(inputs) {
    if (!inputs.credentials) {
      inputs.credentials = await getCredential(inputs.project.access);
    }

    const functionPath = inputs.props.sourceCode;
    if (!detectUseOfLayer(functionPath)) {
      throw new Error('Failed to get layer configuration.');
    }

    const { region, app } = GenerateConfig.getPublishConfig(inputs.props.sourceCode);
    const serviceName = app.name;

    const layer = new Layer({ region, credentials: inputs.credentials })
    const coreLayer = await layer.publishLayerVersion(serviceName, functionPath);
    if (isEmpty(coreLayer)) {
      throw new Error('Failed to get layer configuration.');
    }
    return coreLayer;
  }
}
