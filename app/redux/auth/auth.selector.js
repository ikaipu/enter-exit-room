import { selectRequestObject } from '../request/request.selector';
import { LOGIN } from '../request/request.constants';
import type { GlobalState, RequestObject } from '../util/types';

export const loginRequestState = (state: GlobalState): RequestObject =>
  selectRequestObject(state, LOGIN, '');
