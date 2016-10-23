import React, { Component, PropTypes } from 'react';
import { 
  View,
  Text,
  TouchableHighlight,
  StyleSheet
} from 'react-native';

export default class Button extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <View>
      <TouchableHighlight
        onPress={this.props.onPress}
        style={[styles.button, {backgroundColor: this.props.color || '#32cd32'}]}>
          <Text style={styles.text}>{this.props.text}</Text>
      </TouchableHighlight>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  button: {
    padding: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  text: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 15
  }
});
