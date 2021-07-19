"use strict";
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
var client_1 = __importDefault(require("./client"));
var utils_1 = require("../../common/utils");
var core_1 = require("@serverless-devs/core");
var addEdgeScript = /** @class */ (function () {
    function addEdgeScript(accessKeyId, accessKeySecret) {
        this.client = new client_1.default(accessKeyId, accessKeySecret);
    }
    addEdgeScript.prototype.init = function (_a) {
        var domain = _a.domain, fcDomain = _a.fcDomain;
        return __awaiter(this, void 0, void 0, function () {
            var spin, i, e_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.client.setEsStagingConfig({
                            domain: domain,
                            rule: "if match_re($uri, '^/api') {\n rewrite(concat('http://" + fcDomain + "', substr($uri, 5, len($uri))), 'redirect')\n}",
                        })];
                    case 1:
                        _b.sent();
                        spin = core_1.spinner('configuring edge script...');
                        i = 0;
                        _b.label = 2;
                    case 2:
                        if (!(i < 5)) return [3 /*break*/, 9];
                        _b.label = 3;
                    case 3:
                        _b.trys.push([3, 6, , 8]);
                        return [4 /*yield*/, utils_1.sleep(5000)];
                    case 4:
                        _b.sent();
                        return [4 /*yield*/, this.client.publishEsStagingConfigToProduction(domain)];
                    case 5:
                        _b.sent();
                        return [3 /*break*/, 9];
                    case 6:
                        e_1 = _b.sent();
                        return [4 /*yield*/, utils_1.sleep(2000)];
                    case 7:
                        _b.sent();
                        return [3 /*break*/, 8];
                    case 8:
                        i++;
                        return [3 /*break*/, 2];
                    case 9:
                        spin.succeed('edge script configured successfully');
                        return [2 /*return*/];
                }
            });
        });
    };
    return addEdgeScript;
}());
exports.default = addEdgeScript;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWRkRWRnZVNjcmlwdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9saWIvY2RuL2FkZEVkZ2VTY3JpcHQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxvREFBOEI7QUFDOUIsNENBQTJDO0FBQzNDLDhDQUFnRDtBQUVoRDtJQUVFLHVCQUFZLFdBQW1CLEVBQUUsZUFBdUI7UUFDdEQsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLGdCQUFNLENBQUMsV0FBVyxFQUFFLGVBQWUsQ0FBQyxDQUFDO0lBQ3pELENBQUM7SUFDSyw0QkFBSSxHQUFWLFVBQVcsRUFBb0I7WUFBbEIsTUFBTSxZQUFBLEVBQUUsUUFBUSxjQUFBOzs7Ozs0QkFDM0IscUJBQU0sSUFBSSxDQUFDLE1BQU0sQ0FBQyxrQkFBa0IsQ0FBQzs0QkFDbkMsTUFBTSxRQUFBOzRCQUNOLElBQUksRUFBRSwyREFBeUQsUUFBUSxtREFBZ0Q7eUJBQ3hILENBQUMsRUFBQTs7d0JBSEYsU0FHRSxDQUFDO3dCQUNHLElBQUksR0FBRyxjQUFPLENBQUMsNEJBQTRCLENBQUMsQ0FBQzt3QkFDMUMsQ0FBQyxHQUFHLENBQUM7Ozs2QkFBRSxDQUFBLENBQUMsR0FBRyxDQUFDLENBQUE7Ozs7d0JBRWpCLHFCQUFNLGFBQUssQ0FBQyxJQUFJLENBQUMsRUFBQTs7d0JBQWpCLFNBQWlCLENBQUM7d0JBQ2xCLHFCQUFNLElBQUksQ0FBQyxNQUFNLENBQUMsa0NBQWtDLENBQUMsTUFBTSxDQUFDLEVBQUE7O3dCQUE1RCxTQUE0RCxDQUFDO3dCQUM3RCx3QkFBTTs7O3dCQUVOLHFCQUFNLGFBQUssQ0FBQyxJQUFJLENBQUMsRUFBQTs7d0JBQWpCLFNBQWlCLENBQUM7Ozt3QkFOQyxDQUFDLEVBQUUsQ0FBQTs7O3dCQVMxQixJQUFJLENBQUMsT0FBTyxDQUFDLHFDQUFxQyxDQUFDLENBQUM7Ozs7O0tBQ3JEO0lBQ0gsb0JBQUM7QUFBRCxDQUFDLEFBdEJELElBc0JDIn0=