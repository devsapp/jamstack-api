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
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
    FunctionComponent.prototype.formatHttpConfig = function (_a) {
        var configs = _a.configs, serviceName = _a.serviceName;
        var routeConfigs = [];
        for (var _i = 0, configs_1 = configs; _i < configs_1.length; _i++) {
            var config = configs_1[_i];
            if (config.triggers.type === 'http') {
                if (config.routerItem === '/') {
                    routeConfigs.push({
                        path: '/',
                        functionName: 'index',
                        serviceName: serviceName,
                    });
                    routeConfigs.push({
                        path: '/index',
                        functionName: 'index',
                        serviceName: serviceName,
                    });
                }
                else {
                    routeConfigs.push({
                        path: config.routerItem,
                        functionName: config.routerItem.slice(1),
                        serviceName: serviceName,
                    });
                }
            }
        }
        return routeConfigs;
    };
    FunctionComponent.prototype.deploy = function (inputs) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, configs, region, serviceName, useHttp, customDomain, domainName, domainConfig, functionPath, layer, coreLayer, fcDeploy, res, routeConfigs, _loop_1, _i, configs_2, config;
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
                        useHttp = lodash_1.find(configs, function (item) { return item.triggers.type === 'http'; });
                        if (!useHttp) return [3 /*break*/, 5];
                        return [4 /*yield*/, generateConfig_1.default.getCustomDomain(lodash_1.cloneDeep(inputs), region, serviceName)];
                    case 4:
                        domainConfig = _b.sent();
                        customDomain = domainConfig.customDomain;
                        domainName = domainConfig.domainName;
                        _b.label = 5;
                    case 5:
                        functionPath = inputs.props.sourceCode;
                        if (!utils_1.detectUseOfLayer(functionPath)) {
                            throw new Error('Failed to get layer configuration.');
                        }
                        layer = new layer_1.default({ region: region, credentials: inputs.credentials });
                        return [4 /*yield*/, layer.getLayerConfig(serviceName, functionPath)];
                    case 6:
                        coreLayer = _b.sent();
                        if (lodash_1.isEmpty(coreLayer)) {
                            throw new Error('Failed to get layer configuration.');
                        }
                        logger_1.default.debug("coreLayer: " + coreLayer);
                        return [4 /*yield*/, this.getFcDeploy()];
                    case 7:
                        fcDeploy = _b.sent();
                        res = [];
                        routeConfigs = this.formatHttpConfig({ configs: configs, serviceName: serviceName });
                        _loop_1 = function (config) {
                            var layers, _c, arn_1, layerName_1, _d, _e;
                            return __generator(this, function (_f) {
                                switch (_f.label) {
                                    case 0:
                                        if (config.triggers.type === 'http') {
                                            config.customDomains = [
                                                __assign(__assign({}, customDomain), { routeConfigs: routeConfigs }),
                                            ];
                                        }
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
                                        config.triggers = [config.triggers];
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
                        _i = 0, configs_2 = configs;
                        _b.label = 8;
                    case 8:
                        if (!(_i < configs_2.length)) return [3 /*break*/, 11];
                        config = configs_2[_i];
                        return [5 /*yield**/, _loop_1(config)];
                    case 9:
                        _b.sent();
                        _b.label = 10;
                    case 10:
                        _i++;
                        return [3 /*break*/, 8];
                    case 11:
                        _super.prototype.__report.call(this, {
                            name: 'jamstack-api',
                            access: inputs.project.access,
                            content: res,
                        });
                        return [2 /*return*/, useHttp ? { customDomain: domainName, 'fc-deploy-response': res } : res];
                }
            });
        });
    };
    FunctionComponent.prototype.remove = function (inputs) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, configs, fcDeploy, endConfigs, _i, configs_3, config;
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
                        _i = 0, configs_3 = configs;
                        _b.label = 5;
                    case 5:
                        if (!(_i < configs_3.length)) return [3 /*break*/, 8];
                        config = configs_3[_i];
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxpQ0FBdUQ7QUFDdkQsOENBQXFFO0FBQ3JFLHFDQUErQztBQUMvQyx3RUFBa0Q7QUFDbEQsc0RBQWdDO0FBQ2hDLDJEQUFxQztBQUNyQyw0REFBZ0Q7QUFDaEQsdURBQTBDO0FBRzFDO0lBQStDLHFDQUFhO0lBQTVEOztJQXNKQSxDQUFDO0lBckpPLHVDQUFXLEdBQWpCOzs7Ozt3QkFDRSxPQUFPLENBQUMsR0FBRyxDQUFDLHVCQUF1QixDQUFDLEdBQUcsS0FBSyxDQUFDO3dCQUN0QyxxQkFBTSxvQkFBYSxDQUFDLG1CQUFtQixDQUFDLEVBQUE7NEJBQS9DLHNCQUFPLFNBQXdDLEVBQUM7Ozs7S0FDakQ7SUFFTyw0Q0FBZ0IsR0FBeEIsVUFBeUIsRUFBd0I7WUFBdEIsT0FBTyxhQUFBLEVBQUUsV0FBVyxpQkFBQTtRQUM3QyxJQUFNLFlBQVksR0FBRyxFQUFFLENBQUM7UUFDeEIsS0FBcUIsVUFBTyxFQUFQLG1CQUFPLEVBQVAscUJBQU8sRUFBUCxJQUFPLEVBQUU7WUFBekIsSUFBTSxNQUFNLGdCQUFBO1lBQ2YsSUFBSSxNQUFNLENBQUMsUUFBUSxDQUFDLElBQUksS0FBSyxNQUFNLEVBQUU7Z0JBQ25DLElBQUksTUFBTSxDQUFDLFVBQVUsS0FBSyxHQUFHLEVBQUU7b0JBQzdCLFlBQVksQ0FBQyxJQUFJLENBQUM7d0JBQ2hCLElBQUksRUFBRSxHQUFHO3dCQUNULFlBQVksRUFBRSxPQUFPO3dCQUNyQixXQUFXLGFBQUE7cUJBQ1osQ0FBQyxDQUFDO29CQUNILFlBQVksQ0FBQyxJQUFJLENBQUM7d0JBQ2hCLElBQUksRUFBRSxRQUFRO3dCQUNkLFlBQVksRUFB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