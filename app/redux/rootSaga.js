import {
  fork,
  takeEvery,
  select,
  takeLatest,
  delay,
  put,
} from 'redux-saga/effects';
import { takeLeadingByPayload } from './util/effects';
import {
  DEBOUNCE_REQUEST,
  SEND_REQUEST,
  SEND_REQUEST_AWAIT,
  SEND_REQUEST_LATEST,
  sendRequestLatest,
} from './request/request.action';
import { START_DUMMY_SUBSCRIPTION } from './dummy/dummy.action';
import { watchSubscription, dummyRequest } from './dummy/dummy.saga';
import defaultRequestSaga from './request/request.saga';
import { login } from './auth/auth.saga';
import { REHYDRATE_COMPLETE } from './app/app.action';
import { SAMPLE, LOGIN } from './request/request.constants';
import NavigationService from '../modules/navigation/navigationService';

import { debounceTimeoutSeconds } from '../config/settings';

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
  yield takeLatest(DEBOUNCE_REQUEST, dispatchRequest);
  yield takeEvery(SEND_REQUEST, sendRequest);
  yield takeLatest(SEND_REQUEST_LATEST, sendRequest);
  yield takeLeadingByPayload(SEND_REQUEST_AWAIT, sendRequest);
  yield takeEvery(START_DUMMY_SUBSCRIPTION, watchSubscription);

  yield takeEvery(REHYDRATE_COMPLETE, afterRehydrate);
  yield takeEvery('Navigation/NAVIGATE', navigate);
  yield takeEvery('Navigation/REPLACE', navigate);
}
