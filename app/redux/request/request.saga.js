import { put, take, race, call, all, delay } from 'redux-saga/effects';
import Api from '../../modules/Api';
import { timeoutSeconds } from '../../config/settings';
import {
  CANCEL_REQUEST,
  requestError,
  requestComplete,
} from './request.action';

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

/* generic request saga */
export default function* sendRequest(action: Object): Generator<*, *, *> {
  try {
    const { method, route, params } = action.payload.request;

    const { response, timeout, cancelled } = yield race({
      response: call(Api[method.toLowerCase()], route, params || {}),
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

    yield put(requestComplete(action.payload.key, action.payload.id, response));

    if (action.payload.options) {
      const { options } = action.payload;

      if (options.successAction) {
        if (options.successAction.constructor === Array) {
          const effects = options.successAction.map(el => put(el));

          yield all(effects);
        } else if (typeof options.successAction === 'object') {
          yield put(options.successAction);
        }
      }

      if (
        options.responseActionName &&
        typeof options.responseActionName === 'string'
      ) {
        yield put({
          type: options.responseActionName,
          payload: {
            response,
          },
        });
      }
    }
  } catch (err) {
    yield put(requestError(action.payload.key, action.payload.id, err));
  }
}
