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
      <TouchableHighlight
        onPress={this.props.onPress}
        style={styles.button}>

        <Text>{this.props.text}</Text>

      </TouchableHighlight>
    )
  }
}

const styles = StyleSheet.create({
  button: {
    margin:5,
    backgroundColor: 'green',
    padding: 15,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#cdcdcd',
  }
});
