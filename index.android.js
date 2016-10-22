'use strict';

import ReactNative from 'react-native';
import React, {Component} from 'react';

import Scene from './imports/Scene';

var {
  AppRegistry,
  Navigator,
} = ReactNative;

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
