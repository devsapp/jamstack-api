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
var addEdgeScript_1 = __importDefault(require("./cdn/addEdgeScript"));
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
            var _a, _b, customDomain, route, bucket, project, credentials, domain, _c, jamstackDomain, addEdgeScript, routeConfigs, _i, route_1, item;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        _a = inputs.props, _b = _a.customDomain, customDomain = _b === void 0 ? constants.DEFAULT_CUSTOM_DOMAIN_CONFIG : _b, route = _a.route, bucket = _a.bucket, project = _a.project;
                        credentials = inputs.credentials;
                        if (!(customDomain.domainName.toUpperCase() === 'AUTO')) return [3 /*break*/, 5];
                        return [4 /*yield*/, core_1.loadComponent('devsapp/domain')];
                    case 1:
                        domain = _d.sent();
                        _c = customDomain;
                        return [4 /*yield*/, domain.get(__assign(__assign({}, inputs), { props: {
                                    type: 'fc',
                                    region: region,
                                    user: credentials.AccountID,
                                    service: serviceName,
                                    function: 'jamstack-api.system',
                                } }))];
                    case 2:
                        _c.domainName = _d.sent();
                        if (!bucket) return [3 /*break*/, 5];
                        return [4 /*yield*/, domain.jamstack(__assign(__assign({}, inputs), { props: {
                                    type: 'jamstack-fc',
                                    region: region,
                                    user: credentials.AccountID,
                                    service: serviceName,
                                    function: 'jamstack-api.system',
                                    bucket: bucket,
                                    customDomain: customDomain.domainName,
                                    project: project,
                                } }))];
                    case 3:
                        jamstackDomain = _d.sent();
                        logger_1.default.log("\njamstackDomain: " + core_1.colors.cyan.underline("http://" + jamstackDomain));
                        addEdgeScript = new addEdgeScript_1.default(credentials.AccessKeyID, credentials.AccessKeySecret);
                        return [4 /*yield*/, addEdgeScript.init({ domain: jamstackDomain, fcDomain: customDomain.domainName })];
                    case 4:
                        _d.sent();
                        _d.label = 5;
                    case 5:
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2VuZXJhdGVDb25maWcuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvbGliL2dlbmVyYXRlQ29uZmlnLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLDhDQUF3QjtBQUN4Qiw4Q0FNK0I7QUFDL0IsK0NBQThDO0FBQzlDLDZEQUFpRDtBQUNqRCw0REFBc0M7QUFDdEMsc0VBQTJGO0FBQzNGLHNFQUFnRDtBQVFoRCxTQUFnQiwyQkFBMkIsQ0FBQyxJQUFTO0lBQ25ELE9BQU8sVUFBVSxJQUFJLElBQUksSUFBSSxTQUFTLElBQUksSUFBSSxDQUFDO0FBQ2pELENBQUM7QUFGRCxrRUFFQztBQUVEO0lBQUE7SUFzTEEsQ0FBQztJQXJMYyw2QkFBYyxHQUEzQixVQUE0QixNQUFNLEVBQUUsT0FBa0I7O1FBQWxCLHdCQUFBLEVBQUEsa0JBQWtCOzs7Ozs7d0JBQzlDLFdBQVcsR0FBRyxZQUFHLENBQUMsTUFBTSxFQUFFLHFCQUFxQixDQUFDLENBQUM7d0JBQy9DLEtBQUssR0FBSyxNQUFNLE1BQVgsQ0FBWTt3QkFDekIsc0JBQWUsQ0FBQyxjQUFjLEVBQUU7NEJBQzlCLEdBQUcsRUFBRSxNQUFBLE1BQU0sQ0FBQyxVQUFVLDBDQUFFLFNBQVM7NEJBQ2pDLE9BQU8sU0FBQTt5QkFDUixDQUFDLENBQUM7d0JBR0csbUJBQW1CLEdBQUcsY0FBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLENBQUM7d0JBR3pELE1BQU0sR0FHSixLQUFLLE9BSEQsRUFDRCxTQUFTLEdBRVosS0FBSyxJQUZPLEVBQ2QsS0FDRSxLQUFLLEtBRGlELEVBQWxELFVBQVUsbUJBQUcsU0FBUyxDQUFDLDJCQUEyQixLQUFBLENBQ2hEO3dCQUNKLEdBQUcseUJBQVEsU0FBUyxDQUFDLGVBQWUsR0FBSyxTQUFTLENB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