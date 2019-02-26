import { put, delay } from 'redux-saga/effects';

import { loginSuccess } from './auth.action';
import { requestComplete, requestError } from '../request/request.action';

export function* login(action: Object): Generator<*, *, *> {
  const {
    key,
    id,
    // params: { email, password },
    successAction,
  } = action.payload;

  try {
    yield delay(2000);
    yield put(loginSuccess('random_stuff'));
    yield put(requestComplete(key, id));
    yield put(successAction);
  } catch (err) {
    yield put(requestError(key, id, err));
  }
}
