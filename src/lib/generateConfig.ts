import path from 'path';
import * as fse from 'fs-extra';
import { commandParse, loadComponent } from '@serverless-devs/core';
import _, { pick, get, defaults } from 'lodash';
import * as constants from '../common/constants';
import yaml from 'js-yaml';
import logger from '../common/logger';
import { checkConfigYmlExist } from './utils';

export interface HttpTriggerConfig {
  authType: string;
  methods: string[];
  name?: string;
  qualifier?: string;
}
export function instanceOfHttpTriggerConfig(data: any): data is HttpTriggerConfig {
  return 'authType' in data && 'methods' in data;
}

export default class GenerateConfig {

  static async generateConfig(inputs, common = 'deploy'): Promise<any> {
    const props = inputs.props;
    // TODO: 数据上报，参数处理
  
    // 配置文件处理
    const functionResolvePath = path.resolve(props.sourceCode);
  
    const {
      region,
      app,
      http: publicHttp = constants.DEFAULT_HTTP_TRIGGER_CONFIG,
    } = this.getPublishConfig(props.sourceCode);
    logger.debug('默认配置')
    logger.debug(`region: ${region}`);
    logger.debug(`app: ${JSON.stringify(app)}`);
    logger.debug(`public http: ${JSON.stringify(publicHttp)}`);
  
    const service = pick(app, constants.SERVICE_KEYS);
    const publicFunctionConfig = pick(app, constants.FUNCIONS_KEYS);
    logger.debug('配置处理')
    logger.debug(`serviceConfig: ${JSON.stringify(service)}`);
    logger.debug(`public functionConfig: ${JSON.stringify(publicFunctionConfig)}`);
  
    const filterRoute = get(commandParse(inputs), 'data.route'); // 部署单个函数 --route index
    logger.debug(`filter route is: ${JSON.stringify(filterRoute)}`);
    logger.debug(`route: ${JSON.stringify(props.route)}`);
    const routes = filterRoute ?
      props.route.filter((item) => filterRoute === item.slice(1) || (item === filterRoute) || (item === '/' && filterRoute === 'index'))
      : props.route;
    logger.debug(`filter route: ${JSON.stringify(routes)}`);

    if (_.isEmpty(routes)) {
      throw new Error('There is no route that needs to be deployed.');
    }
  
    const res = [];
    const paths = [];
    // 解析配置
    for (const routerItem of routes) {
      const rtItem = (routerItem === '/' ? '/index' : routerItem).slice(1);
      if (paths.includes(rtItem)) {
        throw new Error('The same route exists.');
      }
      paths.push(rtItem);

      const codeUri = path.join(functionResolvePath, rtItem);
      const { privateFunctionConfig, privateHttp } = this.getPrivateConfig(codeUri);
      logger.debug(`private function: ${JSON.stringify(privateFunctionConfig)}`);
      logger.debug(`private http: ${JSON.stringify(privateHttp)}`);

      const functionConfig = defaults(privateFunctionConfig, publicFunctionConfig, {
        name: rtItem,
        codeUri,
      });
      const triggers = (privateHttp || publicHttp).map((configItem) => {
        const qualifier = configItem.qualifier || 'LATEST';
        delete configItem.qualifier;
        delete configItem.name;
  
        if (!instanceOfHttpTriggerConfig(configItem)) {
          throw new Error(`${routerItem} configuration does not meet expectations,code uri is ${codeUri}.`);
        }
  
        return {
          name: configItem.name || qualifier,
          type: 'http',
          qualifier: qualifier,
          config: configItem,
        };
      });

      res.push({
        region,
        service,
        function: functionConfig,
        triggers,
      })
    }

    return res;
  }

  static async getCustomDomain(inputs, region, serviceName) {
    const {
      customDomain = constants.DEFAULT_CUSTOM_DOMAIN_CONFIG,
      route,
    } = inputs.props;

    if (customDomain.domainName.toUpperCase() === 'AUTO') {
      const domain = await loadComponent('devsapp/domain');
      customDomain.domainName = await domain.get({
        ...inputs,
        props: {
          type: 'fc',
          region,
          user: inputs.credentials.AccountID,
          service: serviceName,
          function: 'jamstack-api.system'
        }
      });
    }
    
    logger.debug(`public customDomain: ${JSON.stringify(customDomain)}`);

    const routeConfigs = [];
    for (const item of route) {
      if (item === '/') {
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
          path: item,
          functionName: item.slice(1),
          serviceName,
        });
      }
    }

    return [{
      ...customDomain,
      routeConfigs,
    }]
  }

  static getPrivateConfig(codeUri) {

    let privateConfigYmlPath;
    try {
      privateConfigYmlPath = checkConfigYmlExist(codeUri);
    // @ts-ignore
    } catch (ex) {}
    if (privateConfigYmlPath) {
      const {
        function: privateFunctionConfig = {},
        http: privateHttp = {},
      } = yaml.load(fse.readFileSync(privateConfigYmlPath, 'utf8'));

      return { privateFunctionConfig, privateHttp }
    }

    return {
      privateFunctionConfig: {},
    }
  }

  static getPublishConfig(sourceCode) {
    const functionResolvePath = path.resolve(sourceCode);
    const configYmlPath = checkConfigYmlExist(functionResolvePath);

    const configs = yaml.load(fse.readFileSync(configYmlPath, 'utf8'));
    if (!configs.app.name) {
      throw new Error('app name is required.');
    }
    return configs;
  }
}
