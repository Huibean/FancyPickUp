import React, { Component, PropTypes } from 'react';
import { 
  View,
  TextInput,
  Text,
  StyleSheet,
  Image,
  TouchableHighlight,
  Alert
} from 'react-native';

export default class Header extends Component {
  constructor(props) {
    super(props)
    this.state = {
      menuOpen: false
    }
  }

  toggleMenu() {
    this.setState({menuOpen: !this.state.menuOpen})
    console.log("toogle menu")
  }

  handleLogout() {
    // alert("logout")
    Alert.alert(
      'Alert Title',
      'My Alert Msg',
      [
        {text: 'Ask me later', onPress: () => console.log('Ask me later pressed')},
        {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
        {text: 'OK', onPress: () => console.log('OK Pressed')},
      ]
    )
  }

  _renderMenu() {
    let menu;
    if (this.state.menuOpen) {
      menu = <TouchableHighlight onPress={this.handleLogout.bind(this)}>
               <Text>Logout</Text>
             </TouchableHighlight>
    } else {
      menu = <View></View>
    }
    return(
      <View style={styles.menu}>{menu}</View>
    )
  }

  render() {
    return(
      <View>
        <View style={styles.header}>
          <Text style={styles.brand}>I'm Coming!</Text>
        </View>
      </View>
    )
  }
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#1e90ff",
    height: 40,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  brand: {
    fontSize: 20,
    alignSelf: 'center',
    marginLeft: 5
  },
  setting: {
    alignSelf: 'center'
  },
  menu: {
    backgroundColor: 'grey',
    zIndex: 10000,
    alignSelf: 'flex-end',
    width: 200,
  }
});
