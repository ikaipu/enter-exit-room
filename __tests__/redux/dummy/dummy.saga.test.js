import { put } from 'redux-saga/effects';
import { watchSubscription } from '../../../app/redux/dummy/dummy.saga';
import {
  pong,
  stopDummySubscription,
} from '../../../app/redux/dummy/dummy.action';

describe('request saga tests', () => {
  it('watchSubscription', () => {
    const gen = watchSubscription();

    gen.next();

    expect(
      gen.next({
        action: pong(),
        stopSubscription: undefined,
      }).value,
    ).toEqual(put(pong()));

    gen.next();

    gen.next({
      action: undefined,
      stopSubscription: stopDummySubscription(),
    });

    expect(gen.next().value).toBeUndefined();
  });
});
