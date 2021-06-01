"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var lodash_1 = require("lodash");
var core_1 = require("@serverless-devs/core");
var utils_1 = require("./lib/utils");
var generateConfig_1 = __importDefault(require("./lib/generateConfig"));
var layer_1 = __importDefault(require("./lib/layer"));
var logger_1 = __importDefault(require("./common/logger"));
var FunctionComponent = /** @class */ (function () {
    function FunctionComponent() {
    }
    FunctionComponent.prototype.getFcDeploy = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        process.env['s-default-deploy-type'] = 'sdk';
                        return [4 /*yield*/, core_1.loadComponent('devsapp/fc-deploy')];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    FunctionComponent.prototype.deploy = function (inputs) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, configs, region, serviceName, customDomains, functionPath, layer, coreLayer, fcDeploy, res, _loop_1, _i, configs_1, config;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!!inputs.credentials) return [3 /*break*/, 2];
                        _a = inputs;
                        return [4 /*yield*/, core_1.getCredential(inputs.project.access)];
                    case 1:
                        _a.credentials = _b.sent();
                        _b.label = 2;
                    case 2: return [4 /*yield*/, generateConfig_1.default.generateConfig(lodash_1.cloneDeep(inputs))];
                    case 3:
                        configs = _b.sent();
                        region = configs[0].region;
                        serviceName = configs[0].service.name;
                        return [4 /*yield*/, generateConfig_1.default.getCustomDomain(lodash_1.cloneDeep(inputs), region, serviceName)];
                    case 4:
                        customDomains = _b.sent();
                        functionPath = inputs.props.sourceCode;
                        if (!utils_1.detectUseOfLayer(functionPath)) {
                            throw new Error('Failed to get layer configuration.');
                        }
                        layer = new layer_1.default({ region: region, credentials: inputs.credentials });
                        return [4 /*yield*/, layer.getLayerConfig(serviceName, functionPath)];
                    case 5:
                        coreLayer = _b.sent();
                        if (lodash_1.isEmpty(coreLayer)) {
                            throw new Error('Failed to get layer configuration.');
                        }
                        logger_1.default.debug("coreLayer: " + coreLayer);
                        return [4 /*yield*/, this.getFcDeploy()];
                    case 6:
                        fcDeploy = _b.sent();
                        res = [];
                        _loop_1 = function (config) {
                            var layers, _c, arn_1, layerName_1, _d, _e;
                            return __generator(this, function (_f) {
                                switch (_f.label) {
                                    case 0:
                                        config.customDomains = customDomains;
                                        layers = config.function.layers;
                                        /**
                                         * 查看是否配置了 layer
                                         *  如果没有配置则直接使用 layer
                                         *  如果配置了 layer，则查看 arn 和 layer name 是否一致
                                         *    一致则使用用户的指定配置
                                         *    不一致则追加一个 layer 配置
                                         */
                                        if (layers) {
                                            _c = coreLayer.split('#'), arn_1 = _c[0], layerName_1 = _c[1];
                                            if (lodash_1.isEmpty(layers.filter(function (item) { return item.startsWith(arn_1 + "#" + layerName_1); }))) {
                                                layers.push(coreLayer);
                                            }
                                        }
                                        else {
                                            config.function.layers = [coreLayer];
                                        }
                                        inputs.props = config;
                                        inputs.args = inputs.args.includes('--debug') ? '--debug' : '';
                                        _e = (_d = res).push;
                                        return [4 /*yield*/, fcDeploy.deploy(inputs)];
                                    case 1:
                                        _e.apply(_d, [_f.sent()]);
                                        return [2 /*return*/];
                                }
                            });
                        };
                        _i = 0, configs_1 = configs;
                        _b.label = 7;
                    case 7:
                        if (!(_i < configs_1.length)) return [3 /*break*/, 10];
                        config = configs_1[_i];
                        return [5 /*yield**/, _loop_1(config)];
                    case 8:
                        _b.sent();
                        _b.label = 9;
                    case 9:
                        _i++;
                        return [3 /*break*/, 7];
                    case 10: return [2 /*return*/, res];
                }
            });
        });
    };
    FunctionComponent.prototype.remove = function (inputs) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, configs, fcDeploy, endConfigs, _i, configs_2, config;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!!inputs.credentials) return [3 /*break*/, 2];
                        _a = inputs;
                        return [4 /*yield*/, core_1.getCredential(inputs.project.access)];
                    case 1:
                        _a.credentials = _b.sent();
                        _b.label = 2;
                    case 2: return [4 /*yield*/, generateConfig_1.default.generateConfig(lodash_1.cloneDeep(inputs))];
                    case 3:
                        configs = _b.sent();
                        return [4 /*yield*/, this.getFcDeploy()];
                    case 4:
                        fcDeploy = _b.sent();
                        endConfigs = configs.pop();
                        _i = 0, configs_2 = configs;
                        _b.label = 5;
                    case 5:
                        if (!(_i < configs_2.length)) return [3 /*break*/, 8];
                        config = configs_2[_i];
                        inputs.props = config;
                        inputs.args = inputs.args.includes('--debug') ? 'function --debug' : 'function';
                        return [4 /*yield*/, fcDeploy.remove(inputs)];
                    case 6:
                        _b.sent();
                        _b.label = 7;
                    case 7:
                        _i++;
                        return [3 /*break*/, 5];
                    case 8:
                        inputs.props = endConfigs;
                        inputs.args = inputs.args.includes('--debug') ? 'service --debug' : 'service';
                        return [4 /*yield*/, fcDeploy.remove(inputs)];
                    case 9:
                        _b.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    FunctionComponent.prototype.publicLayerVersion = function (inputs) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, functionPath, _b, region, app, serviceName, layer, coreLayer;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        if (!!inputs.credentials) return [3 /*break*/, 2];
                        _a = inputs;
                        return [4 /*yield*/, core_1.getCredential(inputs.project.access)];
                    case 1:
                        _a.credentials = _c.sent();
                        _c.label = 2;
                    case 2:
                        functionPath = inputs.props.sourceCode;
                        if (!utils_1.detectUseOfLayer(functionPath)) {
                            throw new Error('Failed to get layer configuration.');
                        }
                        _b = generateConfig_1.default.getPublishConfig(inputs.props.sourceCode), region = _b.region, app = _b.app;
                        serviceName = app.name;
                        layer = new layer_1.default({ region: region, credentials: inputs.credentials });
                        return [4 /*yield*/, layer.publishLayerVersion(serviceName, functionPath)];
                    case 3:
                        coreLayer = _c.sent();
                        if (lodash_1.isEmpty(coreLayer)) {
                            throw new Error('Failed to get layer configuration.');
                        }
                        return [2 /*return*/, coreLayer];
                }
            });
        });
    };
    return FunctionComponent;
}());
exports.default = FunctionComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxpQ0FBNEM7QUFDNUMsOENBQXFFO0FBQ3JFLHFDQUErQztBQUMvQyx3RUFBa0Q7QUFDbEQsc0RBQWdDO0FBQ2hDLDJEQUFxQztBQUVyQztJQUFBO0lBcUdBLENBQUM7SUFuR08sdUNBQVcsR0FBakI7Ozs7O3dCQUNFLE9BQU8sQ0FBQyxHQUFHLENBQUMsdUJBQXVCLENBQUMsR0FBRyxLQUFLLENBQUM7d0JBQ3RDLHFCQUFNLG9CQUFhLENBQUMsbUJBQW1CLENBQUMsRUFBQTs0QkFBL0Msc0JBQU8sU0FBd0MsRUFBQzs7OztLQUNqRDtJQUVZLGtDQUFNLEdBQW5CLFVBQW9CLE1BQU07Ozs7Ozs2QkFDcEIsQ0FBQyxNQUFNLENBQUMsV0FBVyxFQUFuQix3QkFBbUI7d0JBQ3JCLEtBQUEsTUFBTSxDQUFBO3dCQUFlLHFCQUFNLG9CQUFhLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsRUFBQTs7d0JBQS9ELEdBQU8sV0FBVyxHQUFHLFNBQTBDLENBQUM7OzRCQUdsRCxxQkFBTSx3QkFBYyxDQUFDLGNBQWMsQ0FBQyxrQkFBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUE7O3dCQUFoRSxPQUFPLEdBQUcsU0FBc0Q7d0JBRWhFLE1BQU0sR0FBRyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDO3dCQUMzQixXQUFXLEdBQUcsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUM7d0JBQ3RCLHFCQUFNLHdCQUFjLENBQUMsZUFBZSxDQUFDLGtCQUFTLENBQUMsTUFBTSxDQUFDLEVBQUUsTUFBTSxFQUFFLFdBQVcsQ0FBQyxFQUFBOzt3QkFBNUYsYUFBYSxHQUFHLFNBQTRFO3dCQUc1RixZQUFZ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