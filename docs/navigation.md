# Navigation

[<styling](styling.md) - [home](index.md) - [redux>](redux.md)

Please read [React Navigation](https://reactnavigation.org/en/) docs.

## configure root navigation

[rootStackNavigator.js](../app/navigators/rootStackNavigator.js)

```
import { Home } from '../containers/home';
import SampleTabNavigator from './SampleTabNavigator';

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

```

## adding a view to the navigation stack

```
import NavigationService from '../../modules/navigation/NavigationService';

class Sample extends PureComponent<*> {
  gotoNextScreen = () => {
    NavigationService.navigate('NextScreen');
  }

  render() {
    return (
      <Screen>
        <View style={styles.container}>
          <TouchableOpacity onPress={this.gotoNextScreen}>
            <Text>Next</Text>
          </TouchableOpacity>
        </View>
      </Screen>
    );
  }
}
```

## replacing a view in the navigation stack

```
NavigationService.replace('NextScreen');
```

## navigating after [saga](saga.md) is successful

```
import { NavigationActions } from 'react-navigation';
import { LOGIN } from '../../redux/request/request.constants';

type Props = {
  sendRequest: Function,
};

class Sample extends PureComponent<Props> {
  login = () => {
    this.props.sendRequest(LOGIN, 'login', {}, [
      NavigationActions.navigate({
        routeName: 'MainScreen',
        params: {
          sample_message: 'Hello World',
        },
      }),
    ]);
  };

  render() {
    return (
      <Screen>
        <View style={styles.container}>
          <TouchableOpacity onPress={this.login}>
            <Text>Login</Text>
          </TouchableOpacity>
        </View>
      </Screen>
    );
  }
}
```

## navigating after [redux](redux.md) has updated the store

```
import NavigationService from '../../modules/navigation/navigationService';
import { LOGIN } from '../../redux/request/request.constants';

type Props = {
  authenticated: boolean,
  sendRequest: Function,
};

class Sample extends PureComponent<Props> {
  componentDidUpdate(prevProps) {
    if (this.props.authenticated !== prevProps.authenticated && this.props.authenticated === true) {
      NavigationService.replace('MainScreen');
    }
  }

  login = () => {
    this.props.sendRequest(LOGIN, 'login', {});
  };

  render() {
    return (
      <Screen>
        <View style={styles.container}>
          <TouchableOpacity onPress={this.login}>
            <Text>Login</Text>
          </TouchableOpacity>
        </View>
      </Screen>
    );
  }
}
```

## tab navigation

[sampleTabNavigator.js](../app/navigators/sampleTabNavigator.js)
