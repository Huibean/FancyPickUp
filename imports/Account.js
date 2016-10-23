import React, { Component, PropTypes } from 'react';
import { 
  View,
  TextInput,
  Text,
  TouchableHighlight,
  StyleSheet,
  Image,
  KeyboardAvoidingView,
  DeviceEventEmitter,
  Keyboard
} from 'react-native';

import Button from './Button.js';

import { baseUrl } from '../config/environment';
import { validateEmail } from '../lib/validation';
import Dimensions from 'Dimensions';

const dimensions = Dimensions.get("window");
const customColor = "#00fa9a"

export default class Account extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      logoShouldHide: false,
      action: this.props.action
    }
  };
  
  focusNextField(nextField) {
    this.refs[nextField].focus();
  };

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
  };

  handleLogin() {
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

  componentWillMount() {
    Keyboard.addListener('keyboardWillShow', (e) => this.keyboardWillShow(e))
    Keyboard.addListener('keyboardWillHide', (e) => this.keyboardWillHide(e))
  };

  keyboardWillShow(e) {
    this.setState({logoShouldHide: true});
  };

  keyboardWillHide (e) {
    this.setState({logoShouldHide: false});
  };

  goToLogin() {
    this.setState({action: "Login"});
  };

  goToSignUp() {
    this.setState({action: "SignUp"});
  };

  validateEmail() {
    if(!validateEmail(this.state.email)) {
      this.setState({error: {email: "电子邮箱格式不对"}})
    } else {
      this.setState({error: {email: ""}})
    }
  };

  render() {
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
    }                    

    let logo;
    if(!this.state.logoShouldHide) {
      logo = <View style={{alignItems: 'center'}}>
               <Image sytle={styles.logo} source={require("../images/mario.gif")} />
             </View>;
    };

    let action;
    if(this.state.action == "Login") {
      action = <View>
                 <View style={styles.btn}>
                   <Button text={"登录"} color={customColor} onPress={this.handleLogin.bind(this)} />
                 </View>

                 <TouchableHighlight onPress={this.goToSignUp.bind(this)} >
                   <Text style={styles.loginBtn}>
                     新用户? | 忘记密码?
                   </Text>
                 </TouchableHighlight>
               </View>
    } else {
       action = <View>
                  <View style={styles.btn}>
                    <Button text={"注册"} color={customColor} onPress={this.handleSignUp.bind(this)} />
                  </View>

                  <TouchableHighlight onPress={this.goToLogin.bind(this)} >
                    <Text style={styles.loginBtn}>
                      已有账号?
                    </Text>
                  </TouchableHighlight>
                </View>  
    }
    
    return (
      <Image style={styles.container} source={require("../images/landing.jpg")}>
        <KeyboardAvoidingView
          style={styles.form}>
          
          {logo}

          <View style={styles.input}>
            <Image style={styles.icon} source={require("../images/ic_mail_outline_white_24dp.png")} />
            <TextInput
              style={styles.textInput}
              onChangeText={(email) => this.setState({email})}
              underlineColorAndroid={customColor}
              value={this.state.email}
              ref="email"
              placeholder="输入电子邮箱"
              onSubmitEditing={() => this.focusNextField('password')}
              keyboardType="email-address"
              returnKeyType="next"
              blurOnSubmit={true}
              onBlur={this.validateEmail.bind(this)}
            />
          </View>
          {emailError}

          <View style={styles.input}>
            <Image style={styles.icon} source={require("../images/ic_lock_outline_white_24dp.png")} />
            <TextInput
              style={styles.textInput}
              underlineColorAndroid={customColor}
              onChangeText={(password) => this.setState({password})}
              value={this.state.password}
              ref="password"
              placeholder="输入密码"
              secureTextEntry={true}
              returnKeyType="done"
            />   
          </View>
          {passwordError}

          {action}
        </KeyboardAvoidingView>
      </Image>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    width: dimensions.width,
    height: dimensions.height,
    backgroundColor: 'rgba(0,0,0,0)',
  },
  logo: {
    width: 50,
    height: 50,
    backgroundColor: 'rgba(0,0,0,0)',
  },
  errorText: {
    color: "red",
    marginLeft: 40,
    fontSize: 15
  },
  form: {
     marginTop: dimensions.height * 0.03,
     marginLeft: dimensions.height * 0.05,
     marginRight: dimensions.height * 0.05,
  },
  input: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    
  },
  textInput: {
    flex: 1,
    fontSize: 15,
    fontWeight: 'bold',
  },
  btn: {
    margin: 5
  },
  loginBtn: {
    padding: 5,
    textAlign: 'center',
    color: 'black',
    fontWeight: 'bold',
    fontSize: 15
  }
});