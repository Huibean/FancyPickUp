import React, { Component, PropTypes } from 'react';
import { 
  View,
  TextInput,
  Text,
  StyleSheet,
  Navigator,
  Image,
  ScrollView,
  TouchableHighlight
} from 'react-native';

import { baseUrl } from '../config/environment';

import Tracking from './Tracking';
import Profile from './Profile';

import Footer from './Footer';
import Header from './Header';

import { routes } from '../feeds';

export default class App extends Component {
  
  constructor(props) {
    super(props)
    this.state = {
      loading: true,
      user: this.props.user,
      action: "Profile",//"Tracking", //"Profile",
      initialPosition: 'unknown',
      lastPosition: 'unknown',
    }
  };

  componentWillMount() {
    let user = this.state.user;
    if(!user) {
      console.log("loading login")
      this.checkLogin();
    } else {
      this.setState({loading: false})
      console.log("already has user")
    };
  };

  checkLogin() {
    fetch(baseUrl + "checkLogin")
      .then((response) => {
        return response.json()
      })
      .then((responseJson) => {
        console.log("responseJson:", responseJson)
        if(!responseJson.user) {
          console.log("user not exist")
          return this.props.navigator.push({index: 0, action: "Login"})
        } else {
          this.setState({user: responseJson.user})
          console.log("already login")
        }
        this.setState({loading: false})
        return responseJson
      }).catch((e) => {
        console.error(e)
      })
  };

  goToAction(action) {
    console.log("redirect to action:", action)
    this.setState({action: action})
  };

  render() {
    let user = this.state.user;
    let content;
    if(this.state.loading) {
      context = <Text>Loading....</Text>
    } else {
      switch (this.state.action) {
        case "Tracking":
          content = <Tracking route={routes[0]}/>
          break;
        case "Profile":
          content = <Profile navigator={this.props.navigator} routes={routes} user={user} />
          break;
        default:
          content = <Text>No Scene Match</Text>
          break;
      }
    }

    return (
      <View style={styles.layout}>
        <Header />
        <ScrollView>
          {content}
        </ScrollView>
        <Footer  goToAction={this.goToAction.bind(this)}/>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  layout: {
    flex: 1,
    alignItems: 'stretch',
    backgroundColor: "ghostwhite",
  }
})
