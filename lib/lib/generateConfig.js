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
var fse = __importStar(require("fs-extra"));
var child_process_1 = require("child_process");
var core_1 = require("@serverless-devs/core");
var lodash_1 = __importStar(require("lodash"));
var constants = __importStar(require("../common/constants"));
var js_yaml_1 = __importDefault(require("js-yaml"));
var logger_1 = __importDefault(require("../common/logger"));
var utils_1 = require("./utils");
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
            var props, projectName, functionResolvePath, _b, region, app, _c, publicHttp, service, publicFunctionConfig, filterRoute, routes, res, paths, _loop_1, this_1, _i, routes_1, routerItem;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        props = inputs.props;
                        projectName = lodash_1.get(inputs, 'project.projectName');
                        core_1.reportComponent('jamstack-api', {
                            uid: (_a = inputs.credential) === null || _a === void 0 ? void 0 : _a.AccountID,
                            command: command,
                        });
                        functionResolvePath = path_1.default.resolve(props.sourceCode);
                        _b = this.getPublishConfig(props), region = _b.region, app = _b.app, _c = _b.http, publicHttp = _c === void 0 ? constants.DEFAULT_HTTP_TRIGGER_CONFIG : _c;
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
                                return filterRoute === item.slice(1) ||
                                    item === filterRoute ||
                                    (item === '/' && filterRoute === 'index');
                            })
                            : props.route;
                        logger_1.default.debug("filter route: " + JSON.stringify(routes));
                        if (lodash_1.default.isEmpty(routes)) {
                            throw new Error('There is no route that needs to be deployed.');
                        }
                        res = [];
                        paths = [];
                        _loop_1 = function (routerItem) {
                            var rtItem, codeUri, _e, privateFunctionConfig, privateHttp, scodeUri, spublicConfigPath, sapp, spublicFunctionConfig, sservice, sprivateFunctionConfig, functionConfig, triggers;
                            return __generator(this, function (_f) {
                                switch (_f.label) {
                                    case 0:
                                        rtItem = (routerItem === '/' ? '/index' : routerItem).slice(1);
                                        if (paths.includes(rtItem)) {
                                            throw new Error('The same route exists.');
                                        }
                                        paths.push(rtItem);
                                        codeUri = path_1.default.join(functionResolvePath, rtItem);
                                        _e = this_1.getPrivateConfig(codeUri), privateFunctionConfig = _e.privateFunctionConfig, privateHttp = _e.privateHttp;
                                        return [4 /*yield*/, dk_deploy_common_1.generateTablestoreInitializer({ codeUri: codeUri, sourceCode: props.sourceCode, app: app })];
                                    case 1:
                                        _f.sent();
                                        return [4 /*yield*/, dk_deploy_common_1.generateHttpRouter({ codeUri: codeUri, routePath: rtItem, projectName: projectName })];
                                    case 2:
                                        _f.sent();
                                        logger_1.default.debug("private function: " + JSON.stringify(privateFunctionConfig));
                                        logger_1.default.debug("private http: " + JSON.stringify(privateHttp));
                                        scodeUri = path_1.default.join(process.cwd(), '.s', props.sourceCode, rtItem);
                                        spublicConfigPath = path_1.default.join(process.cwd(), '.s', props.sourceCode, 'config.yml');
                                        return [4 /*yield*/, core_1.getYamlContent(spublicConfigPath)];
                                    case 3:
                                        sapp = ((_f.sent()) || {}).app;
                                        spublicFunctionConfig = lodash_1.pick(sapp, constants.FUNCIONS_KEYS);
                                        sservice = lodash_1.pick(sapp, constants.SERVICE_KEYS);
                                        return [4 /*yield*/, core_1.getYamlContent(path_1.default.join(scodeUri, 'config.yml'))];
                                    case 4:
                                        sprivateFunctionConfig = ((_f.sent()) || {}).function;
                                        functionConfig = lodash_1.assign({ name: rtItem, codeUri: scodeUri }, publicFunctionConfig, spublicFunctionConfig, privateFunctionConfig, sprivateFunctionConfig);
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
                                            function: functionConfig,
                                            triggers: triggers,
                                        });
                                        return [2 /*return*/];
                                }
                            });
                        };
                        this_1 = this;
                        _i = 0, routes_1 = routes;
                        _d.label = 1;
                    case 1:
                        if (!(_i < routes_1.length)) return [3 /*break*/, 4];
                        routerItem = routes_1[_i];
                        return [5 /*yield**/, _loop_1(routerItem)];
                    case 2:
                        _d.sent();
                        _d.label = 3;
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
            var _a, customDomain, projectName, domain, _b, routeConfigs, sspath, ssYmlContent, route, _i, route_1, item;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _a = inputs.props.customDomain, customDomain = _a === void 0 ? constants.DEFAULT_CUSTOM_DOMAIN_CONFIG : _a;
                        projectName = lodash_1.get(inputs, 'project.projectName');
                        if (!(customDomain.domainName.toUpperCase() === 'AUTO')) return [3 /*break*/, 3];
                        return [4 /*yield*/, core_1.loadComponent('devsapp/domain')];
                    case 1:
                        domain = _c.sent();
                        _b = customDomain;
                        return [4 /*yield*/, domain.get(__assign(__assign({}, inputs), { props: {
                                    type: 'fc',
                                    region: region,
                                    user: inputs.credentials.AccountID,
                                    service: serviceName,
                                    function: 'jamstack-api.system',
                                } }))];
                    case 2:
                        _b.domainName = _c.sent();
                        _c.label = 3;
                    case 3:
                        logger_1.default.debug("public customDomain: " + JSON.stringify(customDomain));
                        routeConfigs = [];
                        sspath = utils_1.checkConfigYmlExist(path_1.default.resolve('.s'), 's');
                        return [4 /*yield*/, core_1.getYamlContent(sspath)];
                    case 4:
                        ssYmlContent = _c.sent();
                        route = lodash_1.get(ssYmlContent, ['services', projectName, 'props', 'route']);
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
                                    functionName: lodash_1.replace(item, '/*', '').slice(1),
                                    serviceName: serviceName,
                                });
                            }
                        }
                        return [2 /*return*/, [
                                __assign(__assign({}, customDomain), { routeConfigs: routeConfigs }),
                            ]];
                }
            });
        });
    };
    GenerateConfig.getPrivateConfig = function (codeUri) {
        var indexJsPath = path_1.default.join(codeUri, 'index.js');
        var vm = core_1.spinner("Execution instructions: node " + indexJsPath);
        try {
            var _a = child_process_1.spawnSync("node " + indexJsPath, { cwd: codeUri, shell: true }), status_1 = _a.status, stderr = _a.stderr;
            if (status_1) {
                vm.fail();
                logger_1.default.debug("invoke " + codeUri + " error: " + stderr.toString());
            }
            else {
                vm.succeed();
            }
        }
        catch (ex) {
            vm.fail();
            logger_1.default.debug("invoke " + codeUri + " error: " + ex.message);
        }
        var privateConfigYmlPath;
        try {
            privateConfigYmlPath = utils_1.checkConfigYmlExist(codeUri);
            // @ts-ignore
        }
        catch (ex) { }
        if (privateConfigYmlPath) {
            var _b = js_yaml_1.default.load(fse.readFileSync(privateConfigYmlPath, 'utf8')), _c = _b.function, privateFunctionConfig = _c === void 0 ? {} : _c, _d = _b.http, privateHttp = _d === void 0 ? {} : _d;
            return { privateFunctionConfig: privateFunctionConfig, privateHttp: privateHttp };
        }
        return {
            privateFunctionConfig: {},
        };
    };
    GenerateConfig.getPublishConfig = function (props) {
        var sourceCode = props.sourceCode;
        var functionResolvePath = path_1.default.resolve(sourceCode);
        var configYmlPath = utils_1.checkConfigYmlExist(functionResolvePath);
        var configs = js_yaml_1.default.load(fse.readFileSync(configYmlPath, 'utf8'));
        configs.app = __assign(__assign({}, props.app), configs.app);
        if (!configs.app.name) {
            throw new Error('app name is required.');
        }
        return configs;
    };
    return GenerateConfig;
}());
exports.default = GenerateConfig;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2VuZXJhdGVDb25maWcuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvbGliL2dlbmVyYXRlQ29uZmlnLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLDhDQUF3QjtBQUN4Qiw0Q0FBZ0M7QUFDaEMsK0NBQTBDO0FBQzFDLDhDQU0rQjtBQUMvQiwrQ0FBdUQ7QUFDdkQsNkRBQWlEO0FBQ2pELG9EQUEyQjtBQUMzQiw0REFBc0M7QUFDdEMsaUNBQThDO0FBQzlDLHNFQUcyQztBQVEzQyxTQUFnQiwyQkFBMkIsQ0FBQyxJQUFTO0lBQ25ELE9BQU8sVUFBVSxJQUFJLElBQUksSUFBSSxTQUFTLElBQUksSUFBSSxDQUFDO0FBQ2pELENBQUM7QUFGRCxrRUFFQztBQUVEO0lBQUE7SUFnTkEsQ0FBQztJQS9NYyw2QkFBYyxHQUEzQixVQUE0QixNQUFNLEVBQUUsT0FBa0I7O1FBQWxCLHdCQUFBLEVBQUEsa0JBQWtCOzs7Ozs7d0JBQzlDLEtBQUssR0FBRyxNQUFNLENBQUMsS0FBSyxDQUFDO3dCQUNyQixXQUFXLEdBQUcsWUFBRyxDQUFDLE1BQU0sRUFBRSxxQkFBcUIsQ0FBQyxDQUFDO3dCQUN2RCxzQkFBZSxDQUFDLGNBQWMsRUFBRTs0QkFDOUIsR0FBRyxFQUFFLE1BQUEsTUFBTSxDQUFDLFVBQVUsMENBQUUsU0FBUzs0QkFDakMsT0FBTyxTQUFBO3lCQUNSLENBQUMsQ0FBQzt3QkFHRyxtQkFBbUIsR0FBRyxjQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsQ0FBQzt3QkFFckQsS0FJRixJQUFJLENBQUMsZ0JBQWdCLENBQUMsS0FBSyxDQUFDLEVBSDlCLE1BQU0sWUFBQSxFQUNOLEdBQUcsU0FBQSxFQUNILFlBQXdELEVBQWxELFVBQVUsbUJBQUcsU0FBUyxDQUFDLDJCQUEy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