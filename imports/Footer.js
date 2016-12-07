import React, { Component, PropTypes } from 'react';
import { 
  View,
  TextInput,
  Text,
  StyleSheet,
  Image,
  AsyncStorage,
  TouchableHighlight
} from 'react-native';

export default class Footer extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return(
      <View style={styles.footer}>
        <TouchableHighlight
          onPress={this.props.goToAction.bind(this, "Tracking")}
          style={styles.touchTab}>
          <Image style={styles.icon} source={require("../images/ic_directions_run_black_24dp.png")} />
        </TouchableHighlight>
        <TouchableHighlight
          onPress={this.props.goToAction.bind(this, "Profile")}
          style={styles.touchTab}>
          <Image style={styles.icon} source={require("../images/ic_account_box_black_24dp.png")} />
        </TouchableHighlight>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  footer: {
    flexDirection: "row",
    backgroundColor: "#f0f8ff"
  },
  touchTab: {
    flex: 1,
    height: 40,
    borderColor: 'black',
    borderTopWidth: 0.5,
    alignItems: 'center',
  },
  icon: {
    flex: 1,
  }
});
