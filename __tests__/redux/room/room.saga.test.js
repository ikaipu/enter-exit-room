import { put } from 'redux-saga/effects';
import { enterRoomSaga } from '../../../app/redux/room/room.saga';
import {
  enterRoom,
  roomActionError,
} from '../../../app/redux/room/room.action';

describe('request saga tests', () => {
  it('enterRoom', () => {
    const gen = enterRoomSaga();

    gen.next();

    expect(
      gen.next({
        action: enterRoom('roomId1'),
        stopSubscription: undefined,
      }).value,
    ).toEqual(put(enterRoom('roomId1')));

    gen.next();

    gen.next({
      action: undefined,
      stopSubscription: roomActionError(),
    });

    expect(gen.next().value).toBeUndefined();
  });
});
