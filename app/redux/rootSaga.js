import { fork, takeEvery, select, delay, put } from 'redux-saga/effects';
import { takeLeadingByPayload, takeLatestByPayload } from './util/effects';
import {
  DEBOUNCE_REQUEST,
  SEND_REQUEST,
  SEND_REQUEST_AWAIT,
  SEND_REQUEST_LATEST,
  sendRequestLatest,
} from './request/request.action';
import defaultRequestSaga from './request/request.saga';
import { REHYDRATE_COMPLETE } from './app/app.action';
import { SAMPLE, LOGIN } from './request/request.constants';
import NavigationService from '../modules/navigation/navigationService';

import { debounceTimeoutSeconds } from '../config/settings';
import { ENTER_ROOM } from './room/room.action';
import { enterRoomSaga } from './room/room.saga';
import { dummyRequest } from './dummy/dummy.saga';
import { login } from './auth/auth.saga';

/*
 * called after redux persist has rehydrated its saved data to the redux store
 */
function* afterRehydrate() {
  const state = yield select();

  if (state.authStore.authenticated === true) {
    NavigationService.replace('Main');
  } else {
    NavigationService.replace('Home');
  }
}

function* sendRequest(action: Object) {
  switch (action.payload.key) {
    case SAMPLE:
      yield fork(dummyRequest, action);
      break;
    case LOGIN:
      yield fork(login, action);
      break;
    default:
      yield fork(defaultRequestSaga, action);
  }
}

const navigate = (action: Object) => {
  NavigationService.dispatchNavigationAction(action);
};

function* dispatchRequest(action: Object) {
  yield delay(debounceTimeoutSeconds * 1000);
  const { key, id, request, options } = action.payload;
  yield put(sendRequestLatest(key, id, request, options));
}

export default function* rootSaga(): Generator<void, void, void> {
  yield takeLatestByPayload(DEBOUNCE_REQUEST, dispatchRequest);
  yield takeEvery(SEND_REQUEST, sendRequest);
  yield takeLatestByPayload(SEND_REQUEST_LATEST, sendRequest);
  yield takeLeadingByPayload(SEND_REQUEST_AWAIT, sendRequest);
  yield takeEvery(ENTER_ROOM, enterRoomSaga);

  yield takeEvery(REHYDRATE_COMPLETE, afterRehydrate);
  yield takeEvery('Navigation/NAVIGATE', navigate);
  yield takeEvery('Navigation/REPLACE', navigate);
}
