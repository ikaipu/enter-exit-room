import React, { PureComponent } from 'react';
import { TextInput } from 'react-native';

type Props = {
  showPassword: boolean,
};

class PasswordInput extends PureComponent<Props> {
  render() {
    const { showPassword } = this.props;

    return <TextInput secureTextEntry={showPassword} {...this.props} />;
  }
}

export default PasswordInput;
