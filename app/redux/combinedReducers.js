import { AsyncStorage } from 'react-native';
import { persistReducer } from 'redux-persist';

import appReducer from './app/app.reducer';
import authReducer from './auth/auth.reducer';
import requestReducer from './request/request.reducer';
import dummyReducer from './dummy/dummy.reducer';

const authPersistConfig = {
  key: 'authStore',
  storage: AsyncStorage,
  whitelist: ['authenticated'],
};

export default {
  appStore: appReducer,
  authStore: persistReducer(authPersistConfig, authReducer),
  requestStore: requestReducer,
  dummyStore: dummyReducer,
};
