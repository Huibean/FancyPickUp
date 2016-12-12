import React, { Component, PropTypes } from 'react';
import { 
  View,
  TextInput,
  Text,
  Image,
  Button,
  StyleSheet,
  TouchableHighlight,
  WebView
} from 'react-native';

import { baseUrl } from '../config/environment';

export default class NewRoute extends Component {
  constructor(props) {
    super(props)
  }

  goBack() {
    this.props.navigator.jumpBack()
  };

  render() {
    let source = baseUrl + "routes/new"
    return(
      <View>
        <View style={styles.header}>
          <TouchableHighlight
            style={styles.arrow}
            onPress={this.goBack.bind(this)}>
            <Image source={require("../images/ic_arrow_back_white_18dp.png")}/>
          </TouchableHighlight>
          <Text style={styles.title}>Add Your Route</Text>
          <View></View>
        </View>
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'space-between',}}>
          <WebView
            source={{url: 'https://github.com/facebook/react-native'}}
            style={{flex:1, height: 400}}
            domStorageEnabled={true}
            startInLoadingState={true}
            scalesPageToFit={true}
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
  title: {
    fontSize: 20,
    color: "white"
  },
});
