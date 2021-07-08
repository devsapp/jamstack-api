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
exports.waitUntil = exports.sleep = void 0;
var chillout_1 = __importDefault(require("chillout"));
var logger_1 = __importDefault(require("./logger"));
var core_1 = require("@serverless-devs/core");
function sleep(msec) {
    return new Promise(function (resolve) { return setTimeout(resolve, msec); });
}
exports.sleep = sleep;
var waitUntil = function (asyncService, stopCondition, _a) {
    var _b = _a.timeout, timeout = _b === void 0 ? 10 * 60 * 1000 : _b, // 10分超时时间
    _c = _a.timeInterval, // 10分超时时间
    timeInterval = _c === void 0 ? 1000 : _c, timeoutMsg = _a.timeoutMsg, hint = _a.hint;
    return __awaiter(void 0, void 0, void 0, function () {
        var spin, startTime, result;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    spin = hint && core_1.spinner(hint.loading);
                    startTime = new Date().getTime();
                    return [4 /*yield*/, chillout_1.default.waitUntil(function () { return __awaiter(void 0, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        if (new Date().getTime() - startTime > timeout) {
                                            logger_1.default.debug(timeoutMsg);
                                            spin === null || spin === void 0 ? void 0 : spin.fail(hint.fail);
                                            return [2 /*return*/, chillout_1.default.StopIteration];
                                        }
                                        return [4 /*yield*/, sleep(timeInterval)];
                                    case 1:
                                        _a.sent();
                                        return [4 /*yield*/, asyncService()];
                                    case 2:
                                        result = _a.sent();
                                        if (stopCondition(result)) {
                                            spin === null || spin === void 0 ? void 0 : spin.succeed(hint.success);
                                            return [2 /*return*/, chillout_1.default.StopIteration];
                                        }
                                        return [2 /*return*/];
                                }
                            });
                        }); })];
                case 1:
                    _d.sent();
                    return [2 /*return*/, result];
            }
        });
    });
};
exports.waitUntil = waitUntil;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvY29tbW9uL3V0aWxzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHNEQUFnQztBQUNoQyxvREFBOEI7QUFDOUIsOENBQWdEO0FBRWhELFNBQWdCLEtBQUssQ0FBQyxJQUFJO0lBQ3hCLE9BQU8sSUFBSSxPQUFPLENBQUMsVUFBQyxPQUFPLElBQUssT0FBQSxVQUFVLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxFQUF6QixDQUF5QixDQUFDLENBQUM7QUFDN0QsQ0FBQztBQUZELHNCQUVDO0FBRU0sSUFBTSxTQUFTLEdBQUcsVUFDdkIsWUFBZ0MsRUFDaEMsYUFBdUMsRUFDdkMsRUFjQztRQWJDLGVBQXdCLEVBQXhCLE9BQU8sbUJBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxJQUFJLEtBQUEsRUFBRSxVQUFVO0lBQ3BDLG9CQUFtQixFQURPLFVBQVU7SUFDcEMsWUFBWSxtQkFBRyxJQUFJLEtBQUEsRUFDbkIsVUFBVSxnQkFBQSxFQUNWLElBQUksVUFBQTs7Ozs7O29CQVlBLElBQUksR0FBRyxJQUFJLElBQUksY0FBTyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztvQkFDckMsU0FBUyxHQUFHLElBQUksSUFBSSxFQUFFLENBQUMsT0FBTyxFQUFFLENBQUM7b0JBRXZDLHFCQUFNLGtCQUFRLENBQUMsU0FBUyxDQUFDOzs7O3dDQUN2QixJQUFJLElBQUksSUFBSSxFQUFFLENBQUMsT0FBTyxFQUFFLEdBQUcsU0FBUyxHQUFHLE9BQU8sRUFBRTs0Q0FDOUMsZ0JBQU0sQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLENBQUM7NENBQ3pCLElBQUksYUFBSixJQUFJLHVCQUFKLElBQUksQ0FBRSxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDOzRDQUN0QixzQkFBTyxrQkFBUSxDQUFDLGFBQWEsRUFBQzt5Q0FDL0I7d0NBQ0QscUJBQU0sS0FBSyxDQUFDLFlBQVksQ0FBQyxFQUFBOzt3Q0FBekIsU0FBeUIsQ0FBQzt3Q0FDakIscUJBQU0sWUFBWSxFQUFFLEVBQUE7O3dDQUE3QixNQUFNLEdBQUcsU0FBb0IsQ0FBQzt3Q0FDOUIsSUFBSSxhQUFhLENBQUMsTUFBTSxDQUFDLEVBQUU7NENBQ3pCLElBQUksYUFBSixJQUFJLHVCQUFKLElBQUksQ0FBRSxPQUFPLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDOzRDQUM1QixzQkFBTyxrQkFBUSxDQUFDLGFBQWEsRUFBQzt5Q0FDL0I7Ozs7NkJBQ0YsQ0FBQyxFQUFBOztvQkFaRixTQVlFLENBQUM7b0JBQ0gsc0JBQU8sTUFBTSxFQUFDOzs7O0NBQ2YsQ0FBQztBQXBDVyxRQUFBLFNBQVMsYUFvQ3BCIn0=