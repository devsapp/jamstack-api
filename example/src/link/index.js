const { dk, tablestoreInitialzerPlugin } = require('@serverless-devs/dk');

const handler = dk((ctx) => {
  console.log(ctx);
  // 1.查询表
  return { json: { result: 'ok' } };
});

handler.use(tablestoreInitialzerPlugin());

exports.handler = handler;
