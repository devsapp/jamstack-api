
const { http } = require('@serverless-devs/dk');

const handler = http.onRequest({
  handler: (request) => {
    console.log(request);
    return {
      json: { result: 'hello index' },
    };
  },
});

exports.handler = handler;
