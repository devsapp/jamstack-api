"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FUNCIONS_KEYS = exports.SERVICE_KEYS = exports.DEFAULT_CUSTOM_DOMAIN_CONFIG = exports.DEFAULT_HTTP_TRIGGER_CONFIG = exports.DEFAULT_FUNCTION_CONFIG = void 0;
exports.DEFAULT_FUNCTION_CONFIG = {
    runtime: 'nodejs12',
    memory: 256,
    handler: 'index.handler',
    timeout: 60,
};
exports.DEFAULT_HTTP_TRIGGER_CONFIG = [
    {
        authType: 'anonymous',
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'HEAD']
    }
];
exports.DEFAULT_CUSTOM_DOMAIN_CONFIG = {
    domainName: 'auto',
    protocol: 'HTTP'
};
exports.SERVICE_KEYS = ['name', 'logConfig', 'vpcConfig', 'nasConfig', 'role'];
exports.FUNCIONS_KEYS = [
    'runtime',
    'handler',
    'description',
    'memorySize',
    'timeout',
    'initializationTimeout',
    'initializer',
    'instanceConcurrency',
    'instanceType',
    'layers',
    'environmentVariables',
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uc3RhbnRzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2NvbW1vbi9jb25zdGFudHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQWEsUUFBQSx1QkFBdUIsR0FBRztJQUNyQyxPQUFPLEVBQUUsVUFBVTtJQUNuQixNQUFNLEVBQUUsR0FBRztJQUNYLE9BQU8sRUFBRSxlQUFlO0lBQ3hCLE9BQU8sRUFBRSxFQUFFO0NBQ1osQ0FBQztBQUNXLFFBQUEsMkJBQTJCLEdBQUc7SUFDekM7UUFDRSxRQUFRLEVBQUUsV0FBVztRQUNyQixPQUFPLEVBQUUsQ0FBQyxLQUFLLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxRQUFRLEVBQUUsTUFBTSxDQUFDO0tBQ2xEO0NBQ0YsQ0FBQztBQUNXLFFBQUEsNEJBQTRCLEdBQUc7SUFDMUMsVUFBVSxFQUFFLE1BQU07SUFDbEIsUUFBUSxFQUFFLE1BQU07Q0FDakIsQ0FBQTtBQUdZLFFBQUEsWUFBWSxHQUFHLENBQUMsTUFBTSxFQUFFLFdBQVcsRUFBRSxXQUFXLEVBQUUsV0FBVyxFQUFFLE1BQU0sQ0FBQyxDQUFDO0FBQ3ZFLFFBQUEsYUFBYSxHQUFHO0lBQzNCLFNBQVM7SUFDVCxTQUFTO0lBQ1QsYUFBYTtJQUNiLFlBQVk7SUFDWixTQUFTO0lBQ1QsdUJBQXVCO0lBQ3ZCLGFBQWE7SUFDYixxQkFBcUI7SUFDckIsY0FBYztJQUNkLFFBQVE7SUFDUixzQkFBc0I7Q0FDdkIsQ0FBQyJ9