import React, { Component, PropTypes } from 'react';
import { 
  View,
  TextInput,
  Text,
  StyleSheet,
  Image,
  TouchableHighlight
} from 'react-native';

export default class Location extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    let location = this.props.location;
    let lastArrivedPosition = this.props.lastArrivedPosition;
    let locationStyle;
    if (location.order == 0 || (lastArrivedPosition != null && lastArrivedPosition.order >= location.order)) {
      locationStyle = styles.activedLocation
    }
    return(
      <View>
        <Text style={locationStyle}>{location.name}</Text>
      </View>
    )
  }
};

const styles = StyleSheet.create({
  activedLocation: {
    backgroundColor: 'green'
  }
});
