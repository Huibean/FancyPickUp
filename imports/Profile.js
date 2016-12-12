import React, { Component, PropTypes } from 'react';
import { 
  View,
  TextInput,
  Text,
  StyleSheet,
  Image,
  TouchableHighlight,
  Button,
} from 'react-native';

import { baseUrl } from '../config/environment';

export default class Profile extends Component {
  
  constructor(props) {
    super(props)
  };

  goToEditProfile() {
    let user = this.props.user;
    this.props.navigator.push({index: 2, user: user})
  };

  goToMatchPage() {
    let user = this.props.user;
    this.props.navigator.push({index: 3, user: user})
  };

  renderAvatarBox() {
    let user = this.props.user;
    return (
      <View style={styles.box}>
        <TouchableHighlight onPress={this.goToEditProfile.bind(this)}>
          <View style={styles.avatarBox}>
            <Image style={styles.avatar} source={require("../images/default_avatar.jpg")} />
            <View style={styles.infoBox}>
              <Text>
                Email: {user.email}
              </Text>
              <Text>
                UserName: {user.name}
              </Text>
            </View>
          </View>
        </TouchableHighlight>
      </View>
    )
  };

  handleAddRoutes() {
    let user = this.props.user;
    this.props.navigator.push({index: 4, user: user})
  };

  renderRoutesInfoBox() {
    let routes = this.props.routes;
    return (
      <View style={styles.box}>
        <View style={styles.routesInfoBox}>
          <View style={styles.routesInfo}>
            <Text>
              currently {routes.length} routes
            </Text>
          </View>
          <View>
            <Button
              title="Add"
              onPress={this.handleAddRoutes.bind(this)}
            />
          </View>
        </View>
      </View>
    )
  };

  handleActiveRoute(routeId) {
    alert(routeId)
  };

  renderRoutesBox() {
    let routes = this.props.routes;
    let content = <View></View> 
    if (routes.length > 0) {
      let routesText = routes.map((route) => {
        let routeText = route.locations.map((location) => {
                          return location.name
                        }).join(" > ")
        return <View key={route._id} style={styles.routeInfo}>
                 <Text style={{alignSelf: 'center', marginLeft: 10}}>{routeText}</Text>
                 <Button 
                   color="lightgreen"
                   onPress={this.handleActiveRoute.bind(this, route._id)}
                   disabled={true}
                   title="Actived" />
               </View>
      })
      content = <View style={styles.box}>
                  {routesText}
                </View>
    }
    return content
  };

  renderLogoutBtn() {
    return (
      <View style={styles.logoutBtn}>
        <TouchableHighlight>
          <Text>
            Logout
          </Text>
        </TouchableHighlight>
      </View>
    )
  };

  renderMatchBox() {
    return (
      <View style={styles.box}>
        <View style={styles.matchBox}>
          <View style={styles.infoBox}>
            <Text>no match yet</Text>
          </View>
          <View>
            <Button title="Add" onPress={this.goToMatchPage.bind(this)}/>
          </View>
        </View>
      </View>
    )
  };

  render() {
    return (
      <View style={styles.container}>
        {this.renderAvatarBox()}
        {this.renderMatchBox()}
        {this.renderRoutesInfoBox()}
        {this.renderRoutesBox()}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
    flexDirection: 'column',
  },
  box: {
    overflow: 'scroll',
    elevation: 1,
    shadowColor: 'black',
    shadowOpacity: 1.0,
    backgroundColor: "white",
    shadowRadius: 2,
    shadowOffset: {
      height: 1,
      width: 1
    },
    marginTop: 15,
    marginLeft: 10,
    marginRight: 10,
  },
  avatarBox: {
    flexDirection: "row",
  },
  avatar: {
    margin: 10,
    width: 50,
    height: 50
  },
  infoBox: {
    margin: 10
  },
  logoutBtn: {
    backgroundColor: '#ff0000',
    marginLeft: 10,
    marginRight: 10,
  },
  routesInfoBox: {
    flexDirection: "row",
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  routesInfo: {
    marginLeft: 10,
  },
  routeInfo: {
    flexDirection: "row",
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  matchBox: {
    flexDirection: "row",
    justifyContent: 'space-between',
    alignItems: 'center'
  },
});
