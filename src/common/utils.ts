import chillout from 'chillout';
import logger from './logger';
import { spinner } from '@serverless-devs/core';

export function sleep(msec) {
  return new Promise((resolve) => setTimeout(resolve, msec));
}

export const waitUntil = async (
  asyncService: () => Promise<any>,
  stopCondition: (result: any) => boolean,
  {
    timeout = 10 * 60 * 1000, // 10分超时时间
    timeInterval = 1000,
    timeoutMsg,
    hint,
  }: {
    timeInterval?: number;
    timeout?: number;
    timeoutMsg?: string;
    hint?: {
      loading: string;
      success: string;
      fail: string;
    };
  },
) => {
  const spin = hint && spinner(hint.loading);
  const startTime = new Date().getTime();
  let result: any;
  await chillout.waitUntil(async () => {
    if (new Date().getTime() - startTime > timeout) {
      logger.debug(timeoutMsg);
      spin?.fail(hint.fail);
      return chillout.StopIteration;
    }
    await sleep(timeInterval);
    result = await asyncService();
    if (stopCondition(result)) {
      spin?.succeed(hint.success);
      return chillout.StopIteration;
    }
  });
  return result;
};
