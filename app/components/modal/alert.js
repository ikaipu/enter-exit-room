import React, { PureComponent } from 'react';
import {
  View,
  Text,
  Modal,
  ActivityIndicator,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from 'react-native';
import styles from './styles';

export type Props = {
  visible?: boolean,
  labelText?: string,
  onRequestClose?: Function,
  hasIndicator?: boolean,
  onPress?: Function,
  buttons?: Object[],
  showActivityIndicator?: boolean,
};

class BaseModal extends PureComponent<Props> {
  static defaultProps = {
    visible: true,
    labelText: 'loading...',
    onRequestClose: () => {},
    hasIndicator: true,
    onPress: () => {},
    buttons: [],
    showActivityIndicator: false,
  };

  renderButton = (title: string, onPress: Function, key: string) => (
    <TouchableOpacity onPress={onPress} key={key}>
      <Text>{title}</Text>
    </TouchableOpacity>
  );

  renderButtons = (buttons: Object[]) => (
    <View style={styles.buttonsContainer}>
      {buttons.map((obj, index) =>
        this.renderButton(obj.title, obj.onPress, `key_${index}`),
      )}
    </View>
  );

  render() {
    const {
      visible,
      labelText,
      onRequestClose,
      hasIndicator,
      onPress,
      buttons,
      showActivityIndicator,
    } = this.props;

    return (
      <Modal visible={visible} onRequestClose={onRequestClose} transparent>
        <TouchableWithoutFeedback onPress={onPress}>
          <View style={styles.container}>
            <View style={[styles.wrapper, styles.loader]}>
              {showActivityIndicator && (
                <ActivityIndicator animating={hasIndicator} color="#2466e6" />
              )}
              <Text style={styles.text}>{labelText}</Text>
              {buttons && this.renderButtons(buttons)}
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    );
  }
}

export default BaseModal;
