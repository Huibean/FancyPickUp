/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import Scene from './imports/Scene';

import {
  AppRegistry,
  Navigator
} from 'react-native';

class FancyPickUp extends Component {
  render() {
    return (
      <Navigator
        initialRoute={{title: "Sign Up", index: 0}}
        renderScene={(route, navigator) =>
          <Scene
            title={route.title}
            index={route.index}
          />
        }
      />
    )
  }
}

AppRegistry.registerComponent('FancyPickUp', () => FancyPickUp);
