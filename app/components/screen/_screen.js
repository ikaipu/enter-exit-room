import React, { PureComponent } from 'react';
import { View } from 'react-native';
import styles from './styles';

type Props = {
  style?: Object,
};

class Screen extends PureComponent<Props> {
  static defaultProps = {
    style: {},
  };

  render() {
    const { style } = this.props;

    return <View {...this.props} style={[styles.container, style]} />;
  }
}

export default Screen;
