"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkConfigYmlExist = exports.getLayerPaths = exports.detectUseOfLayer = exports.getCoreVerison = void 0;
var child_process_1 = require("child_process");
var path_1 = __importDefault(require("path"));
var fs_extra_1 = __importDefault(require("fs-extra"));
var core_1 = require("@serverless-devs/core");
var logger_1 = __importDefault(require("../../common/logger"));
function getCoreVerison(cwd) {
    var vm = core_1.spinner('get core verison');
    try {
        var version = child_process_1.execSync('npm view @serverless-devs/dk version', { cwd: cwd });
        vm.succeed();
        return version.toString().replace(/\n/g, '');
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvbGliL3V0aWxzL2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLCtDQUF5QztBQUN6Qyw4Q0FBd0I7QUFDeEIsc0RBQTJCO0FBQzNCLDhDQUFnRDtBQUNoRCwrREFBeUM7QUFFekMsU0FBZ0IsY0FBYyxDQUFDLEdBQUc7SUFDaEMsSUFBTSxFQUFFLEdBQUcsY0FBTyxDQUFDLGtCQUFrQixDQUFDLENBQUM7SUFDdkMsSUFBSTtRQUNGLElBQUksT0FBTyxHQUFRLHdCQUFRLENBQUMsc0NBQXNDLEVBQUUsRUFBRSxHQUFHLEtBQUEsRUFBRSxDQUFDLENBQUM7UUFDN0UsRUFBRSxDQUFDLE9BQU8sRUFBRSxDQUFDO1FBQ2IsT0FBTyxPQUFPLENBQUMsUUFBUSxFQUFFLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUMsQ0FBQztLQUM5QztJQUFDLE9BQU8sRUFBRSxFQUFFO1FBQ1gsRUFBRSxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ1YsTUFBTSxFQUFFLENBQUM7S0FDVjtBQUNILENBQUM7QUFWRCx3Q0FVQztBQUVELFNBQWdCLGdCQUFnQixDQUFDLFlBQW9CO0lBQXBCLDZCQUFBLEVBQUEsb0JBQW9CO0lBQzdDLElBQUEsS0FBOEQsYUFBYSxDQUFDLFlBQVksQ0FBQyxFQUF2RixtQkFBbUIseUJBQUEsRUFBRSxnQkFBZ0Isc0JBQUEsRUFBRSxnQkFBZ0Isc0JBQWdDLENBQUM7SUFFaEcsSUFBSTtRQUNGLElBQUksQ0FBQyxrQkFBRyxDQUFDLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLE1BQU0sRUFBRSxFQUFFO1lBQzVDLE9BQU8sS0FBSyxDQUFDO1NBQ2Q7S0FDRjtJQUFDLE9BQU8sRUFBRSxFQUFFO1FBQ1gsT0FBTyxLQUFLLENBQUM7S0FDZDtJQUVELElBQUk7UUFDRixJQUFJLGtCQUFHLENBQUMsUUFBUSxDQUFDLGdCQUFnQixDQUFDLENBQUMsV0FBVyxFQUFFLEVBQUU7WUFDaEQsT0FBTyxJQUFJLENBQUM7U0FDYjthQUFNO1lBQ0wsTUFBTSxFQUFFLENBQUM7U0FDVjtLQUNGO0lBQUMsT0FBTyxFQUFFLEVBQUU7UUFDWCxNQUFNLElBQUksS0FBSyxDQUNiLGtCQUFNLGdCQUFnQiw0RUFBZ0IsbUJBQW1CLDZEQUFrQixDQUM1RSxDQUFDO0tBQ0g7QUFDSCxDQUFDO0FBdEJELDRDQXNCQztBQUVELFNBQWdCLGFBQWEsQ0FBQyxZQUFvQjtJQUFwQiw2QkFBQSxFQUFBLG9CQUFvQjtJQUNoRCxJQUFNLG1CQUFtQixHQUFHLGNBQUksQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDLENBQUM7SUFDdkQsSUFBTSxnQkFBZ0IsR0FBRyxjQUFJLENBQUMsSUFBSSxDQUFDLG1CQUFtQixFQUFFLGNBQWMsQ0FBQyxDQUFDO0lBQ3hFLElBQU0sZ0JBQWdCLEdBQUcsY0FBSSxDQUFDLElBQUksQ0FBQyxtQkFBbUIsRUFBRSxjQUFjLENBQUMsQ0FBQztJQUV4RSxPQUFPO1FBQ0wsbUJBQW1CLHFCQUFBO1FBQ25CLGdCQUFnQixrQkFBQTtRQUNoQixnQkFBZ0Isa0JBQUE7S0FDakIsQ0FBQztBQUNKLENBQUM7QUFWRCxzQ0FVQztBQUVELHNCQUFzQjtBQUN0QixTQUFnQixtQkFBbUIsQ0FBQyxVQUFVLEVBQUUsT0FBa0I7SUFBbEIsd0JBQUEsRUFBQSxrQkFBa0I7SUFDaEUsSUFBSSxNQUFNLEdBQUcsY0FBSSxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUssT0FBTyxTQUFNLENBQUMsQ0FBQztJQUNyRCxJQUFJO1FBQ0YsSUFBSSxrQkFBRyxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQyxNQUFNLEVBQUUsRUFBRTtZQUNqQyxPQUFPLE1BQU0sQ0FBQztTQUNmO0tBQ0Y7SUFBQyxPQUFPLEVBQUUsRUFBRTtRQUNYLGdCQUFNLENBQUMsS0FBSyxDQUFDLDZCQUEyQixNQUFNLHNCQUFpQixFQUFJLENBQUMsQ0FBQztLQUN0RTtJQUVELE1BQU0sR0FBRyxjQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBSyxPQUFPLFVBQU8sQ0FBQyxDQUFDO0lBQ2xELElBQUk7UUFDRixJQUFJLGtCQUFHLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDLE1BQU0sRUFBRSxFQUFFO1lBQ2pDLE9BQU8sTUFBTSxDQUFDO1NBQ2Y7S0FDRjtJQUFDLE9BQU8sRUFBRSxFQUFFO1FBQ1gsZ0JBQU0sQ0FBQyxLQUFLLENBQUMsNkJBQTJCLE1BQU0sc0JBQWlCLEVBQUksQ0FBQyxDQUFDO0tBQ3RFO0lBQ0QsTUFBTSxJQUFJLEtBQUssQ0FBQyxRQUFNLGNBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFLE9BQU8sQ0FBQyw0QkFBeUIsQ0FBQyxDQUFDO0FBQ2pGLENBQUM7QUFuQkQsa0RBbUJDIn0=