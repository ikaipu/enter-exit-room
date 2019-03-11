# Views

[<github](github.md) - [home](index.md) - [styling>](styling.md)

## Components and Containers

Our convention is **Components** only use local _state_ and _props_ while **Containers** have access to the global store via redux connect.

## Components

**Components** should only use _state_, if possible, to update the ui. For example, moving the thumb location on a slider between values.

## Containers

The most common usage of **Containers** is a screen or page in your app.

When making a screen please be sure to wrap it with the **Screen** component found in [app/components/screen/](../app/components/screen/screen.js)

```
import React, { PureComponent } from 'react';
import { View, Text, Platform } from 'react-native';

import { Screen } from '../../components/screen';
import styles from './styles';

class Home extends PureComponent<*> {
  render() {
    return (
      <Screen>
        <View style={styles.container}>
          <Text style={styles.hello}>Hello World</Text>
        </View>
      </Screen>
    );
  }
}

export default Home;
```

## Naming & Directory Structure

- directories should be lower camel case (e.g., /tabBarIcon)
- components should be upper camel case (e.g., /tabBarIcon/TabBarIcon.js)
- export default should be at the bottom of the file. `export default TabBarIcon`
- Don't name your component file index.js
- Files should have the same name as the class. TabBarIcon should be in TabBarIcon.js
- The folder should have index.js. It is used to export your component.
- The component class should be the default export.
- Styles should be in styles.js. [more details](styling.md)

`components/input/index.js`

```
import EmailInput from './EmailInput';
import PasswordInput from './PasswordInput';

export { EmailInput, PasswordInput };
```

`components/input/EmailInput.js`

```
class EmailInput extends PureComponent<*> {
  ...
}

export default EmailInput;
```

usage:

```
import { EmailInput, PasswordInput } from '../../components/input';
```

---
