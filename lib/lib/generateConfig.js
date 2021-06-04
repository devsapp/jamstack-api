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
                    var rtItem = (routerItem === '/' ? '/index' : routerItem).slice(1);
                    if (paths.includes(rtItem)) {
                        throw new Error('The same route exists.');
                    }
                    paths.push(rtItem);
                    var codeUri = path_1.default.join(functionResolvePath, rtItem);
                    var _e = this_1.getPrivateConfig(codeUri), privateFunctionConfig = _e.privateFunctionConfig, privateHttp = _e.privateHttp;
                    logger_1.default.debug("private function: " + JSON.stringify(privateFunctionConfig));
                    logger_1.default.debug("private http: " + JSON.stringify(privateHttp));
                    var functionConfig = lodash_1.defaults(privateFunctionConfig, publicFunctionConfig, {
                        name: rtItem,
                        codeUri: codeUri,
                    });
                    var triggers = (privateHttp || publicHttp).map(function (configItem) {
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
                        service: service,
                        function: functionConfig,
                        triggers: triggers,
                    });
                };
                this_1 = this;
                // 解析配置
                for (_i = 0, routes_1 = routes; _i < routes_1.length; _i++) {
                    routerItem = routes_1[_i];
                    _loop_1(routerItem);
                }
                return [2 /*return*/, res];
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2VuZXJhdGVDb25maWcuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvbGliL2dlbmVyYXRlQ29uZmlnLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLDhDQUF3QjtBQUN4Qiw0Q0FBZ0M7QUFDaEMsK0NBQTBDO0FBQzFDLDhDQUE4RjtBQUM5RiwrQ0FBZ0Q7QUFDaEQsNkRBQWlEO0FBQ2pELG9EQUEyQjtBQUMzQiw0REFBc0M7QUFDdEMsaUNBQThDO0FBUTlDLFNBQWdCLDJCQUEyQixDQUFDLElBQVM7SUFDbkQsT0FBTyxVQUFVLElBQUksSUFBSSxJQUFJLFNBQVMsSUFBSSxJQUFJLENBQUM7QUFDakQsQ0FBQztBQUZELGtFQUVDO0FBRUQ7SUFBQTtJQTZMQSxDQUFDO0lBNUxjLDZCQUFjLEdBQTNCLFVBQTRCLE1BQU0sRUFBRSxPQUFrQjs7UUFBbEIsd0JBQUEsRUFBQSxrQkFBa0I7Ozs7Z0JBQzlDLEtBQUssR0FBRyxNQUFNLENBQUMsS0FBSyxDQUFDO2dCQUMzQixzQkFBZSxDQUFDLGNBQWMsRUFBRTtvQkFDOUIsR0FBRyxFQUFFLE1BQUEsTUFBTSxDQUFDLFVBQVUsMENBQUUsU0FBUztvQkFDakMsT0FBTyxTQUFBO2lCQUNSLENBQUMsQ0FBQztnQkFHRyxtQkFBbUIsR0FBRyxjQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsQ0FBQztnQkFFckQsS0FJRixJQUFJLENBQUMsZ0JBQWdCLENBQUMsS0FBSyxDQUFDLEVBSDlCLE1BQU0sWUFBQSxFQUNOLEdBQUcsU0FBQSxFQUNILFlBQXdELEVBQWxELFVBQVUsbUJBQUcsU0FBUyxDQUFDLDJCQUEyQixLQUFBLENBQ3pCO2dCQUNqQyxnQkFBTSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQztnQkFDckIsZ0JBQU0s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