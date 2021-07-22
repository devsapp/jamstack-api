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
                _b = this.getPublishConfig(props.sourceCode), region = _b.region, app = _b.app, _c = _b.http, publicHttp = _c === void 0 ? constants.DEFAULT_HTTP_TRIGGER_CONFIG : _c;
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
                routes = filterRoute ?
                    props.route.filter(function (item) { return filterRoute === item.slice(1) || (item === filterRoute) || (item === '/' && filterRoute === 'index'); })
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
                                    function: 'jamstack-api.system'
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
                        return [2 /*return*/, [__assign(__assign({}, customDomain), { routeConfigs: routeConfigs })]];
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
    GenerateConfig.getPublishConfig = function (sourceCode) {
        var functionResolvePath = path_1.default.resolve(sourceCode);
        var configYmlPath = utils_1.checkConfigYmlExist(functionResolvePath);
        var configs = js_yaml_1.default.load(fse.readFileSync(configYmlPath, 'utf8'));
        if (!configs.app.name) {
            throw new Error('app name is required.');
        }
        return configs;
    };
    return GenerateConfig;
}());
exports.default = GenerateConfig;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2VuZXJhdGVDb25maWcgY29weS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9saWIvZ2VuZXJhdGVDb25maWcgY29weS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSw4Q0FBd0I7QUFDeEIsNENBQWdDO0FBQ2hDLCtDQUEwQztBQUMxQyw4Q0FBOEY7QUFDOUYsK0NBQWdEO0FBQ2hELDZEQUFpRDtBQUNqRCxvREFBMkI7QUFDM0IsNERBQXNDO0FBQ3RDLGlDQUE4QztBQVE5QyxTQUFnQiwyQkFBMkIsQ0FBQyxJQUFTO0lBQ25ELE9BQU8sVUFBVSxJQUFJLElBQUksSUFBSSxTQUFTLElBQUksSUFBSSxDQUFDO0FBQ2pELENBQUM7QUFGRCxrRUFFQztBQUVEO0lBQUE7SUF1TEEsQ0FBQztJQXJMYyw2QkFBYyxHQUEzQixVQUE0QixNQUFNLEVBQUUsT0FBa0I7O1FBQWxCLHdCQUFBLEVBQUEsa0JBQWtCOzs7O2dCQUM5QyxLQUFLLEdBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQztnQkFDM0Isc0JBQWUsQ0FBQyxjQUFjLEVBQUU7b0JBQzlCLEdBQUcsRUFBRSxNQUFBLE1BQU0sQ0FBQyxVQUFVLDBDQUFFLFNBQVM7b0JBQ2pDLE9BQU8sU0FBQTtpQkFDUixDQUFDLENBQUE7Z0JBR0ksbUJBQW1CLEdBQUcsY0FBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLENBQUM7Z0JBRXJELEtBSUYsSUFBSSxDQUFDLGdCQUFnQixDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsRUFIekMsTUFBTSxZQUFBLEVBQ04sR0FBRyxTQUFBLEVBQ0gsWUFBd0QsRUFBbEQsVUFBVSxtQkFBRyxTQUFTLENBQUMsMkJBQTJCLEtBQUEsQ0FDZDtnQkFDNUMsZ0JBQU0sQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFD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