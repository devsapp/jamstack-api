import path from 'path';
import { spawnSync } from 'child_process';
import {
  commandParse,
  loadComponent,
  reportComponent,
  getYamlContent,
  colors,
  spinner,
} from '@serverless-devs/core';
import _, { pick, get, assign } from 'lodash';
import * as constants from '../common/constants';
import logger from '../common/logger';
import { generateFile, getEnvs } from '@serverless-devs/dk-deploy-common';
import AddEdgeScript from './cdn/addEdgeScript';
import fs from 'fs-extra';

export interface HttpTriggerConfig {
  authType: string;
  methods: string[];
  name?: string;
  qualifier?: string;
}
export interface IOssTriggerConfig {
  bucketName: string;
  events: string[];
  filter: {
    prefix: string;
    suffix: string;
  };
}
export function instanceOfHttpTriggerConfig(data: any): data is HttpTriggerConfig {
  return 'authType' in data && 'methods' in data;
}

export function instanceOfIOssTriggerConfig(data: any): data is IOssTriggerConfig {
  return 'bucketName' in data && 'events' in data && 'filter' in data;
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

    const { region, app: originApp, http: publicHttp } = props;
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
      await this.execIndexjs(codeUri);
      await generateFile({ codeUri, sourceCode: props.sourceCode, app });
      const configPath = path.join(codeUri, 'config.yml');
      fs.existsSync(configPath) && fs.unlinkSync(configPath);

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
        constants.DEFAULT_FUNCTION_CONFIG,
        { name: rtItem, codeUri: scodeUri },
        publicFunctionConfig,
        privateFunctionConfig,
      );

      const triggers = await this.getTriggers({
        scodeUri,
        codeUri,
        http: privateHttp || publicHttp,
        routerItem,
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
        routerItem,
      });
    }
    return res;
  }

  static async getCustomDomain(inputs, region, serviceName) {
    const { customDomain = constants.DEFAULT_CUSTOM_DOMAIN_CONFIG, bucket, project } = inputs.props;
    const { credentials } = inputs;

    if (customDomain.domainName.toUpperCase() === 'AUTO') {
      const domain = await loadComponent('devsapp/domain');
      customDomain.domainName = await domain.get({
        ...inputs,
        props: {
          type: 'fc',
          region,
          user: credentials.AccountID,
          service: serviceName,
          function: 'jamstack-api.system',
        },
      });
      if (bucket) {
        const jamstackDomain = await domain.jamstack({
          ...inputs,
          props: {
            type: 'jamstack-fc',
            region,
            user: credentials.AccountID,
            service: serviceName,
            function: 'jamstack-api.system',
            bucket,
            customDomain: customDomain.domainName,
            project,
          },
        });
        logger.log(`\njamstackDomain: ${colors.cyan.underline(`http://${jamstackDomain}`)}`);

        const addEdgeScript = new AddEdgeScript(
          credentials.AccessKeyID,
          credentials.AccessKeySecret,
        );
        await addEdgeScript.init({ domain: jamstackDomain, fcDomain: customDomain.domainName });
      }
    }

    logger.debug(`public customDomain: ${JSON.stringify(customDomain)}`);
    return {
      customDomain,
      domainName: customDomain.domainName,
    };
  }

  static async execIndexjs(codeUri) {
    const indexJsPath = path.join(codeUri, 'index.js');
    const vm = spinner(`Execution instructions: node ${indexJsPath}`);
    try {
      const { status, stderr } = spawnSync(`node ${indexJsPath}`, { cwd: codeUri, shell: true });

      if (status) {
        vm.fail();
        logger.debug(`invoke ${codeUri} error: ${stderr.toString()}`);
      } else {
        vm.succeed();
      }
    } catch (ex) {
      vm.fail();
      logger.debug(`invoke ${codeUri} error: ${ex.message}`);
    }
  }

  static async getTriggers({ scodeUri, codeUri, http, routerItem }) {
    function throwError() {
      throw new Error(
        `${routerItem} configuration does not meet expectations,code uri is ${codeUri}.`,
      );
    }
    const configContent = await getYamlContent(path.join(scodeUri, 'config.yml'));
    if (configContent) {
      // oss触发器
      if ('oss' in configContent) {
        const { oss } = configContent;
        if (!instanceOfIOssTriggerConfig(oss)) throwError();
        return {
          name: 'ossTrigger',
          type: 'oss',
          config: oss,
        };
      }
    } else {
      //不存在，默认http函数
      const qualifier = get(http, 'qualifier', 'LATEST');
      const config = http
        ? pick(http, ['authType', 'methods'])
        : constants.DEFAULT_HTTP_TRIGGER_CONFIG;

      if (!instanceOfHttpTriggerConfig(config)) throwError();
      return {
        name: http?.name || qualifier,
        type: 'http',
        qualifier,
        config,
      };
    }
  }
}
