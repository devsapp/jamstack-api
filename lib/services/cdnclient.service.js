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
// This file is auto-generated, don't edit it
var cdn20180510_1 = __importStar(require("@alicloud/cdn20180510")), $Cdn20180510 = cdn20180510_1;
// 依赖的模块可通过下载工程中的模块依赖文件或右上角的获取 SDK 依赖信息查看
var $OpenApi = __importStar(require("@alicloud/openapi-client"));
var tea_console_1 = __importDefault(require("@alicloud/tea-console"));
var tea_util_1 = __importDefault(require("@alicloud/tea-util"));
var $tea = __importStar(require("@alicloud/tea-typescript"));
var Client = /** @class */ (function () {
    function Client() {
    }
    /**
     * 使用AK&SK初始化账号Client
     * @param accessKeyId
     * @param accessKeySecret
     * @return Client
     * @throws Exception
     */
    Client.createClient = function (accessKeyId, accessKeySecret) {
        var config = new $OpenApi.Config({
            // 您的AccessKey ID
            accessKeyId: accessKeyId,
            // 您的AccessKey Secret
            accessKeySecret: accessKeySecret,
        });
        // 访问的域名
        config.endpoint = "cdn.aliyuncs.com";
        return new cdn20180510_1.default(config);
    };
    Client.main = function (args) {
        return __awaiter(this, void 0, Promise, function () {
            var client, describeCdnDomainStagingConfigRequest, resp;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        client = Client.createClient("ACCESS_KEY_ID", "ACCESS_KEY_SECRET");
                        describeCdnDomainStagingConfigRequest = new $Cdn20180510.DescribeCdnDomainStagingConfigRequest({
                            domainName: "sd",
                            functionNames: "sd",
                        });
                        return [4 /*yield*/, client.describeCdnDomainStagingConfig(describeCdnDomainStagingConfigRequest)];
                    case 1:
                        resp = _a.sent();
                        tea_console_1.default.log(tea_util_1.default.toJSONString($tea.toMap(resp)));
                        return [2 /*return*/];
                }
            });
        });
    };
    return Client;
}());
exports.default = Client;
Client.main(process.argv.slice(2));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2RuY2xpZW50LnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvc2VydmljZXMvY2RuY2xpZW50LnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsNkNBQTZDO0FBQzdDLGlHQUFtRTtBQUNuRSx5Q0FBeUM7QUFDekMsaUVBQThEO0FBQzlELHNFQUE0QztBQUM1QyxnRUFBc0M7QUFDdEMsNkRBQWlEO0FBR2pEO0lBQUE7SUErQkEsQ0FBQztJQTdCQzs7Ozs7O09BTUc7SUFDSSxtQkFBWSxHQUFuQixVQUFvQixXQUFtQixFQUFFLGVBQXVCO1FBQzlELElBQUksTUFBTSxHQUFHLElBQUksUUFBUSxDQUFDLE1BQU0sQ0FBQztZQUMvQixpQkFBaUI7WUFDakIsV0FBVyxFQUFFLFdBQVc7WUFDeEIscUJBQXFCO1lBQ3JCLGVBQWUsRUFBRSxlQUFlO1NBQ2pDLENBQUMsQ0FBQztRQUNILFFBQVE7UUFDUixNQUFNLENBQUMsUUFBUSxHQUFHLGtCQUFrQixDQUFDO1FBQ3JDLE9BQU8sSUFBSSxxQkFBVyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ2pDLENBQUM7SUFFWSxXQUFJLEdBQWpCLFVBQWtCLElBQWM7dUNBQUcsT0FBTzs7Ozs7d0JBQ3BDLE1BQU0sR0FBRyxNQUFNLENBQUMsWUFBWSxDQUFDLGVBQWUsRUFBRSxtQkFBbUIsQ0FBQyxDQUFDO3dCQUNuRSxxQ0FBcUMsR0FBRyxJQUFJLFlBQVksQ0FBQyxxQ0FBcUMsQ0FBQzs0QkFDakcsVUFBVSxFQUFFLElBQUk7NEJBQ2hCLGFBQWEsRUFBRSxJQUFJO3lCQUNwQixDQUFDLENBQUM7d0JBQ1EscUJBQU0sTUFBTSxDQUFDLDhCQUE4QixDQUFDLHFDQUFxQyxDQUFDLEVBQUE7O3dCQUF6RixJQUFJLEdBQUcsU0FBa0Y7d0JBQzdGLHFCQUFPLENBQUMsR0FBRyxDQUFDLGtCQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDOzs7OztLQUNsRDtJQUVILGFBQUM7QUFBRCxDQUFDLEFBL0JELElBK0JDOztBQUVELE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyJ9