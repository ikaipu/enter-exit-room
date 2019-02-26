import React, { PureComponent } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import { StackActions } from 'react-navigation';

import { Screen } from '../../components/screen';
import { Alert } from '../../components/modal';
import styles from './styles';
import {
  sendRequest,
  cancelRequest,
  dismissResult,
} from '../../redux/request/request.action';
import {
  startDummySubscription,
  stopDummySubscription,
} from '../../redux/dummy/dummy.action';
import { SAMPLE, LOGIN } from '../../redux/request/request.constants';
import { selectRequestObject } from '../../redux/request/request.selector';

type Props = {
  sendRequest: Function,
  cancelRequest: Function,
  dismissResult: Function,

  startDummySubscription: Function,
  stopDummySubscription: Function,

  count: number,
  listening: boolean,

  login: Object,
  request1: Object,
  request2: Object,
  request3: Object,
};

class Home extends PureComponent<Props> {
  subscribeToService = () => {
    this.props.startDummySubscription();
  };

  unsubscribeFromService = () => {
    this.props.stopDummySubscription();
  };

  login = () => {
    this.props.sendRequest(
      LOGIN,
      'login',
      {},
      StackActions.replace({
        routeName: 'Main',
      }),
    );
  };

  dismissLoginError = () => {
    this.props.dismissResult(LOGIN, 'login');
  };

  cancel = () => {
    this.props.cancelRequest(LOGIN, 'login', {});
  };

  request1 = () => {
    this.props.sendRequest(SAMPLE, 'request1', {});
  };

  request2 = () => {
    this.props.sendRequest(SAMPLE, 'request2', {});
  };

  request3 = () => {
    this.props.sendRequest(SAMPLE, 'request3', {});
  };

  cancel1 = () => {
    this.props.cancelRequest(SAMPLE, 'request1', {});
  };

  cancel2 = () => {
    this.props.cancelRequest(SAMPLE, 'request2', {});
  };

  cancel3 = () => {
    this.props.cancelRequest(SAMPLE, 'request3', {});
  };

  row = (
    text: string,
    onPress: Function,
    onCancel: Function,
    shouldShowLoader: boolean,
    message: string,
    error: boolean,
  ) => (
    <View style={styles.row}>
      {shouldShowLoader && <ActivityIndicator />}
      <Text
        style={{
          color: error ? 'red' : 'black',
        }}
      >
        {message}
      </Text>
      <TouchableOpacity onPress={onPress}>
        <Text>{text}</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={onCancel}>
        <Text>Cancel</Text>
      </TouchableOpacity>
    </View>
  );

  serviceButton = (listening: boolean) => {
    let text = 'Start Service';
    let onPress = this.subscribeToService;

    if (listening) {
      text = 'Stop Service';
      onPress = this.unsubscribeFromService;
    }

    return (
      <TouchableOpacity onPress={onPress}>
        <Text>{text}</Text>
      </TouchableOpacity>
    );
  };

  render() {
    return (
      <Screen>
        <View style={styles.container}>
          {this.serviceButton(this.props.listening)}
          <Text style={styles.dots}>
            {[...Array(this.props.count)].map(() => `.`)}
          </Text>
          <TouchableOpacity onPress={this.login}>
            <Text>Login</Text>
          </TouchableOpacity>
          {this.row(
            'Request 1',
            this.request1,
            this.cancel1,
            this.props.request1.sending,
            this.props.request1.message,
            this.props.request1.error,
          )}
          {this.row(
            'Request 2',
            this.request2,
            this.cancel2,
            this.props.request2.sending,
            this.props.request2.message,
            this.props.request2.error,
          )}
          {this.row(
            'Request 3',
            this.request3,
            this.cancel3,
            this.props.request3.sending,
            this.props.request3.message,
            this.props.request3.error,
          )}
        </View>
        <Alert
          showActivityIndicator={this.props.login.sending}
          visible={this.props.login.sending || this.props.login.error}
          labelText={this.props.login.message}
          buttons={[
            {
              title: this.props.login.sending ? 'Cancel' : 'Ok',
              onPress: this.props.login.sending
                ? this.cancel
                : this.dismissLoginError,
            },
          ]}
        />
      </Screen>
    );
  }
}

const mapStateToProps = state => ({
  count: state.dummyStore.count,
  listening: state.dummyStore.listening,
  login: selectRequestObject(state, LOGIN, 'login'),
  request1: selectRequestObject(state, SAMPLE, 'request1'),
  request2: selectRequestObject(state, SAMPLE, 'request2'),
  request3: selectRequestObject(state, SAMPLE, 'request3'),
});

const mapDispatchToProps = dispatch => ({
  sendRequest: (
    key: string,
    id: string,
    params: Object,
    successAction?: Object,
  ) => dispatch(sendRequest(key, id, params, successAction)),
  cancelRequest: (key: string, id: string) => dispatch(cancelRequest(key, id)),
  dismissResult: (key: string, id: string) => dispatch(dismissResult(key, id)),
  startDummySubscription: () => dispatch(startDummySubscription()),
  stopDummySubscription: () => dispatch(stopDummySubscription()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Home);
