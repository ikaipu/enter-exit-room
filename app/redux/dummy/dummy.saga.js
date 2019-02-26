import { eventChannel } from 'redux-saga';
import { race, take, put } from 'redux-saga/effects';

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
