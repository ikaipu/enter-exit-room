# Styling

[<views](views.md) - [home](index.md) - [navigation>](navigation.md)

Please read [React Native Extended StyleSheet](https://github.com/vitalets/react-native-extended-stylesheet) docs.

## App Theme

Global styles like the default font size, colors, etc. should be configured in [theme.js](../app/config/theme.js)

`theme.js`

```
import { primaryGray, darkGray } from './colors';

export default {
  $rem: 16,

  $textHeaderColor: darkGray,
  $textDefaultColor: primaryGray,
  $textDefaultFontSize: '1rem',
  $textHeaderFontSize: '1.25rem',
};

```

usage in `style.js`:

```
import EStyleSheet from 'react-native-extended-stylesheet';

export default EStyleSheet.create({
  headerText: {
    fontSize: '$textHeaderFontSize',
    textAlign: 'center',
    color: '$textDefaultColor',
  },
});
```

## viewing in multiple device sizes

use ipad or android tab then follow below:  
[root.js](../app/root.js)

```
// uncomment this
<ComponentLayoutViewer>
  <Provider store={this.store}>
    ...
  </Provider>
</ComponentLayoutViewer>
```

[componentLayoutViewer/styles.js](../app/containers/componentLayoutViewer/styles.js)

```
// change array index
export const device = screens[Object.keys(screens)[2]];
```

## measurement guidelines

- TODO

## images

- TODO
