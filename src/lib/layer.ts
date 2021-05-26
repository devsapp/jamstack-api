import { zip } from '@serverless-devs/core';
import fse from 'fs-extra';
import path from 'path';
import Client from './client';
import { getCoreVerison, getLayerPaths } from './utils/index';
import logger from '../common/logger';

const prefix = 'function-component-system-layer-';
const getLayerName = serviceName => `${prefix}${serviceName}`;

export default class Layer {
  constructor({ region, credentials }) {
    Client.setFcClient(region, credentials);
  }

  async getLayerConfig(serviceName, functionPath) {
    const layerName = getLayerName(serviceName);
    const listLayers = await Client.fcClient.listLayers({ prefix });
    
    for (const layerItem of listLayers) {
      if (layerItem.layerName === layerName) {
        return layerItem.Arn;
      }
    }

    return await this.publishLayerVersion(serviceName, functionPath);
  }

  async publishLayerVersion(serviceName, functionPath) {
    const {
      functionResolvePath,
      layerModulesPath,
    } = getLayerPaths(functionPath);
    const layerName = getLayerName(serviceName);

    const coreVersion = getCoreVerison(functionResolvePath);
    logger.debug(`layer core version: ${coreVersion},modules path: ${layerModulesPath}`);

    const zipPath = path.join(process.cwd(), '.s', 'functionComponent');
    const zipCatchPath = path.join(zipPath, 'catch');
    const codeUri = path.join(zipCatchPath, 'nodejs', 'node_modules');

    try {
      fse.removeSync(zipPath);
      fse.emptyDir(zipPath);
    } catch(ex) {
      logger.debug(ex);
    }
    await fse.copy(layerModulesPath, codeUri);

    await zip({
      codeUri: zipCatchPath,
      outputFilePath: zipPath,
      outputFileName: 'catch.zip'
    });
    const zipFile = fse.readFileSync(path.join(zipPath, 'catch.zip'), 'base64');
    fse.removeSync(zipPath);

    const { Arn } = await Client.fcClient.publishLayerVersion(layerName, {
      code: { zipFile },
      description: JSON.stringify({ version: coreVersion }),
      compatibleRuntime: [
        'nodejs12',
        'nodejs10',
        'nodejs8',
        'nodejs6',
      ]
    });
    
    return Arn;
  }
}
