'use strict';

import React, {Component} from 'react';

import {
  AppRegistry,
  Navigator,
  StyleSheet,
  AsyncStorage
} from 'react-native';

import Account from './imports/Account';
import App from './imports/App';
import EditProfile from './imports/EditProfile';
import MatchPage from './imports/MatchPage';
import NewRoute from './imports/NewRoute';

class FancyPickUp extends Component {

  constructor(props) {
    super(props)
    this.state = {
      loading: false,
      user: null
    }
  };

  render() {
    let initialRoute = {index: 1};

    return (
      <Navigator
        initialRoute={initialRoute}
        renderScene={(route, navigator) => {
            switch (route.index) {
              case 0:
                return <Account navigator={navigator} action={route.action}/>
              case 1:
                return <App navigator={navigator} user={route.user}/>
              case 2:
                return <EditProfile navigator={navigator} user={route.user}/>
              case 3:
                return <MatchPage navigator={navigator} user={route.user}/>
              case 4:
                return <NewRoute navigator={navigator} user={route.user}/>
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
