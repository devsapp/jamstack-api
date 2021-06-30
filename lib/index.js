"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
var constants = __importStar(require("./common/constants"));
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
                        _b = inputs.props, region = _b.region, app = _b.app;
                        serviceName = lodash_1.get(app, 'name', constants.DEFAULT_SERVICE.name);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsaUNBQWlEO0FBQ2pELDhDQUFxRTtBQUNyRSxxQ0FBK0M7QUFDL0Msd0VBQWtEO0FBQ2xELHNEQUFnQztBQUNoQywyREFBcUM7QUFDckMsNERBQWdEO0FBRWhEO0lBQUE7SUF3R0EsQ0FBQztJQXZHTyx1Q0FBVyxHQUFqQjs7Ozs7d0JBQ0UsT0FBTyxDQUFDLEdBQUcsQ0FBQyx1QkFBdUIsQ0FBQyxHQUFHLEtBQUssQ0FBQzt3QkFDdEMscUJBQU0sb0JBQWEsQ0FBQyxtQkFBbUIsQ0FBQyxFQUFBOzRCQUEvQyxzQkFBTyxTQUF3QyxFQUFDOzs7O0tBQ2pEO0lBRVksa0NBQU0sR0FBbkIsVUFBb0IsTUFBTTs7Ozs7OzZCQUNwQixDQUFDLE1BQU0sQ0FBQyxXQUFXLEVBQW5CLHdCQUFtQjt3QkFDckIsS0FBQSxNQUFNLENBQUE7d0JBQWUscUJBQU0sb0JBQWEsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxFQUFBOzt3QkFBL0QsR0FBTyxXQUFXLEdBQUcsU0FBMEMsQ0FBQzs7NEJBR2xELHFCQUFNLHdCQUFjLENBQUMsY0FBYyxDQUFDLGtCQUFTLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBQTs7d0JBQWhFLE9BQU8sR0FBRyxTQUFzRDt3QkFFaEUsTUFBTSxHQUFHLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUM7d0JBQzNCLFdBQVcsR0FBRyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQzt3QkFDdEIscUJBQU0sd0JBQWMsQ0FBQyxlQUFlLENBQ3hELGtCQUFTLENBQUMsTUFBTSxDQUFDLEVBQ2pCLE1BQU0sRUFDTixXQUFXLENBQ1osRUFBQTs7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