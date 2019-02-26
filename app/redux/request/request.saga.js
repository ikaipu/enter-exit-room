import { put, take, race, call, all, delay } from 'redux-saga/effects';
import { timeoutSeconds } from '../../config/settings';
import {
  CANCEL_REQUEST,
  requestError,
  requestComplete,
} from './request.action';

function* dummyApiRequest() {
  const shouldTimeout = Math.random() >= 0.5;
  const shouldNotFail = Math.random() >= 0.5;

  if (shouldTimeout) {
    yield delay(4000);
  } else {
    yield delay(2000);
    return { success: shouldNotFail };
  }

  return { success: true };
}

/* `take` with conditional payload  */
export function* shouldCancel(actionParam: Object): Generator<*, *, *> {
  let notFound = true;

  while (notFound) {
    const action = yield take(CANCEL_REQUEST);
    if (
      action.payload.key === actionParam.payload.key &&
      action.payload.id === actionParam.payload.id
    ) {
      notFound = false;
    }
  }

  return true;
}

/* sample request saga */
export default function* sendRequest(action: Object): Generator<*, *, *> {
  try {
    const { timeout, cancelled } = yield race({
      response: call(dummyApiRequest),
      timeout: delay(timeoutSeconds * 1000),
      cancelled: call(shouldCancel, action),
    });

    if (cancelled) {
      return;
    }

    if (timeout) {
      yield put(
        requestError(action.payload.key, action.payload.id, 'Request timeout'),
      );

      return;
    }

    yield put(requestComplete(action.payload.key, action.payload.id));

    if (action.payload.successAction) {
      if (action.payload.successAction.constructor === Array) {
        const effects = action.payload.successAction.map(el => put(el));

        yield all(effects);
      } else if (typeof action.payload.successAction === 'object') {
        yield put(action.payload.successAction);
      }
    }
  } catch (err) {
    yield put(requestError(action.payload.key, action.payload.id, err));
  }
}
