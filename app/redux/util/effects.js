import { take, call, fork, put } from 'redux-saga/effects';
import { overrideLatest } from '../request/request.action';

/*
 ignores action while sage is not done

 use case:
 tapping a button multiple times calls saga once until completion

 takeLeading(SUBMIT_FORM, submitFormSaga);
 */
export const takeLeading = (patternOrChannel: any, saga: any, ...args: any) =>
  fork(function*() {
    while (true) {
      const action = yield take(patternOrChannel);

      yield call(saga, ...args.concat(action));
    }
  });

/*
 ignores action with same payload.id and payload.key while saga is not done.

 payload should have `key: string` and `id: string`
 */
const leadingActions = {};

export const takeLeadingByPayload = (
  patternOrChannel: any,
  saga: any,
  ...args: any
) =>
  fork(function*() {
    if (!leadingActions[patternOrChannel]) {
      leadingActions[patternOrChannel] = {};
    }

    while (true) {
      const action = yield take(patternOrChannel);
      const objKey = `${action.payload.key}_${action.payload.id}`;

      if (!leadingActions[patternOrChannel][objKey]) {
        yield fork(function*() {
          leadingActions[patternOrChannel][objKey] = {
            ...action,
          };

          yield call(saga, ...args.concat(action));

          delete leadingActions[patternOrChannel][objKey];
        });
      }
    }
  });

/*
 takeLatest with conditional payload
 */
const latestActions = {};

export const takeLatestByPayload = (
  patternOrChannel: any,
  saga: any,
  ...args: any
) =>
  fork(function*() {
    if (!latestActions[patternOrChannel]) {
      latestActions[patternOrChannel] = {};
    }

    while (true) {
      const action = yield take(patternOrChannel);
      const objKey = `${action.payload.key}_${action.payload.id}`;

      if (!latestActions[patternOrChannel][objKey]) {
        yield fork(function*() {
          latestActions[patternOrChannel][objKey] = {
            ...action,
          };

          yield call(saga, ...args.concat(action));

          delete latestActions[patternOrChannel][objKey];
        });
      } else {
        yield put(overrideLatest(action.payload.key, action.payload.id));

        yield fork(function*() {
          latestActions[patternOrChannel][objKey] = {
            ...action,
          };

          yield call(saga, ...args.concat(action));

          delete latestActions[patternOrChannel][objKey];
        });
      }
    }
  });
