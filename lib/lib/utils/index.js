"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkConfigYmlExist = exports.getLayerPaths = exports.detectUseOfLayer = exports.getCoreVerison = void 0;
var child_process_1 = require("child_process");
var lodash_1 = require("lodash");
var path_1 = __importDefault(require("path"));
var fs_extra_1 = __importDefault(require("fs-extra"));
var core_1 = require("@serverless-devs/core");
var logger_1 = __importDefault(require("../../common/logger"));
var layerPackageName = '@serverless-devs/dk';
function getCoreVerison(cwd) {
    var vm = core_1.spinner('get core verison');
    try {
        var verisonStr = child_process_1.execSync("npm ls --json " + layerPackageName, {
            cwd: cwd,
        }).toString();
        var version = lodash_1.get(JSON.parse(verisonStr), "dependencies." + layerPackageName + ".version");
        vm.succeed();
        return version;
    }
    catch (ex) {
        vm.fail();
        throw ex;
    }
}
exports.getCoreVerison = getCoreVerison;
function detectUseOfLayer(functionPath) {
    if (functionPath === void 0) { functionPath = 'src'; }
    var _a = getLayerPaths(functionPath), functionResolvePath = _a.functionResolvePath, layerPackagePath = _a.layerPackagePath, layerModulesPath = _a.layerModulesPath;
    try {
        if (!fs_extra_1.default.statSync(layerPackagePath).isFile()) {
            return false;
        }
    }
    catch (ex) {
        return false;
    }
    try {
        if (fs_extra_1.default.statSync(layerModulesPath).isDirectory()) {
            return true;
        }
        else {
            throw '';
        }
    }
    catch (ex) {
        throw new Error("\u68C0\u6D4B " + layerModulesPath + " \u662F\u5426\u662F\u76EE\u5F55\u5931\u8D25\uFF0C\u5EFA\u8BAE\u5728 " + functionResolvePath + " \u76EE\u5F55\u6267\u884C npm i \u540E\u518D\u5C1D\u8BD5");
    }
}
exports.detectUseOfLayer = detectUseOfLayer;
function getLayerPaths(functionPath) {
    if (functionPath === void 0) { functionPath = 'src'; }
    var functionResolvePath = path_1.default.resolve(functionPath);
    var layerPackagePath = path_1.default.join(functionResolvePath, 'package.json');
    var layerModulesPath = path_1.default.join(functionResolvePath, 'node_modules');
    return {
        functionResolvePath: functionResolvePath,
        layerPackagePath: layerPackagePath,
        layerModulesPath: layerModulesPath,
    };
}
exports.getLayerPaths = getLayerPaths;
// 检测 config yaml 是否存在
function checkConfigYmlExist(ymlDirName, ymlName) {
    if (ymlName === void 0) { ymlName = 'config'; }
    var ymlUri = path_1.default.join(ymlDirName, ymlName + ".yml");
    try {
        if (fs_extra_1.default.statSync(ymlUri).isFile()) {
            return ymlUri;
        }
    }
    catch (ex) {
        logger_1.default.debug("checkConfigYmlExist url " + ymlUri + " throw error: " + ex);
    }
    ymlUri = path_1.default.join(ymlDirName, ymlName + ".yaml");
    try {
        if (fs_extra_1.default.statSync(ymlUri).isFile()) {
            return ymlUri;
        }
    }
    catch (ex) {
        logger_1.default.debug("checkConfigYmlExist url " + ymlUri + " throw error: " + ex);
    }
    throw new Error("No " + path_1.default.join(ymlDirName, ymlName) + ".[yml|yaml] file found.");
}
exports.checkConfigYmlExist = checkConfigYmlExist;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvbGliL3V0aWxzL2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLCtDQUF5QztBQUN6QyxpQ0FBNkI7QUFDN0IsOENBQXdCO0FBQ3hCLHNEQUEyQjtBQUMzQiw4Q0FBZ0Q7QUFDaEQsK0RBQXlDO0FBRXpDLElBQU0sZ0JBQWdCLEdBQUcscUJBQXFCLENBQUM7QUFFL0MsU0FBZ0IsY0FBYyxDQUFDLEdBQUc7SUFDaEMsSUFBTSxFQUFFLEdBQUcsY0FBTyxDQUFDLGtCQUFrQixDQUFDLENBQUM7SUFDdkMsSUFBSTtRQUNGLElBQU0sVUFBVSxHQUFHLHdCQUFRLENBQUMsbUJBQWlCLGdCQUFrQixFQUFFO1lBQy9ELEdBQUcsS0FBQTtTQUNKLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUNkLElBQU0sT0FBTyxHQUFHLFlBQUcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxFQUFFLGtCQUFnQixnQkFBZ0IsYUFBVSxDQUFDLENBQUM7UUFDeEYsRUFBRSxDQUFDLE9BQU8sRUFBRSxDQUFDO1FBQ2IsT0FBTyxPQUFPLENBQUM7S0FDaEI7SUFBQyxPQUFNLEVBQUUsRUFBRTtRQUNWLEVBQUUsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUNWLE1BQU0sRUFBRSxDQUFDO0tBQ1Y7QUFDSCxDQUFDO0FBYkQsd0NBYUM7QUFFRCxTQUFnQixnQkFBZ0IsQ0FBQyxZQUFvQjtJQUFwQiw2QkFBQSxFQUFBLG9CQUFvQjtJQUM3QyxJQUFBLEtBSUYsYUFBYSxDQUFDLFlBQVksQ0FBQyxFQUg3QixtQkFBbUIseUJBQUEsRUFDbkIsZ0JBQWdCLHNCQUFBLEVBQ2hCLGdCQUFnQixzQkFDYSxDQUFDO0lBRWhDLElBQUk7UUFDRixJQUFJLENBQUMsa0JBQUcsQ0FBQyxRQUFRLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxNQUFNLEVBQUUsRUFBRTtZQUM1QyxPQUFPLEtBQUssQ0FBQztTQUNkO0tBQ0Y7SUFBQyxPQUFPLEVBQUUsRUFBRTtRQUNYLE9BQU8sS0FBSyxDQUFDO0tBQ2Q7SUFFRCxJQUFJO1FBQ0YsSUFBSSxrQkFBRyxDQUFDLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLFdBQVcsRUFBRSxFQUFFO1lBQ2hELE9BQU8sSUFBSSxDQUFDO1NBQ2I7YUFBTTtZQUNMLE1BQU0sRUFBRSxDQUFDO1NBQ1Y7S0FDRjtJQUFDLE9BQU0sRUFBRSxFQUFFO1FBQ1YsTUFBTSxJQUFJLEtBQUssQ0FBQyxrQkFBTSxnQkFBZ0IsNEVBQWdCLG1CQUFtQiw2REFBa0IsQ0FBQyxDQUFDO0tBQzlGO0FBQ0gsQ0FBQztBQXhCRCw0Q0F3QkM7QUFFRCxTQUFnQixhQUFhLENBQUMsWUFBb0I7SUFBcEIsNkJBQUEsRUFBQSxvQkFBb0I7SUFDaEQsSUFBTSxtQkFBbUIsR0FBRyxjQUFJLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxDQUFDO0lBQ3ZELElBQU0sZ0JBQWdCLEdBQUcsY0FBSSxDQUFDLElBQUksQ0FBQyxtQkFBbUIsRUFBRSxjQUFjLENBQUMsQ0FBQztJQUN4RSxJQUFNLGdCQUFnQixHQUFHLGNBQUksQ0FBQyxJQUFJLENBQUMsbUJBQW1CLEVBQUUsY0FBYyxDQUFDLENBQUM7SUFFeEUsT0FBTztRQUNMLG1CQUFtQixxQkFBQTtRQUNuQixnQkFBZ0Isa0JBQUE7UUFDaEIsZ0JBQWdCLGtCQUFBO0tBQ2pCLENBQUE7QUFDSCxDQUFDO0FBVkQsc0NBVUM7QUFHRCxzQkFBc0I7QUFDdEIsU0FBZ0IsbUJBQW1CLENBQUMsVUFBVSxFQUFFLE9BQWtCO0lBQWxCLHdCQUFBLEVBQUEsa0JBQWtCO0lBQ2hFLElBQUksTUFBTSxHQUFHLGNBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFLLE9BQU8sU0FBTSxDQUFDLENBQUM7SUFDckQsSUFBSTtRQUNGLElBQUksa0JBQUcsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUMsTUFBTSxFQUFFLEVBQUU7WUFDakMsT0FBTyxNQUFNLENBQUM7U0FDZjtLQUNGO0lBQUMsT0FBTyxFQUFFLEVBQUU7UUFDWCxnQkFBTSxDQUFDLEtBQUssQ0FBQyw2QkFBMkIsTUFBTSxzQkFBaUIsRUFBSSxDQUFDLENBQUM7S0FDdEU7SUFFRCxNQUFNLEdBQUcsY0FBSSxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUssT0FBTyxVQUFPLENBQUMsQ0FBQztJQUNsRCxJQUFJO1FBQ0YsSUFBSSxrQkFBRyxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQyxNQUFNLEVBQUUsRUFBRTtZQUNqQyxPQUFPLE1BQU0sQ0FBQztTQUNmO0tBQ0Y7SUFBQyxPQUFPLEVBQUUsRUFBRTtRQUNYLGdCQUFNLENBQUMsS0FBSyxDQUFDLDZCQUEyQixNQUFNLHNCQUFpQixFQUFJLENBQUMsQ0FBQztLQUN0RTtJQUNELE1BQU0sSUFBSSxLQUFLLENBQUMsUUFBTSxjQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRSxPQUFPLENBQUMsNEJBQXlCLENBQUMsQ0FBQztBQUNqRixDQUFDO0FBbkJELGtEQW1CQyJ9