import React, { PureComponent } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';

import { Screen } from '../../components/screen';
import styles from './styles';

import type {
  ActionDispatcher,
  RequestObject,
  GlobalState,
} from '../../redux/util/types';
import { loginRequestState } from '../../redux/auth/auth.selector';
import {
  request1State,
  request2State,
  request3State,
} from '../../redux/dummy/dummy.selector';
import {
  startDummySubscription,
  stopDummySubscription,
  request1,
  request2,
  request3,
  cancelRequest1,
  cancelRequest2,
  cancelRequest3,
} from '../../redux/dummy/dummy.action';
import { enterRoom, exitRoom } from '../../redux/room/room.action';

type StateProps = {
  count: number,
  listening: boolean,
  isInRoom: boolean,
  request1State: RequestObject,
  request2State: RequestObject,
  request3State: RequestObject,
};

type DispatchProps = {
  enterRoom: () => ActionDispatcher,
  exitRoom: () => ActionDispatcher,

  request1: () => ActionDispatcher,
  request2: () => ActionDispatcher,
  request3: () => ActionDispatcher,

  cancelRequest1: () => ActionDispatcher,
  cancelRequest2: () => ActionDispatcher,
  cancelRequest3: () => ActionDispatcher,

  startDummySubscription: () => ActionDispatcher,
  stopDummySubscription: () => ActionDispatcher,
};

type Props = StateProps & DispatchProps;

class Home extends PureComponent<Props> {
  subscribeToService = () => {
    this.props.startDummySubscription();
  };

  unsubscribeFromService = () => {
    this.props.stopDummySubscription();
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

  serviceButton = listening => {
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
          {this.props.isInRoom ? (
            <TouchableOpacity onPress={this.props.exitRoom}>
              <Text>Exit Room</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={this.props.enterRoom}>
              <Text>Enter Room</Text>
            </TouchableOpacity>
          )}
          {this.row(
            'Request 1',
            this.props.request1,
            this.props.cancelRequest1,
            this.props.request1State.sending,
            this.props.request1State.message,
            this.props.request1State.error,
          )}
          {this.row(
            'Request 2',
            this.props.request2,
            this.props.cancelRequest2,
            this.props.request2State.sending,
            this.props.request2State.message,
            this.props.request2State.error,
          )}
          {this.row(
            'Request 3',
            this.props.request3,
            this.props.cancelRequest3,
            this.props.request3State.sending,
            this.props.request3State.message,
            this.props.request3State.error,
          )}
          {this.row(
            'enterRoom',
            this.props.enterRoom,
            this.props.exitRoom,
            this.props.request1State.sending,
            this.props.request1State.message,
            this.props.request1State.error,
          )}
        </View>
      </Screen>
    );
  }
}

const mapStateToProps: GlobalState => StateProps = state => ({
  count: state.dummyStore.count,
  listening: state.dummyStore.listening,
  isInRoom: state.roomStore.roomId !== null,
  loginRequestState: loginRequestState(state),
  request1State: request1State(state),
  request2State: request2State(state),
  request3State: request3State(state),
});

const mapDispatchToProps: ActionDispatcher => DispatchProps = dispatch => ({
  enterRoom: () => dispatch(enterRoom('room1')),
  exitRoom: () => dispatch(exitRoom()),
  request1: () => dispatch(request1()),
  request2: () => dispatch(request2()),
  request3: () => dispatch(request3()),
  cancelRequest1: () => dispatch(cancelRequest1()),
  cancelRequest2: () => dispatch(cancelRequest2()),
  cancelRequest3: () => dispatch(cancelRequest3()),
  startDummySubscription: () => dispatch(startDummySubscription()),
  stopDummySubscription: () => dispatch(stopDummySubscription()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Home);
