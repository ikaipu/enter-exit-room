import React, { PureComponent } from 'react';
import { View, Text, Platform, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import moment from 'moment';

import { Screen } from '../../components/screen';
import { StopWatch, CountDown } from '../../components/timer';
import { logOut } from '../../redux/auth/auth.action';
import type { GlobalState, ActionDispatcher } from '../../redux/util/types';
import NavigationService from '../../modules/navigation/navigationService';
import styles from './styles';

const instructions = Platform.select({
  ios: `Press Cmd+R to reload,${'\n'}Cmd+D or shake for dev menu`,
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

type StateProps = {
  authenticated: boolean,
};

type DispatchProps = {
  logOut: () => ActionDispatcher,
};

type Props = StateProps & DispatchProps;

class Main extends PureComponent<Props> {
  componentDidUpdate(prevProps) {
    if (this.props.authenticated !== prevProps.authenticated) {
      NavigationService.replace('Home');
    }
  }

  logOut = () => {
    this.props.logOut();
  };

  render() {
    return (
      <Screen>
        <View style={styles.container}>
          <Text style={styles.welcome}>Welcome to React Native!</Text>
          <Text style={styles.instructions}>To get started, edit App.js</Text>
          <Text style={styles.instructions}>{instructions}</Text>
          <TouchableOpacity onPress={this.logOut}>
            <Text>Log Out</Text>
          </TouchableOpacity>
          <CountDown deadline={new Date()} />
          <CountDown deadline={moment().hour(20)} />
          <StopWatch />
        </View>
      </Screen>
    );
  }
}

const mapStateToProps: GlobalState => StateProps = state => ({
  authenticated: state.authStore.authenticated,
});

const mapDispatchToProps: ActionDispatcher => DispatchProps = dispatch => ({
  logOut: () => dispatch(logOut()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Main);
