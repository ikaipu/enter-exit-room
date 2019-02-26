import React, { PureComponent } from 'react';
import { View } from 'react-native';
import { createStackNavigator } from 'react-navigation';

import { Home } from '../containers/home';
import SampleTabNavigator from './sampleTabNavigator';

class InitialScreen extends PureComponent<*> {
  render() {
    return <View />;
  }
}

const RootStackNavigator = createStackNavigator({
  Root: {
    screen: InitialScreen,
  },
  Home: {
    screen: Home,
  },
  Main: {
    screen: SampleTabNavigator,
  },
});

export default RootStackNavigator;
