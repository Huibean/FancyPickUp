import React, { Component, PropTypes } from 'react';
import { View, Text } from 'react-native';

import SignUp from './accounts/SignUp'

export default class Scene extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    index: PropTypes.number.isRequired,
  }

  getScene() {
    if (this.props.index == 0) {
      return (
        <SignUp />
      ) 
    } else {
      return (
        <Text>No Scene Match, Current index: { this.props.index }</Text>
      )
    }
  }

  render() {
    let sence = this.getScene();
    return (
      <View>
        {sence}
      </View>
    )
  }
}
