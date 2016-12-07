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

import { baseUrl } from '../config/environment';
import geoCalculator from '../lib/geo_calculator';

import Location from './Location';

export default class Tracking extends Component {
  constructor(props) {
    super(props)
    this.state = {
      initialPosition: 'unknown',
      lastPosition: 'unknown',
      route: this.props.route,
      lastArrivedPosition: null
    }
  };

  watchID: ?number = null;

  componentDidMount() {
    this.getCurrentPosition()
  };

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchID);
  };

  updateUserLocation(locationParams) {
    fetch( baseUrl +'users/updateLocation', {
      method: 'PATCH',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(locationParams)
    }).catch((error) => {
      console.error(error);
    })
  };

  getCurrentPosition() {
    console.log("getting position...")
    navigator.geolocation.getCurrentPosition((position) => {
        console.log("postion:", position);
        let initialPosition = position.coords;
        console.log("initialPosition: ", initialPosition);
        this.setState({initialPosition});
        this.updateUserLocation(initialPosition);
        this.checkPosition(initialPosition);
      },
      (error) => alert(JSON.stringify(error)),
      {enableHighAccuracy: true, timeout: 200000, maximumAge: 1000}
    );
    this.watchPosition()
  };

  watchPosition() {
    console.log("watching position...")
    this.watchID = navigator.geolocation.watchPosition((position) => {
      let lastPosition = position.coords;
      console.log("lastPosition: ", lastPosition);
      this.setState({lastPosition});
      this.updateUserLocation(lastPosition);
      this.checkPosition(lastPosition);
    }, (err) => {
      alert(err)
    }, {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000});
    console.log("watchID:", this.watchID)
  };

  checkPosition(position) {
    console.log("checking position: ", position, "type: ", typeof position)
    if (typeof position == 'object') {
      let positions = this.state.route.locations;
      console.log("positions: ", positions)
      let arriviedPositions = []
      positions.map(function(p) {
        let distance = geoCalculator.calDistance(p, position)
        if (distance < 500) arriviedPositions.push(p)
      })
      console.log("arriviedPositions: ", arriviedPositions)
      this.setState({lastArrivedPosition: arriviedPositions[arriviedPositions.length - 1]})
      console.log("last arrivied position", this.state.lastArrivedPosition)
    }
  };

  renderGpsData() {
    let content;
    if(this.state.initialPosition != "unknown" || this.state.lastPosition != "unknown" ) {
      content = <View>
                  <Text>initialPosition: {JSON.stringify(this.state.initialPosition)}</Text>
                  <Text>lastPosition: {JSON.stringify(this.state.lastPosition)}</Text>
                </View>
    } else {
      content = <Text>Getting GPS...</Text>
    }
    return (
      <View>
        {content}
      </View>
    )
  };

  renderRoute() {
    let route = this.state.route;
    let lastArrivedPosition = this.state.lastArrivedPosition;
    let locations = route.locations.map((location) => {
      return (
        <Location key={location._id} location={location} lastArrivedPosition={lastArrivedPosition}/>
      )
    })
    return (
      <View>
        {locations}
      </View>
    )
  }

  render() {
    return(
      <View style={styles.layout}>
        <View>
          <Text>
            tracking page
          </Text>
        </View>
        {this.renderGpsData()}
        {this.renderRoute()}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  layout: {
    justifyContent: 'space-between',
    flexDirection: 'column'
  },
});
