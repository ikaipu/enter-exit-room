import type { Element } from 'react';
import React from 'react';
import { AppState, BackHandler, NetInfo } from 'react-native';

import NavigationService from '../navigation/navigationService';

type Props = {
  children: Element<Object>,
};

type State = {
  appState: string,
};

class Listeners extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      appState: AppState.currentState,
    };

    NetInfo.addEventListener('connectionChange', this.handleConnectionChange);

    AppState.addEventListener('change', this.handleAppStateChange);

    BackHandler.addEventListener('hardwareBackPress', () =>
      NavigationService.back(),
    );

    // eslint-disable-next-line
    window.onunhandledrejection = (promise, reason) => {
      // eslint-disable-next-line no-console
      console.error('Unhandled rejection is', promise, reason);
    };
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress');

    NetInfo.removeEventListener(
      'connectionChange',
      this.handleConnectionChange,
    );

    AppState.removeEventListener('change', this.handleAppStateChange);
  }

  handleAppStateChange = (nextAppState: string) => {
    const { appState } = this.state;

    if (appState.match(/inactive|background/) && nextAppState === 'active') {
      // it is called when the app become active
    } else if (
      appState === 'active' &&
      nextAppState.match(/inactive|background/)
    ) {
      // it is called when the app become inactive or background
    }
    console.log(nextAppState);
    this.setState({ appState: nextAppState });
  };

  handleConnectionChange = (connectInfo: string) => {
    if (connectInfo === 'none') {
      // it is called when the app connection become offline
      // eslint-disable-next-line no-console
      console.log('offline');
    } else {
      // it is called if the app connection become offline
      // eslint-disable-next-line no-console
      console.log('online');
    }
  };

  render() {
    const { children } = this.props;

    return children;
  }
}

export default Listeners;
