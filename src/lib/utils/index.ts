import { execSync } from 'child_process';
import { get } from 'lodash';
import path from 'path';
import fse from 'fs-extra';
import { spinner } from '@serverless-devs/core';
import logger from '../../common/logger';

const layerPackageName = '@serverless-devs/dk';

export function getCoreVerison(cwd) {
  const vm = spinner('get core verison');
  try {
    const verisonStr = execSync(`npm ls --json ${layerPackageName}`, {
      cwd,
    }).toString();
    const version = get(JSON.parse(verisonStr), `dependencies.${layerPackageName}.version`);
    vm.succeed();
    return version;
  } catch(ex) {
    vm.fail();
    throw ex;
  }
}

export function detectUseOfLayer(functionPath = 'src') {
  const {
    functionResolvePath,
    layerPackagePath,
    layerModulesPath,
  } = getLayerPaths(functionPath);

  try {
    if (!fse.statSync(layerPackagePath).isFile()) {
      return false;
    }
  } catch (ex) {
    return false;
  }

  try {
    if (fse.statSync(layerModulesPath).isDirectory()) {
      return true;
    } else {
      throw '';
    }
  } catch(ex) {
    throw new Error(`检测 ${layerModulesPath} 是否是目录失败，建议在 ${functionResolvePath} 目录执行 npm i 后再尝试`);
  }
}

export function getLayerPaths(functionPath = 'src') {
  const functionResolvePath = path.resolve(functionPath);
  const layerPackagePath = path.join(functionResolvePath, 'package.json');
  const layerModulesPath = path.join(functionResolvePath, 'node_modules');

  return {
    functionResolvePath,
    layerPackagePath,
    layerModulesPath,
  }
}


// 检测 config yaml 是否存在
export function checkConfigYmlExist(ymlDirName, ymlName = 'config') {
  let ymlUri = path.join(ymlDirName, `${ymlName}.yml`);
  try {
    if (fse.statSync(ymlUri).isFile()) {
      return ymlUri;
    }
  } catch (ex) {
    logger.debug(`checkConfigYmlExist url ${ymlUri} throw error: ${ex}`);
  }

  ymlUri = path.join(ymlDirName, `${ymlName}.yaml`);
  try {
    if (fse.statSync(ymlUri).isFile()) {
      return ymlUri;
    }
  } catch (ex) {
    logger.debug(`checkConfigYmlExist url ${ymlUri} throw error: ${ex}`);
  }
  throw new Error(`No ${path.join(ymlDirName, ymlName)}.[yml|yaml] file found.`);
}
