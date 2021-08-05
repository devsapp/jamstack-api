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
exports.instanceOfISchedulerTriggerConfig = exports.instanceOfIOssTriggerConfig = exports.instanceOfHttpTriggerConfig = void 0;
var path_1 = __importDefault(require("path"));
var child_process_1 = require("child_process");
var core_1 = require("@serverless-devs/core");
var lodash_1 = __importStar(require("lodash"));
var constants = __importStar(require("../common/constants"));
var logger_1 = __importDefault(require("../common/logger"));
var dk_deploy_common_1 = require("@serverless-devs/dk-deploy-common");
var addEdgeScript_1 = __importDefault(require("./cdn/addEdgeScript"));
var fs_extra_1 = __importDefault(require("fs-extra"));
function instanceOfHttpTriggerConfig(data) {
    return 'authType' in data && 'methods' in data;
}
exports.instanceOfHttpTriggerConfig = instanceOfHttpTriggerConfig;
function instanceOfIOssTriggerConfig(data) {
    return 'bucketName' in data && 'events' in data && 'filter' in data;
}
exports.instanceOfIOssTriggerConfig = instanceOfIOssTriggerConfig;
function instanceOfISchedulerTriggerConfig(data) {
    return 'cronExpression' in data && 'enable' in data && 'payload' in data;
}
exports.instanceOfISchedulerTriggerConfig = instanceOfISchedulerTriggerConfig;
var GenerateConfig = /** @class */ (function () {
    function GenerateConfig() {
    }
    GenerateConfig.generateConfig = function (inputs, command) {
        var _a;
        if (command === void 0) { command = 'deploy'; }
        return __awaiter(this, void 0, void 0, function () {
            var projectName, props, functionResolvePath, region, originApp, publicHttp, app, service, publicFunctionConfig, filterRoute, routes, res, _i, routes_1, routerItem, rtItem, codeUri, configPath, spath, scodeUri, scontent, sapp, sservice, privateConfig, _b, privateFunctionConfig, privateHttp, functionConfig, triggers;
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
                        region = props.region, originApp = props.app, publicHttp = props.http;
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
                        _i = 0, routes_1 = routes;
                        _c.label = 1;
                    case 1:
                        if (!(_i < routes_1.length)) return [3 /*break*/, 8];
                        routerItem = routes_1[_i];
                        rtItem = (routerItem === '/' ? '/index' : routerItem).slice(1);
                        codeUri = path_1.default.join(functionResolvePath, rtItem);
                        return [4 /*yield*/, this.execIndexjs(codeUri)];
                    case 2:
                        _c.sent();
                        return [4 /*yield*/, dk_deploy_common_1.generateFile({ codeUri: codeUri, sourceCode: props.sourceCode, app: app })];
                    case 3:
                        _c.sent();
                        configPath = path_1.default.join(codeUri, 'config.yml');
                        fs_extra_1.default.existsSync(configPath) && fs_extra_1.default.unlinkSync(configPath);
                        spath = path_1.default.join(process.cwd(), '.s');
                        scodeUri = path_1.default.join(spath, props.sourceCode, rtItem);
                        return [4 /*yield*/, core_1.getYamlContent(path_1.default.join(spath, 's.yml'))];
                    case 4:
                        scontent = _c.sent();
                        sapp = lodash_1.get(scontent, ['services', projectName, 'props', 'app']);
                        sservice = lodash_1.pick(sapp, constants.SSERVICE_KEYS);
                        return [4 /*yield*/, core_1.getYamlContent(path_1.default.join(scodeUri, 'config.yml'))];
                    case 5:
                        privateConfig = _c.sent();
                        _b = privateConfig || {}, privateFunctionConfig = _b.function, privateHttp = _b.http;
                        logger_1.default.debug("private function: " + JSON.stringify(privateFunctionConfig));
                        logger_1.default.debug("private http: " + JSON.stringify(privateHttp));
                        functionConfig = lodash_1.assign({}, constants.DEFAULT_FUNCTION_CONFIG, { name: rtItem, codeUri: scodeUri }, publicFunctionConfig, privateFunctionConfig);
                        return [4 /*yield*/, this.getTriggers({
                                scodeUri: scodeUri,
                                codeUri: codeUri,
                                http: privateHttp || publicHttp,
                                routerItem: routerItem,
                            })];
                    case 6:
                        triggers = _c.sent();
                        res.push({
                            region: region,
                            service: __assign(__assign({}, service), sservice),
                            function: __assign(__assign({}, functionConfig), { environmentVariables: __assign(__assign({}, functionConfig.environmentVariables), dk_deploy_common_1.getEnvs()) }),
                            triggers: triggers,
                            routerItem: routerItem,
                        });
                        _c.label = 7;
                    case 7:
                        _i++;
                        return [3 /*break*/, 1];
                    case 8: return [2 /*return*/, res];
                }
            });
        });
    };
    GenerateConfig.getCustomDomain = function (inputs, region, serviceName) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b, customDomain, bucket, project, credentials, domain, _c, jamstackDomain, addEdgeScript;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        _a = inputs.props, _b = _a.customDomain, customDomain = _b === void 0 ? constants.DEFAULT_CUSTOM_DOMAIN_CONFIG : _b, bucket = _a.bucket, project = _a.project;
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
                        return [2 /*return*/, {
                                customDomain: customDomain,
                                domainName: customDomain.domainName,
                            }];
                }
            });
        });
    };
    GenerateConfig.execIndexjs = function (codeUri) {
        return __awaiter(this, void 0, void 0, function () {
            var indexJsPath, vm, _a, status_1, stderr;
            return __generator(this, function (_b) {
                indexJsPath = path_1.default.join(codeUri, 'index.js');
                vm = core_1.spinner("Execution instructions: node " + indexJsPath);
                try {
                    _a = child_process_1.spawnSync("node " + indexJsPath, { cwd: codeUri, shell: true }), status_1 = _a.status, stderr = _a.stderr;
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
                return [2 /*return*/];
            });
        });
    };
    GenerateConfig.getTriggers = function (_a) {
        var scodeUri = _a.scodeUri, codeUri = _a.codeUri, http = _a.http, routerItem = _a.routerItem;
        return __awaiter(this, void 0, void 0, function () {
            function throwError() {
                throw new Error(routerItem + " configuration does not meet expectations,code uri is " + codeUri + ".");
            }
            var configContent, oss, scheduler, qualifier, config;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, core_1.getYamlContent(path_1.default.join(scodeUri, 'config.yml'))];
                    case 1:
                        configContent = (_b.sent()) || {};
                        // oss 触发器
                        if ('oss' in configContent) {
                            oss = configContent.oss;
                            if (!instanceOfIOssTriggerConfig(oss))
                                throwError();
                            return [2 /*return*/, {
                                    name: 'ossTrigger',
                                    type: 'oss',
                                    config: oss,
                                }];
                        }
                        // scheduler 触发器
                        if ('scheduler' in configContent) {
                            scheduler = configContent.scheduler;
                            if (!instanceOfISchedulerTriggerConfig(scheduler))
                                throwError();
                            return [2 /*return*/, {
                                    name: 'timerTrigger',
                                    type: 'timer',
                                    config: scheduler,
                                }];
                        }
                        qualifier = lodash_1.get(http, 'qualifier', 'LATEST');
                        config = http
                            ? lodash_1.pick(http, ['authType', 'methods'])
                            : constants.DEFAULT_HTTP_TRIGGER_CONFIG;
                        if (!instanceOfHttpTriggerConfig(config))
                            throwError();
                        return [2 /*return*/, {
                                name: (http === null || http === void 0 ? void 0 : http.name) || qualifier,
                                type: 'http',
                                qualifier: qualifier,
                                config: config,
                            }];
                }
            });
        });
    };
    return GenerateConfig;
}());
exports.default = GenerateConfig;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2VuZXJhdGVDb25maWcuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvbGliL2dlbmVyYXRlQ29uZmlnLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLDhDQUF3QjtBQUN4QiwrQ0FBMEM7QUFDMUMsOENBTytCO0FBQy9CLCtDQUE4QztBQUM5Qyw2REFBaUQ7QUFDakQsNERBQXNDO0FBQ3RDLHNFQUEwRTtBQUMxRSxzRUFBZ0Q7QUFDaEQsc0RBQTBCO0FBZ0IxQixTQUFnQiwyQkFBMkIsQ0FBQyxJQUFTO0lBQ25ELE9BQU8sVUFBVSxJQUFJLElBQUksSUFBSSxTQUFTLElBQUksSUFBSSxDQUFDO0FBQ2pELENBQUM7QUFGRCxrRUFFQztBQUVELFNBQWdCLDJCQUEyQixDQUFDLElBQVM7SUFDbkQsT0FBTyxZQUFZLElBQUksSUFBSSxJQUFJLFFBQVEsSUFBSSxJQUFJLElBQUksUUFBUSxJQUFJLElBQUksQ0FBQztBQUN0RSxDQUFDO0FBRkQsa0VBRUM7QUFFRCxTQUFnQixpQ0FBaUMsQ0FBQyxJQUFTO0lBQ3pELE9BQU8sZ0JBQWdCLElBQUksSUFBSSxJQUFJLFFBQVEsSUFBSSxJQUFJLElBQUksU0FBUyxJQUFJLElBQUksQ0FBQztBQUMzRSxDQUFDO0FBRkQsOEVBRUM7QUFFRDtJQUFBO0lBc01BLENBQUM7SUFyTWMsNkJBQWMsR0FBM0IsVUFBNEIsTUFBTSxFQUFFLE9BQWtCOztRQUFsQix3QkFBQSxFQUFBLGtCQUFrQjs7Ozs7O3dCQUM5QyxXQUFXLEdBQUcsWUFBRyxDQUFDLE1BQU0sRUFBRSxxQkFBcUIsQ0FBQyxDQUFDO3dCQUMvQyxLQUFLLEdBQUssTUFBTSxNQUFYLENBQVk7d0JBQ3pCLHNCQUFlLENBQUMsY0FBYyxFQUFFOzRCQUM5QixHQUFHLEVBQUUsTUFBQSxNQUFNLENBQUMsVUFB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