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
            var props, functionResolvePath, _b, region, app, _c, publicHttp, service, publicFunctionConfig, filterRoute, routes, res, paths, _loop_1, this_1, _i, routes_1, routerItem;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        props = inputs.props;
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
                                        logger_1.default.debug("private function: " + JSON.stringify(privateFunctionConfig));
                                        logger_1.default.debug("private http: " + JSON.stringify(privateHttp));
                                        scodeUri = path_1.default.join(process.cwd(), '.s', props.sourceCode, rtItem);
                                        spublicConfigPath = path_1.default.join(process.cwd(), '.s', props.sourceCode, 'config.yml');
                                        return [4 /*yield*/, core_1.getYamlContent(spublicConfigPath)];
                                    case 2:
                                        sapp = ((_f.sent()) || {}).app;
                                        spublicFunctionConfig = lodash_1.pick(sapp, constants.FUNCIONS_KEYS);
                                        sservice = lodash_1.pick(sapp, constants.SERVICE_KEYS);
                                        return [4 /*yield*/, core_1.getYamlContent(path_1.default.join(scodeUri, 'config.yml'))];
                                    case 3:
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
                                            function: __assign(__assign({}, functionConfig), { environmentVariables: __assign(__assign({}, functionConfig.environmentVariables), dk_deploy_common_1.getEnvs()) }),
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2VuZXJhdGVDb25maWcuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvbGliL2dlbmVyYXRlQ29uZmlnLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLDhDQUF3QjtBQUN4Qiw0Q0FBZ0M7QUFDaEMsK0NBQTBDO0FBQzFDLDhDQU0rQjtBQUMvQiwrQ0FBOEM7QUFDOUMsNkRBQWlEO0FBQ2pELG9EQUEyQjtBQUMzQiw0REFBc0M7QUFDdEMsaUNBQThDO0FBQzlDLHNFQUEyRjtBQVEzRixTQUFnQiwyQkFBMkIsQ0FBQyxJQUFTO0lBQ25ELE9BQU8sVUFBVSxJQUFJLElBQUksSUFBSSxTQUFTLElBQUksSUFBSSxDQUFDO0FBQ2pELENBQUM7QUFGRCxrRUFFQztBQUVEO0lBQUE7SUErTUEsQ0FBQztJQTlNYyw2QkFBYyxHQUEzQixVQUE0QixNQUFNLEVBQUUsT0FBa0I7O1FBQWxCLHdCQUFBLEVBQUEsa0JBQWtCOzs7Ozs7d0JBQzlDLEtBQUssR0FBRyxNQUFNLENBQUMsS0FBSyxDQUFDO3dCQUMzQixzQkFBZSxDQUFDLGNBQWMsRUFBRTs0QkFDOUIsR0FBRyxFQUFFLE1BQUEsTUFBTSxDQUFDLFVBQVUsMENBQUUsU0FBUzs0QkFDakMsT0FBTyxTQUFBO3lCQUNSLENBQUMsQ0FBQzt3QkFHRyxtQkFBbUIsR0FBRyxjQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsQ0FBQzt3QkFFckQsS0FJRixJQUFJLENBQUMsZ0JBQWdCLENBQUMsS0FBSyxDQUFDLEVBSDlCLE1BQU0sWUFBQSxFQUNOLEdBQUcsU0FBQSxFQUNILFlBQXdELEVBQWxELFVBQVUsbUJBQUcsU0FBUyxDQUFDLDJCQUEyQixLQUFBLENBQ3pCO3dCQUNqQyxnQkFBTSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FB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