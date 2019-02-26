import React, { PureComponent } from 'react';
import { Icon } from 'expo';

import {
  tabIconSelectedColor,
  tabIconDefaultColor,
  tabIconSize,
} from '../../config/theme';
import styles from './styles';

type Props = {
  name: string,
  focused: boolean,
};

class TabBarIcon extends PureComponent<Props> {
  render() {
    return (
      <Icon.Ionicons
        name={this.props.name}
        size={tabIconSize}
        style={styles.icon}
        color={this.props.focused ? tabIconSelectedColor : tabIconDefaultColor}
      />
    );
  }
}

export default TabBarIcon;
