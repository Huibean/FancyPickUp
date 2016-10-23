/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';

import {
  AppRegistry,
  Navigator
} from 'react-native';

import Account from './imports/Account';

class FancyPickUp extends Component {
  render() {
    return (
      <Navigator
        initialRoute={{title: "Sign Up", index: 0}}
        renderScene={(route, navigator) => {
          //_navigator = navigator;
          switch (route.index) {
            case 0:
              return <Account navigator={navigator} action={route.action}/>
            default:
              return <Text>No Scene Match, Current index: { route.index }</Text>
          }
        }
        }
      />
    )
  }
}

AppRegistry.registerComponent('FancyPickUp', () => FancyPickUp);
