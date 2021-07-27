export const DEFAULT_FUNCTION_CONFIG = {
  runtime: 'nodejs12',
  memorySize: 512,
  handler: 'index.handler',
  timeout: 60,
};
export const DEFAULT_HTTP_TRIGGER_CONFIG = {
  authType: 'anonymous',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'HEAD'],
};
export const DEFAULT_CUSTOM_DOMAIN_CONFIG = {
  domainName: 'auto',
  protocol: 'HTTP',
};

export const DEFAULT_SERVICE = {
  name: 'jamstack-api-service',
};

export const SERVICE_KEYS = ['name', 'logConfig', 'vpcConfig', 'nasConfig', 'role'];
export const SSERVICE_KEYS = ['role'];
export const FUNCIONS_KEYS = [
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
