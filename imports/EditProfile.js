import React, { Component, PropTypes } from 'react';
import { 
  View,
  TextInput,
  Text,
  Image,
  Button,
  StyleSheet,
  TouchableHighlight,
} from 'react-native';

const userParams = ['name']

export default class EditProfile extends Component {
  constructor(props) {
    super(props)
    this.state = {
      user: this.props.user
    }
  }

  userAttributes() {
    console.log("this.state: ", this.state)
    let userAttributes = {}
    for (key in this.state) {
      if (userParams.indexOf(key) > -1) {
        userAttributes[key] = this.state[key]
      }
    } 
    return userAttributes
  }

  goBack() {
    this.props.navigator.jumpBack()
  }

  handleSave() {
    alert("save")
  }

  saveBtnStatus() {
    return Object.keys(this.userAttributes()).length == 0
  }

  render() {
    let user = this.state.user
    console.log("user: ", user)
    console.log("user attributes: ", this.userAttributes())
    return(
      <View>
        <View style={styles.header}>
          <TouchableHighlight
            style={styles.arrow}
            onPress={this.goBack.bind(this)}>
            <Image source={require("../images/ic_arrow_back_white_18dp.png")}/>
          </TouchableHighlight>
          <Text style={styles.title}>Personal Info</Text>
          <Button style={styles.saveBtn} title="Save" disabled={this.saveBtnStatus()} color="lime" onPress={this.handleSave}/>
        </View>
        <View style={styles.item}>
          <Text>
            Username:
          </Text>
          <TextInput
            style={styles.textInput}
            onChangeText={(name) => this.setState({name: name})}
            value={this.state.name != undefined ? this.state.name : this.state.user.name}
          />   
        </View>
      </View>
    )
  }
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: "gray",
    height: 40,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  arrow: {
  },
  title: {
    fontSize: 20,
    color: "white"
  },
  saveBtn: {
    alignSelf: 'stretch',
    padding: 10
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  textInput: {
    alignSelf: 'stretch',
    width: 250
  }
});
