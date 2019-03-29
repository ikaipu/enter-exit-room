import { selectRequestObject } from '../request/request.selector';
import { SAMPLE } from '../request/request.constants';
import type { GlobalState, RequestObject } from '../util/types';

export const request1State = (state: GlobalState): RequestObject =>
  selectRequestObject(state, SAMPLE, 'request1');

export const request2State = (state: GlobalState): RequestObject =>
  selectRequestObject(state, SAMPLE, 'request2');

export const request3State = (state: GlobalState): RequestObject =>
  selectRequestObject(state, SAMPLE, 'request3');
