import React, { PureComponent } from 'react';
import { AsyncStorage } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { applyMiddleware, createStore } from 'redux';
import { createLogger } from 'redux-logger';
import { Provider } from 'react-redux';
import { persistCombineReducers, persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/es/integration/react';
import createSagaMiddleware from 'redux-saga';
import EStyleSheet from 'react-native-extended-stylesheet';

import theme from './config/theme';
import Listeners from './modules/listeners/listeners';
import RootStackNavigator from './navigators/rootStackNavigator';
import NavigationService from './modules/navigation/navigationService';
import combinedReducers from './redux/combinedReducers';
import rootSaga from './redux/rootSaga';
import { rehydrateComplete } from './redux/app/app.action';

// import { ComponentLayoutViewer } from './containers/componentLayoutViewer';

const AppContainer = createAppContainer(RootStackNavigator);

type Props = {};

const rootConfigKey = 'root';

EStyleSheet.build(theme);

class App extends PureComponent<Props> {
  constructor(props: Props) {
    super(props);

    const logger = createLogger({
      // predicate, // if specified this function will be called before each action is processed with this middleware.
      collapsed: (getState, action, logEntry) => !logEntry.error,
      duration: false, // print the duration of each action?
      timestamp: true, // print the timestamp with each action?

      // level = 'log': 'log' | 'console' | 'warn' | 'error' | 'info', // console's level
      // colors: ColorsObject/, // colors for title, prev state, action and next state: https://github.com/evgenyrodionov/redux-logger/blob/master/src/defaults.js#L12-L18
      // titleFormatter, // Format the title used when logging actions.

      // stateTransformer, // Transform state before print. Eg. convert Immutable object to plain JSON.
      // actionTransformer, // Transform action before print. Eg. convert Immutable object to plain JSON.
      // errorTransformer, // Transform error before print. Eg. convert Immutable object to plain JSON.

      // logger = console: LoggerObject, // implementation of the `console` API.
      logErrors: true, // should the logger catch, log, and re-throw errors?

      diff: true, // (alpha) show diff between states?
      // diffPredicate // (alpha) filter function for showing states diff, similar to `predicate`
    });

    const persistConfig = {
      key: rootConfigKey,
      storage: AsyncStorage,
      whitelist: [],
      debug: true,
    };

    const reducer = persistCombineReducers(persistConfig, combinedReducers);

    const sagaMiddleware = createSagaMiddleware();

    let middleware = null;

    // eslint-disable-next-line no-undef
    if (__DEV__) {
      middleware = applyMiddleware(...[sagaMiddleware, logger]);
    } else {
      middleware = applyMiddleware(...[sagaMiddleware]);
    }

    this.store = createStore(reducer, middleware);

    this.persistor = persistStore(this.store, {}, () => {
      this.store.dispatch(rehydrateComplete());
    });

    sagaMiddleware.run(rootSaga);
  }

  store: Object;

  persistor: Object;

  render() {
    return (
      // <ComponentLayoutViewer>
      <Provider store={this.store}>
        <PersistGate persistor={this.persistor}>
          <Listeners>
            <AppContainer
              ref={(navigatorRef: ?Object) => {
                NavigationService.setTopLevelNavigator(navigatorRef);
              }}
            />
          </Listeners>
        </PersistGate>
      </Provider>
      // </ComponentLayoutViewer>
    );
  }
}

export default App;
