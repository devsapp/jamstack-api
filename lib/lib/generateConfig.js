"use strict";
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
exports.instanceOfHttpTriggerConfig = void 0;
var path_1 = __importDefault(require("path"));
var core_1 = require("@serverless-devs/core");
var lodash_1 = __importStar(require("lodash"));
var constants = __importStar(require("../common/constants"));
var logger_1 = __importDefault(require("../common/logger"));
var dk_deploy_common_1 = require("@serverless-devs/dk-deploy-common");
function instanceOfHttpTriggerConfig(data) {
    return 'authType' in data && 'methods' in data;
}
exports.instanceOfHttpTriggerConfig = instanceOfHttpTriggerConfig;
var GenerateConfig = /** @class */ (function () {
    function GenerateConfig() {
    }
    GenerateConfig.generateConfig = function (inputs, command) {
        var _a;
        if (command === void 0) { command = 'deploy'; }
        return __awaiter(this, void 0, void 0, function () {
            var projectName, props, functionResolvePath, region, originApp, _b, publicHttp, app, service, publicFunctionConfig, filterRoute, routes, res, _loop_1, _i, routes_1, routerItem;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        projectName = lodash_1.get(inputs, 'project.projectName');
                        props = inputs.props;
                        core_1.reportComponent('jamstack-api', {
                            uid: (_a = inputs.credential) === null || _a === void 0 ? void 0 : _a.AccountID,
                            command: command,
                        });
                        functionResolvePath = path_1.default.resolve(props.sourceCode);
                        region = props.region, originApp = props.app, _b = props.http, publicHttp = _b === void 0 ? constants.DEFAULT_HTTP_TRIGGER_CONFIG : _b;
                        app = __assign(__assign({}, constants.DEFAULT_SERVICE), originApp);
                        logger_1.default.debug('默认配置');
                        logger_1.default.debug("region: " + region);
                        logger_1.default.debug("app: " + JSON.stringify(app));
                        logger_1.default.debug("public http: " + JSON.stringify(publicHttp));
                        service = lodash_1.pick(app, constants.SERVICE_KEYS);
                        publicFunctionConfig = lodash_1.pick(app, constants.FUNCIONS_KEYS);
                        logger_1.default.debug('配置处理');
                        logger_1.default.debug("serviceConfig: " + JSON.stringify(service));
                        logger_1.default.debug("public functionConfig: " + JSON.stringify(publicFunctionConfig));
                        filterRoute = lodash_1.get(core_1.commandParse(inputs), 'data.route');
                        logger_1.default.debug("filter route is: " + JSON.stringify(filterRoute));
                        logger_1.default.debug("route: " + JSON.stringify(props.route));
                        routes = filterRoute
                            ? props.route.filter(function (item) {
                                var formatRoute = path_1.default.join('/', filterRoute);
                                return formatRoute === item || (item === '/' && formatRoute === '/index');
                            })
                            : props.route;
                        logger_1.default.debug("filter route: " + JSON.stringify(routes));
                        if (lodash_1.default.isEmpty(routes)) {
                            throw new Error('There is no route that needs to be deployed.');
                        }
                        res = [];
                        _loop_1 = function (routerItem) {
                            var rtItem, codeUri, spath, scodeUri, scontent, sapp, sservice, privateConfig, _d, privateFunctionConfig, privateHttp, functionConfig, triggers;
                            return __generator(this, function (_e) {
                                switch (_e.label) {
                                    case 0:
                                        rtItem = (routerItem === '/' ? '/index' : routerItem).slice(1);
                                        codeUri = path_1.default.join(functionResolvePath, rtItem);
                                        return [4 /*yield*/, dk_deploy_common_1.generateTablestoreInitializer({ codeUri: codeUri, sourceCode: props.sourceCode, app: app })];
                                    case 1:
                                        _e.sent();
                                        spath = path_1.default.join(process.cwd(), '.s');
                                        scodeUri = path_1.default.join(spath, props.sourceCode, rtItem);
                                        return [4 /*yield*/, core_1.getYamlContent(path_1.default.join(spath, 's.yml'))];
                                    case 2:
                                        scontent = _e.sent();
                                        sapp = lodash_1.get(scontent, ['services', projectName, 'props', 'app']);
                                        sservice = lodash_1.pick(sapp, constants.SSERVICE_KEYS);
                                        return [4 /*yield*/, core_1.getYamlContent(path_1.default.join(scodeUri, 'config.yml'))];
                                    case 3:
                                        privateConfig = _e.sent();
                                        _d = privateConfig || {}, privateFunctionConfig = _d.function, privateHttp = _d.http;
                                        logger_1.default.debug("private function: " + JSON.stringify(privateFunctionConfig));
                                        logger_1.default.debug("private http: " + JSON.stringify(privateHttp));
                                        functionConfig = lodash_1.assign({ name: rtItem, codeUri: scodeUri }, publicFunctionConfig, privateFunctionConfig);
                                        triggers = (privateHttp || publicHttp).map(function (configItem) {
                                            var qualifier = configItem.qualifier || 'LATEST';
                                            delete configItem.qualifier;
                                            delete configItem.name;
                                            if (!instanceOfHttpTriggerConfig(configItem)) {
                                                throw new Error(routerItem + " configuration does not meet expectations,code uri is " + codeUri + ".");
                                            }
                                            return {
                                                name: configItem.name || qualifier,
                                                type: 'http',
                                                qualifier: qualifier,
                                                config: configItem,
                                            };
                                        });
                                        res.push({
                                            region: region,
                                            service: __assign(__assign({}, service), sservice),
                                            function: __assign(__assign({}, functionConfig), { environmentVariables: __assign(__assign({}, functionConfig.environmentVariables), dk_deploy_common_1.getEnvs()) }),
                                            triggers: triggers,
                                        });
                                        return [2 /*return*/];
                                }
                            });
                        };
                        _i = 0, routes_1 = routes;
                        _c.label = 1;
                    case 1:
                        if (!(_i < routes_1.length)) return [3 /*break*/, 4];
                        routerItem = routes_1[_i];
                        return [5 /*yield**/, _loop_1(routerItem)];
                    case 2:
                        _c.sent();
                        _c.label = 3;
                    case 3:
                        _i++;
                        return [3 /*break*/, 1];
                    case 4: return [2 /*return*/, res];
                }
            });
        });
    };
    GenerateConfig.getCustomDomain = function (inputs, region, serviceName) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b, customDomain, route, domain, _c, routeConfigs, _i, route_1, item;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        _a = inputs.props, _b = _a.customDomain, customDomain = _b === void 0 ? constants.DEFAULT_CUSTOM_DOMAIN_CONFIG : _b, route = _a.route;
                        if (!(customDomain.domainName.toUpperCase() === 'AUTO')) return [3 /*break*/, 3];
                        return [4 /*yield*/, core_1.loadComponent('devsapp/domain')];
                    case 1:
                        domain = _d.sent();
                        _c = customDomain;
                        return [4 /*yield*/, domain.get(__assign(__assign({}, inputs), { props: {
                                    type: 'fc',
                                    region: region,
                                    user: inputs.credentials.AccountID,
                                    service: serviceName,
                                    function: 'jamstack-api.system',
                                } }))];
                    case 2:
                        _c.domainName = _d.sent();
                        _d.label = 3;
                    case 3:
                        logger_1.default.debug("public customDomain: " + JSON.stringify(customDomain));
                        routeConfigs = [];
                        for (_i = 0, route_1 = route; _i < route_1.length; _i++) {
                            item = route_1[_i];
                            if (item === '/') {
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
                                    path: item,
                                    functionName: item.slice(1),
                                    serviceName: serviceName,
                                });
                            }
                        }
                        return [2 /*return*/, {
                                customDomains: [
                                    __assign(__assign({}, customDomain), { routeConfigs: routeConfigs }),
                                ],
                                domainName: customDomain.domainName,
                            }];
                }
            });
        });
    };
    return GenerateConfig;
}());
exports.default = GenerateConfig;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2VuZXJhdGVDb25maWcuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvbGliL2dlbmVyYXRlQ29uZmlnLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLDhDQUF3QjtBQUN4Qiw4Q0FLK0I7QUFDL0IsK0NBQThDO0FBQzlDLDZEQUFpRDtBQUNqRCw0REFBc0M7QUFDdEMsc0VBQTJGO0FBUTNGLFNBQWdCLDJCQUEyQixDQUFDLElBQVM7SUFDbkQsT0FBTyxVQUFVLElBQUksSUFBSSxJQUFJLFNBQVMsSUFBSSxJQUFJLENBQUM7QUFDakQsQ0FBQztBQUZELGtFQUVDO0FBRUQ7SUFBQTtJQTBKQSxDQUFDO0lBekpjLDZCQUFjLEdBQTNCLFVBQTRCLE1BQU0sRUFBRSxPQUFrQjs7UUFBbEIsd0JBQUEsRUFBQSxrQkFBa0I7Ozs7Ozt3QkFDOUMsV0FBVyxHQUFHLFlBQUcsQ0FBQyxNQUFNLEVBQUUscUJBQXFCLENBQUMsQ0FBQzt3QkFDL0MsS0FBSyxHQUFLLE1BQU0sTUFBWCxDQUFZO3dCQUN6QixzQkFBZSxDQUFDLGNBQWMsRUFBRTs0QkFDOUIsR0FBRyxFQUFFLE1BQUEsTUFBTSxDQUFDLFVBQVUsMENBQUUsU0FBUzs0QkFDakMsT0FBTyxTQUFBO3lCQUNSLENBQUMsQ0FBQzt3QkFHRyxtQkFBbUIsR0FBRyxjQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsQ0FBQzt3QkFHekQsTUFBTSxHQUdKLEtBQUssT0FIRCxFQUNELFNBQVMsR0FFWixLQUFLLElBRk8sRUFDZCxLQUNFLEtBQUssS0FEaUQsRUFBbEQsVUFBVSxtQkFBRyxTQUFTLENBQUMsMkJBQTJCLEtBQUEsQ0FDaEQ7d0JBQ0osR0FBRyx5QkFBUSxTQUFTLENBQUMsZUFBZSxHQUFLLFNBQVMsQ0FBRSxDQUFDO3dCQUMz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