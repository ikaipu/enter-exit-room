import { sendRequestAwait, cancelRequest } from '../request/request.action';
import { SAMPLE } from '../request/request.constants';

export const START_DUMMY_SUBSCRIPTION = 'START_DUMMY_SUBSCRIPTION';
export const STOP_DUMMY_SUBSCRIPTION = 'STOP_DUMMY_SUBSCRIPTION';
export const SUBSCRIPTION_ERROR = 'SUBSCRIPTION_ERROR';
export const PONG = 'PONG';

export const request1 = () =>
  sendRequestAwait(SAMPLE, 'request1', {
    method: 'GET',
    route: 'dummy',
    params: {},
  });

export const request2 = () =>
  sendRequestAwait(SAMPLE, 'request2', {
    method: 'GET',
    route: 'dummy',
    params: {},
  });

export const request3 = () =>
  sendRequestAwait(SAMPLE, 'request3', {
    method: 'GET',
    route: 'dummy',
    params: {},
  });

export const cancelRequest1 = () => cancelRequest(SAMPLE, 'request1');
export const cancelRequest2 = () => cancelRequest(SAMPLE, 'request2');
export const cancelRequest3 = () => cancelRequest(SAMPLE, 'request3');

export const startDummySubscription = () => ({
  type: START_DUMMY_SUBSCRIPTION,
});

export const stopDummySubscription = () => ({
  type: STOP_DUMMY_SUBSCRIPTION,
});

export const subscriptionError = (error: any) => ({
  type: SUBSCRIPTION_ERROR,
  payload: {
    error,
  },
});

export const pong = () => ({
  type: PONG,
});
