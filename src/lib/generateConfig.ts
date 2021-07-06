import path from 'path';
import {
  commandParse,
  loadComponent,
  reportComponent,
  getYamlContent,
} from '@serverless-devs/core';
import _, { pick, get, assign } from 'lodash';
import * as constants from '../common/constants';
import logger from '../common/logger';
import { generateTablestoreInitializer, getEnvs } from '@serverless-devs/dk-deploy-common';

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
  static async generateConfig(inputs, command = 'deploy'): Promise<any> {
    const projectName = get(inputs, 'project.projectName');
    const { props } = inputs;
    reportComponent('jamstack-api', {
      uid: inputs.credential?.AccountID,
      command,
    });

    // 配置文件处理
    const functionResolvePath = path.resolve(props.sourceCode);

    const {
      region,
      app: originApp,
      http: publicHttp = constants.DEFAULT_HTTP_TRIGGER_CONFIG,
    } = props;
    const app = { ...constants.DEFAULT_SERVICE, ...originApp };
    logger.debug('默认配置');
    logger.debug(`region: ${region}`);
    logger.debug(`app: ${JSON.stringify(app)}`);
    logger.debug(`public http: ${JSON.stringify(publicHttp)}`);
    const service = pick(app, constants.SERVICE_KEYS);
    const publicFunctionConfig = pick(app, constants.FUNCIONS_KEYS);
    logger.debug('配置处理');
    logger.debug(`serviceConfig: ${JSON.stringify(service)}`);
    logger.debug(`public functionConfig: ${JSON.stringify(publicFunctionConfig)}`);

    const filterRoute = get(commandParse(inputs), 'data.route'); // 部署单个函数 --route index
    logger.debug(`filter route is: ${JSON.stringify(filterRoute)}`);
    logger.debug(`route: ${JSON.stringify(props.route)}`);
    const routes = filterRoute
      ? props.route.filter((item) => {
          const formatRoute = path.join('/', filterRoute);
          return formatRoute === item || (item === '/' && formatRoute === '/index');
        })
      : props.route;
    logger.debug(`filter route: ${JSON.stringify(routes)}`);

    if (_.isEmpty(routes)) {
      throw new Error('There is no route that needs to be deployed.');
    }

    const res = [];
    // 解析配置
    for (const routerItem of routes) {
      const rtItem = (routerItem === '/' ? '/index' : routerItem).slice(1);
      const codeUri = path.join(functionResolvePath, rtItem);

      await generateTablestoreInitializer({ codeUri, sourceCode: props.sourceCode, app });

      const spath = path.join(process.cwd(), '.s');
      const scodeUri = path.join(spath, props.sourceCode, rtItem);
      const scontent = await getYamlContent(path.join(spath, 's.yml'));
      const sapp = get(scontent, ['services', projectName, 'props', 'app']);
      const sservice = pick(sapp, constants.SSERVICE_KEYS);

      const privateConfig = await getYamlContent(path.join(scodeUri, 'config.yml'));
      const { function: privateFunctionConfig, http: privateHttp } = privateConfig || {};

      logger.debug(`private function: ${JSON.stringify(privateFunctionConfig)}`);
      logger.debug(`private http: ${JSON.stringify(privateHttp)}`);

      const functionConfig = assign(
        { name: rtItem, codeUri: scodeUri },
        publicFunctionConfig,
        privateFunctionConfig,
      );

      const triggers = (privateHttp || publicHttp).map((configItem) => {
        const qualifier = configItem.qualifier || 'LATEST';
        delete configItem.qualifier;
        delete configItem.name;

        if (!instanceOfHttpTriggerConfig(configItem)) {
          throw new Error(
            `${routerItem} configuration does not meet expectations,code uri is ${codeUri}.`,
          );
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
        service: {
          ...service,
          ...sservice,
        },
        function: {
          ...functionConfig,
          environmentVariables: { ...functionConfig.environmentVariables, ...getEnvs() },
        },
        triggers,
      });
    }
    return res;
  }

  static async getCustomDomain(inputs, region, serviceName) {
    const { customDomain = constants.DEFAULT_CUSTOM_DOMAIN_CONFIG, route } = inputs.props;

    if (customDomain.domainName.toUpperCase() === 'AUTO') {
      const domain = await loadComponent('devsapp/domain');
      customDomain.domainName = await domain.get({
        ...inputs,
        props: {
          type: 'fc',
          region,
          user: inputs.credentials.AccountID,
          service: serviceName,
          function: 'jamstack-api.system',
        },
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
    return {
      customDomains: [
        {
          ...customDomain,
          routeConfigs,
        },
      ],
      domainName: customDomain.domainName,
    };
  }
}
