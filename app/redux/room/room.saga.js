import { eventChannel } from 'redux-saga';
import { race, take, put } from 'redux-saga/effects';

import { EXIT_ROOM, roomActionError } from './room.action';
import { pong } from '../dummy/dummy.action';

const enterRoomChannel = () =>
  eventChannel((emitter: Function) => {
    const timer = setInterval(() => {
      emitter(pong());
    }, 3000);

    return () => {
      clearInterval(timer);
    };
  });

export function* enterRoomSaga(): Generator<*, *, *> {
  const channel = enterRoomChannel();

  while (true) {
    try {
      const { action, stopSubscription } = yield race({
        action: take(channel),
        stopSubscription: take(EXIT_ROOM),
      });

      if (stopSubscription) {
        channel.close();
        return;
      }

      yield put(action);
    } catch (err) {
      yield put(roomActionError(err));
    }
  }
}
