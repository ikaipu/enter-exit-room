import React from 'react';
import { View, Text, Platform } from 'react-native';
import { createBottomTabNavigator } from 'react-navigation';
import { Main } from '../containers/main';
import { TabBarIcon } from '../components/tabBarIcon';
import { tabActiveTintColor, tabLabelFontSize } from '../config/theme';

const styles = {
  container: {
    flex: 1,
    backgroundColor: 'red',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontWeight: 'bold',
  },
  tabIcon: {
    width: 30,
    height: 30,
  },
};

const Left = () => (
  <View style={styles.container}>
    <Text style={styles.text}>Left</Text>
  </View>
);

const Right = () => (
  <View style={styles.container}>
    <Text style={styles.text}>Right</Text>
  </View>
);

/*
 SAMPLE CODE STARTS HERE
*/

const noHeaderStyle = {
  backgroundColor: 'black',
  height: 0,
  borderBottomWidth: 0,
};

const tabNavigatorScreens = {
  Left: {
    screen: Left,
    navigationOptions: {
      title: 'Left',
      tabBarIcon: (props: { focused: boolean }) => (
        <TabBarIcon
          focused={props.focused}
          name={Platform.OS === 'ios' ? 'ios-link' : 'md-link'}
        />
      ),
      // tabBarVisible: false,
    },
  },
  Middle: {
    screen: Main,
    headerStyle: noHeaderStyle,
    navigationOptions: {
      title: 'Main',
      tabBarIcon: (props: { focused: boolean }) => (
        <TabBarIcon
          focused={props.focused}
          name={
            Platform.OS === 'ios'
              ? `ios-information-circle${props.focused ? '' : '-outline'}`
              : 'md-information-circle'
          }
        />
      ),
      // tabBarVisible: false,
    },
  },
  Right: {
    screen: Right,
    navigationOptions: {
      title: 'Right',
      tabBarIcon: (props: { focused: boolean }) => (
        <TabBarIcon
          focused={props.focused}
          name={Platform.OS === 'ios' ? 'ios-options' : 'md-options'}
        />
      ),
      // tabBarVisible: false,
    },
  },
};

const SampleTabNavigator = createBottomTabNavigator(tabNavigatorScreens, {
  initialRouteName: 'Middle',
  swipeEnabled: false,
  tabBarOptions: {
    initialLayout: {
      height: 50,
    },
    activeTintColor: tabActiveTintColor,
    activeBackgroundColor: 'white',
    inactiveTintColor: 'black',
    upperCaseLabel: false,
    labelStyle: {
      fontSize: tabLabelFontSize,
    },
    style: {
      backgroundColor: 'white',
    },
    indicatorStyle: {
      backgroundColor: 'blue',
    },
    showIcon: true,
    showLabel: true,
  },
});

export default SampleTabNavigator;
