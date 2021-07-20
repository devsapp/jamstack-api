"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var base_1 = __importDefault(require("./common/base"));
var FunctionComponent = /** @class */ (function (_super) {
    __extends(FunctionComponent, _super);
    function FunctionComponent() {
        return _super !== null && _super.apply(this, arguments) || this;
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
            var _a, configs, region, serviceName, _b, customDomains, domainName, functionPath, layer, coreLayer, fcDeploy, res, _loop_1, _i, configs_1, config;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        if (!!inputs.credentials) return [3 /*break*/, 2];
                        _a = inputs;
                        return [4 /*yield*/, core_1.getCredential(inputs.project.access)];
                    case 1:
                        _a.credentials = _c.sent();
                        _c.label = 2;
                    case 2: return [4 /*yield*/, generateConfig_1.default.generateConfig(lodash_1.cloneDeep(inputs))];
                    case 3:
                        configs = _c.sent();
                        region = configs[0].region;
                        serviceName = configs[0].service.name;
                        return [4 /*yield*/, generateConfig_1.default.getCustomDomain(lodash_1.cloneDeep(inputs), region, serviceName)];
                    case 4:
                        _b = _c.sent(), customDomains = _b.customDomains, domainName = _b.domainName;
                        functionPath = inputs.props.sourceCode;
                        if (!utils_1.detectUseOfLayer(functionPath)) {
                            throw new Error('Failed to get layer configuration.');
                        }
                        layer = new layer_1.default({ region: region, credentials: inputs.credentials });
                        return [4 /*yield*/, layer.getLayerConfig(serviceName, functionPath)];
                    case 5:
                        coreLayer = _c.sent();
                        if (lodash_1.isEmpty(coreLayer)) {
                            throw new Error('Failed to get layer configuration.');
                        }
                        logger_1.default.debug("coreLayer: " + coreLayer);
                        return [4 /*yield*/, this.getFcDeploy()];
                    case 6:
                        fcDeploy = _c.sent();
                        res = [];
                        _loop_1 = function (config) {
                            var layers, _d, arn_1, layerName_1, _e, _f;
                            return __generator(this, function (_g) {
                                switch (_g.label) {
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
                                            _d = coreLayer.split('#'), arn_1 = _d[0], layerName_1 = _d[1];
                                            if (lodash_1.isEmpty(layers.filter(function (item) { return item.startsWith(arn_1 + "#" + layerName_1); }))) {
                                                layers.push(coreLayer);
                                            }
                                        }
                                        else {
                                            config.function.layers = [coreLayer];
                                        }
                                        inputs.props = config;
                                        inputs.args = inputs.args.includes('--debug') ? '--debug' : '';
                                        _f = (_e = res).push;
                                        return [4 /*yield*/, fcDeploy.deploy(inputs)];
                                    case 1:
                                        _f.apply(_e, [_g.sent()]);
                                        return [2 /*return*/];
                                }
                            });
                        };
                        _i = 0, configs_1 = configs;
                        _c.label = 7;
                    case 7:
                        if (!(_i < configs_1.length)) return [3 /*break*/, 10];
                        config = configs_1[_i];
                        return [5 /*yield**/, _loop_1(config)];
                    case 8:
                        _c.sent();
                        _c.label = 9;
                    case 9:
                        _i++;
                        return [3 /*break*/, 7];
                    case 10:
                        _super.prototype.__report.call(this, {
                            name: 'jamstack-api',
                            access: inputs.project.access,
                            content: res,
                        });
                        return [2 /*return*/, { customDomain: domainName, response: res }];
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
}(base_1.default));
exports.default = FunctionComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsaUNBQWlEO0FBQ2pELDhDQUFxRTtBQUNyRSxxQ0FBK0M7QUFDL0Msd0VBQWtEO0FBQ2xELHNEQUFnQztBQUNoQywyREFBcUM7QUFDckMsNERBQWdEO0FBQ2hELHVEQUEwQztBQUcxQztJQUErQyxxQ0FBYTtJQUE1RDs7SUE4R0EsQ0FBQztJQTdHTyx1Q0FBVyxHQUFqQjs7Ozs7d0JBQ0UsT0FBTyxDQUFDLEdBQUcsQ0FBQyx1QkFBdUIsQ0FBQyxHQUFHLEtBQUssQ0FBQzt3QkFDdEMscUJBQU0sb0JBQWEsQ0FBQyxtQkFBbUIsQ0FBQyxFQUFBOzRCQUEvQyxzQkFBTyxTQUF3QyxFQUFDOzs7O0tBQ2pEO0lBRVksa0NBQU0sR0FBbkIsVUFBb0IsTUFBa0I7Ozs7Ozs2QkFDaEMsQ0FBQyxNQUFNLENBQUMsV0FBVyxFQUFuQix3QkFBbUI7d0JBQ3JCLEtBQUEsTUFBTSxDQUFBO3dCQUFlLHFCQUFNLG9CQUFhLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsRUFBQTs7d0JBQS9ELEdBQU8sV0FBVyxHQUFHLFNBQTBDLENBQUM7OzRCQUdsRCxxQkFBTSx3QkFBYyxDQUFDLGNBQWMsQ0FBQyxrQkFBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUE7O3dCQUFoRSxPQUFPLEdBQUcsU0FBc0Q7d0JBRWhFLE1BQU0sR0FBRyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDO3dCQUMzQixXQUFXLEdBQUcsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUM7d0JBQ04scUJBQU0sd0JBQWMsQ0FBQyxlQUFlLENBQ3hFLGtCQUFTLENBQUMs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