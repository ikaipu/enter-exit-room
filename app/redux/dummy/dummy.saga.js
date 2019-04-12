import { eventChannel } from 'redux-saga';
import { race, take, put, delay, call } from 'redux-saga/effects';

import { timeoutSeconds } from '../../config/settings';
import {
  CANCEL_REQUEST,
  OVERRIDE_LATEST,
  requestError,
  requestComplete,
} from '../request/request.action';

import {
  pong,
  subscriptionError,
  STOP_DUMMY_SUBSCRIPTION,
} from './dummy.action';

const startDummySubscriptionChannel = () =>
  eventChannel((emitter: Function) => {
    const timer = setInterval(() => {
      emitter(pong());
    }, 3000);

    return () => {
      clearInterval(timer);
    };
  });

export function* watchSubscription(): Generator<*, *, *> {
  const channel = startDummySubscriptionChannel();

  while (true) {
    try {
      const { action, stopSubscription } = yield race({
        action: take(channel),
        stopSubscription: take(STOP_DUMMY_SUBSCRIPTION),
      });

      if (stopSubscription) {
        channel.close();
        return;
      }

      yield put(action);
    } catch (err) {
      yield put(subscriptionError(err));
    }
  }
}

function* dummyApiRequest() {
  yield delay(2000);
  // const shouldTimeout = Math.random() >= 0.5;
  // const shouldNotFail = Math.random() >= 0.5;

  // if (shouldTimeout) {
  //   yield delay(4000);
  // } else {
  //   yield delay(2000);
  //   return { success: shouldNotFail };
  // }

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

export function* shouldOverride(actionParam: Object): Generator<*, *, *> {
  let notFound = true;

  while (notFound) {
    const action = yield take(OVERRIDE_LATEST);
    if (
      action.payload.key === actionParam.payload.key &&
      action.payload.id === actionParam.payload.id
    ) {
      notFound = false;
    }
  }

  return true;
}

export function* dummyRequest(action: Object): Generator<*, *, *> {
  try {
    const { response, timeout, cancelled, overridden } = yield race({
      response: call(dummyApiRequest),
      timeout: delay(timeoutSeconds * 1000),
      cancelled: call(shouldCancel, action),
      overridden: call(shouldOverride, action),
    });

    if (cancelled || overridden) {
      return;
    }

    if (timeout) {
      yield put(
        requestError(action.payload.key, action.payload.id, 'Request timeout'),
      );

      return;
    }

    yield put(requestComplete(action.payload.key, action.payload.id, response));
  } catch (err) {
    yield put(requestError(action.payload.key, action.payload.id, err));
  }
}
