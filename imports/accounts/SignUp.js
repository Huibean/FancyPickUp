import React, { Component, PropTypes } from 'react';
import { 
  View,
  TextInput,
  Text,
  TouchableHighlight,
  StyleSheet,
  Image
} from 'react-native';

import Dimensions from 'Dimensions';

import Button from '../Button.js';

import { baseUrl } from '../../config/environment';

export default class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    }
  }

  focusNextField(nextField) {
    this.refs[nextField].focus();
  };

  testNextWork() {
    fetch(baseUrl, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        helloWorld: "hello world"
      })
    }).then(function(response) {
       return response.json()
    }).then(function(responseJson) {
      alert(responseJson.helloWorld)
    }).catch(function(err) {
      console.error(err)
    })
  }

  handleSignUp() {
    let email = this.state.email
    let password = this.state.password
    console.log("data:", email, password)
    let newUser = fetch( baseUrl +'users', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        password: password,
      })
    }).then(function(response) {
      return response.json()
    }).then((responseJson) => {
      console.log("responseJson:", responseJson)
      this.setState({error: {}})
      if(responseJson["errors"]){
        this.setState({error: {
          email: responseJson["errors"]["email"],
          password: responseJson["errors"]["password"]}
         })
      }
      return responseJson
    }).catch((error) => {
      console.error(error);
    })
  }

  render() {
    console.log(Dimensions.get('window'))
    let emailError;
    if (this.state.error && this.state.error.email ){
      emailError = <Text style={styles.errorText}>
                     {this.state.error.email}
                   </Text>
    };
    let passwordError;
    if (this.state.error && this.state.error.password ){
      passwordError = <Text style={styles.errorText}>
                        {this.state.error.password}
                      </Text>
    };
    return (
      <Image source={require("../../images/landing.jpg")}>
        <TextInput
          onChangeText={(email) => this.setState({email})}
          value={this.state.email}
          ref="email"
          placeholder="Enter Your Email"
          onSubmitEditing={() => this.focusNextField('password')}
          keyboardType="email-address"
          returnKeyType="next"
        />
        {emailError}
        <TextInput
          onChangeText={(password) => this.setState({password})}
          value={this.state.password}
          ref="password"
          placeholder="Enter Your Password"
          secureTextEntry={true}
          returnKeyType="done"
        />
        {passwordError}
        <Button text="注册" onPress={this.handleSignUp.bind(this)} />
        <Button text="Test" onPress={this.testNextWork.bind(this)} />
      </Image>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: 'center',
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    backgroundColor: 'rgba(0,0,0,0)'
  },
  errorText: {
    color: "red"
  }
});