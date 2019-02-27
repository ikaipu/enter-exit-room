import React, { PureComponent } from 'react';
import { View } from 'react-native';
import styles from './styles';

type Props = {
  children: any,
};

class ComponentLayoutViewer extends PureComponent<Props> {
  render = () => (
    <View style={styles.background}>
      <View style={styles.container}>{this.props.children}</View>
    </View>
  );
}

export default ComponentLayoutViewer;
