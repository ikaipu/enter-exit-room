# Data Persistence

[<redux](redux.md) - [home](index.md) - [selectors>](selectors.md)

Please read [Redux Persist](https://github.com/rt2zz/redux-persist) github page.

[combinedReducers.js](../app/redux/combinedReducers.js)

```
import { AsyncStorage } from 'react-native';
import { persistReducer } from 'redux-persist';

import appReducer from './app/app.reducer';
import authStore from './auth/auth.reducer';

const authPersistConfig = {
  key: 'authStore',
  storage: AsyncStorage,
  whitelist: ['isAuthenticated', 'accessToken'],
};

export default {
  appStore: appReducer,
  authStore: persistReducer(authPersistConfig, authStore),
};

```

`whitelist: ['isAuthenticated'],` will make it so that `state.authStore.isAuthenticated` will persist even if the app is killed.
