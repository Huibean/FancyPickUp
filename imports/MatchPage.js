import React, { Component, PropTypes } from 'react';
import { 
  View,
  TextInput,
  Text,
  Image,
  Button,
  StyleSheet,
  TouchableHighlight,
} from 'react-native';

import { baseUrl } from '../config/environment';

export default class MatchPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: "",
      searchResult: ''
    }
  };

  goBack() {
    this.props.navigator.jumpBack()
  };

  handleEmailChange(email) {
    console.log("searching email: ", email)
    if (!email) return 
    let queryString = "?email=" + email
    fetch( baseUrl +'users/search' + queryString)
      .then((response) => {
        return response.json()
      })
      .then((responseJson) => {
        console.log("getting result: ", responseJson)
        this.setState({searchResult: responseJson.user})
        return responseJson 
      }).catch((error) => {
        console.error(error);
      })
  };

  renderSearchResult() {
    let result = this.state.searchResult
    let content;
    if (typeof result == 'string') return
    if (result) {
      content = <View style={styles.resultItem}>
                  <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                    <Image style={styles.avatar} source={require("../images/default_avatar.jpg")} />
                    <Text>{result.name}</Text>
                  </View>
                  <Button title="Pair"/>
                </View>
    } else {
      content = <View style={styles.resultItem}>
                  <View></View>
                  <Text>no results</Text>
                  <View></View>
                </View>
    }
    return (
      <View>
        {content}
      </View>
    )
  };
  
  render() {
    let user = this.state.user
    return(
      <View>
        <View style={styles.header}>
          <TouchableHighlight
            style={styles.arrow}
            onPress={this.goBack.bind(this)}>
            <Image source={require("../images/ic_arrow_back_white_18dp.png")}/>
          </TouchableHighlight>
          <Text style={styles.title}>Find Your Partner</Text>
          <View></View>
        </View>
        <View style={styles.searchBar}>
          <Image style={styles.searchIcon} source={require("../images/ic_search_black_18dp.png")} />
          <TextInput
            style={styles.textInput}
            onChangeText={(email) => {
              this.setState({email: email})
              this.handleEmailChange(email)
            }}
            value={this.state.email}
            placeholder="search by email"
          />   
        </View>
        <View style={styles.resultsBox}>
          {this.renderSearchResult()}
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
  arrow: {
  },
  title: {
    fontSize: 20,
    color: "white"
  },
  searchBar: {
    marginTop: 20,
    height: 40,
    backgroundColor: "white",
    flexDirection: 'row',
    alignItems: 'center',
  },
  textInput: {
    alignSelf: 'stretch',
    width: 250
  },
  searchIcon: {
    marginLeft: 30
  },
  resultsBox: {
    marginTop: 20,
    backgroundColor: "cornsilk",
    flexDirection: 'column',
  },
  resultItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  avatar: {
    margin: 10,
    width: 35,
    height: 35,
    borderColor: 'black',
  }
});
