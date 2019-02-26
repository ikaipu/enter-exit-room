import EStyleSheet from 'react-native-extended-stylesheet';

const screens = {
  'iPhone SE': {
    devices: 'iPhone 5, 5s, 5c, SE',
    width: 640 / 2.0,
    height: 1136 / 2.0,
  },
  'iPhone 6': {
    devices: 'iPhone 6, 6s, 7, 8',
    width: 750 / 2.0,
    height: 1334 / 2.0,
  },
  'iPhone 6 Plus': {
    devices: 'iPhone 6+, 6s+, 7+, 8+',
    width: 1080 / 2.608,
    height: 1920 / 2.608,
  },
  'iPhone X': {
    devices: 'iPhone X, Xs',
    width: 1125 / 3.0,
    height: 2436 / 3.0,
  },
  'iPhone Xr': {
    devices: 'iPhone Xr',
    width: 828 / 2.0,
    height: 1792 / 2.0,
  },
  'iPhone Xs Max': {
    devices: 'iPhone Xs Max',
    width: 1242 / 3.0,
    height: 2688 / 3.0,
  },
};

export const device = screens[Object.keys(screens)[2]];

export default EStyleSheet.create({
  background: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#669999',
    flex: 1,
  },
  container: {
    flex: 1,
    width: device.width,
    maxHeight: device.height,
  },
});
