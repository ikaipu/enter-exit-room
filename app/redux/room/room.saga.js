import { eventChannel } from 'redux-saga';
import { race, take, put } from 'redux-saga/effects';

import { EXIT_ROOM, roomActionError, updateRoom } from './room.action';
import { subscribeRoom } from '../../infrastructures/firebase/rooms/rooms.infrastructure';

const enterRoomChannel = (roomId: string) =>
  eventChannel((emitter: Function) => {
    const emit = (room: Object) => emitter(updateRoom(room));
    return subscribeRoom(roomId, emit);
  });

export function* enterRoomSaga({ payload }: Object): Generator<*, *, *> {
  const channel = enterRoomChannel(payload.roomId);

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
