import { cloneDeep, isEmpty, get, find } from 'lodash';
import { loadComponent, getCredential } from '@serverless-devs/core';
import { detectUseOfLayer } from './lib/utils';
import GenerateConfig from './lib/generateConfig';
import Layer from './lib/layer';
import logger from './common/logger';
import * as constants from './common/constants';
import BaseComponent from './common/base';
import { InputProps } from './common/entity';

export default class FunctionComponent extends BaseComponent {
  async getFcDeploy() {
    process.env['s-default-deploy-type'] = 'sdk';
    return await loadComponent('devsapp/fc-deploy');
  }

  private formatHttpConfig({ configs, serviceName }) {
    const routeConfigs = [];
    for (const config of configs) {
      if (config.triggers.type === 'http') {
        if (config.routerItem === '/') {
          routeConfigs.push({
            path: '/',
            functionName: 'index',
            serviceName,
          });
          routeConfigs.push({
            path: '/index',
            functionName: 'index',
            serviceName,
          });
        } else {
          routeConfigs.push({
            path: config.routerItem,
            functionName: config.routerItem.slice(1),
            serviceName,
          });
        }
      }
    }
    return routeConfigs;
  }

  public async deploy(inputs: InputProps) {
    if (!inputs.credentials) {
      inputs.credentials = await getCredential(inputs.project.access);
    }

    const configs = await GenerateConfig.generateConfig(cloneDeep(inputs));
    const region = configs[0].region;
    const serviceName = configs[0].service.name;
    const useHttp = find(configs, (item) => item.triggers.type === 'http');
    let customDomain: object;
    let domainName: string;
    if (useHttp) {
      const domainConfig = await GenerateConfig.getCustomDomain(
        cloneDeep(inputs),
        region,
        serviceName,
      );
      customDomain = domainConfig.customDomain;
      domainName = domainConfig.domainName;
    }
    // layer
    const functionPath = inputs.props.sourceCode;
    if (!detectUseOfLayer(functionPath)) {
      throw new Error('Failed to get layer configuration.');
    }

    const layer = new Layer({ region, credentials: inputs.credentials });
    const coreLayer = await layer.getLayerConfig(serviceName, functionPath);
    if (isEmpty(coreLayer)) {
      throw new Error('Failed to get layer configuration.');
    }
    logger.debug(`coreLayer: ${coreLayer}`);

    const fcDeploy = await this.getFcDeploy();
    const res = [];
    const routeConfigs = this.formatHttpConfig({ configs, serviceName });
    for (const config of configs) {
      if (config.triggers.type === 'http') {
        config.customDomains = [
          {
            ...customDomain,
            routeConfigs,
          },
        ];
      }

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
        if (isEmpty(layers.filter((item) => item.startsWith(`${arn}#${layerName}`)))) {
          layers.push(coreLayer);
        }
      } else {
        config.function.layers = [coreLayer];
      }
      config.triggers = [config.triggers];
      inputs.props = config;
      inputs.args = inputs.args.includes('--debug') ? '--debug' : '';
      res.push(await fcDeploy.deploy(inputs));
    }

    super.__report({
      name: 'jamstack-api',
      access: inputs.project.access,
      content: res,
    });

    return useHttp ? { customDomain: domainName, 'fc-deploy-response': res } : res;
  }

  public async remove(inputs: InputProps) {
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

  public async publicLayerVersion(inputs: InputProps) {
    if (!inputs.credentials) {
      inputs.credentials = await getCredential(inputs.project.access);
    }

    const functionPath = inputs.props.sourceCode;
    if (!detectUseOfLayer(functionPath)) {
      throw new Error('Failed to get layer configuration.');
    }

    const { region, app } = inputs.props;
    const serviceName = get(app, 'name', constants.DEFAULT_SERVICE.name);

    const layer = new Layer({ region, credentials: inputs.credentials });
    const coreLayer = await layer.publishLayerVersion(serviceName, functionPath);
    if (isEmpty(coreLayer)) {
      throw new Error('Failed to get layer configuration.');
    }
    return coreLayer;
  }
}
