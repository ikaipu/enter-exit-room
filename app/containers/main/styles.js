import EStyleSheet from 'react-native-extended-stylesheet';

export default EStyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  welcome: {
    fontSize: '$textHeaderFontSize',
    textAlign: 'center',
    margin: 10,
    color: '$textDefaultColor',
  },
  instructions: {
    fontSize: '$textDefaultFontSize',
    textAlign: 'center',
    color: '$textDefaultColor',
    marginBottom: 5,
  },
});
