/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 */
 'use strict';

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Image,
  TouchableHighlight,
  TouchableWithoutFeedback,
  Animated,
} from 'react-native';

import {
  Container,
  Header,
  Title,
  Content,
  Footer,
  FooterTab,
  Button,
  Icon,
  Text,
  View,
} from 'native-base';

import styles from './styles.js';
const speech = require('react-native-speech');
const ImagePicker = require('react-native-image-picker');

export default class AI_Photo extends Component {
  state: {
    text: string,
    pic: Object
  };
  constructor(props) {
    super(props);

    this.state = {
      text: "hey now",
      pic: {
        uri: 'https://upload.wikimedia.org/wikipedia/commons/d/de/Bananavarieties.jpg'
      },
    };

    this.animatedValue = new Animated.Value(1);
  }

  talkToHuman(text) {
    speech.speak({
      text: 'Your photo is of a ' + text,
      voice: 'en-US'
    });
  }

  imaggaApiFetch(uri: string) {
    
  }

  microsoftApiFetch(uri: string) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Ocp-Apim-Subscription-Key', 'c3fd9e451da54cb7a1327ea21c1c182e');
    const init = {
      method: 'POST',
      body: JSON.stringify( {url:uri} ),
      headers: headers
    };

    console.log(init.body);
    const myRequest = new Request('https://api.projectoxford.ai/vision/v1.0/analyze?', init);

    // i think uri is causing error
    fetch(myRequest)
      .then((response) => {
        if (!response.ok) {
          throw Error('AYYYoooo')
        } else {
          return response.json();
        }
      })
      .then((json) => {
        return json.categories[0].name;
      })
      .then((name) => {
        this.setState({text:name});
        return name;
      })
      .then((text) => {
        this.talkToHuman(text);
      })
      .catch((error) => { console.error(error) });
  }

  launchImagePicker() {
    const options = {
      quality: 0.5
    };
    ImagePicker.showImagePicker(options, (response) => {
      let res = response;
      res.width = 100;
      res.height = 100;
      console.log(res);
      if (res.didCancel) {
        this.setState({pic: {uri:'https://upload.wikimedia.org/wikipedia/commons/d/de/Bananavarieties.jpg'}});
        return
      }
      this.setState({pic: {uri:'data:image/jpeg;base64,' + res.data, isStatic: true}});
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={{alignItems: 'center', justifyContent: 'center'}}>
          <TouchableWithoutFeedback onPress={() => this.launchImagePicker()}>
            <Image style={{width: 193, height: 110}} source={this.state.pic} />
          </TouchableWithoutFeedback>
          <Text>{this.state.text}</Text>
        </View>

        <TouchableWithoutFeedback onPress={()=> this.microsoftApiFetch(this.state.pic.uri)} >
          <View style={buttonStyle.button}>
            <Text style={buttonStyle.text}>Send Data</Text>
          </View>
        </TouchableWithoutFeedback>
      </View>
    );
  }
}

const buttonStyle = StyleSheet.create({
  button: {
    backgroundColor: '#333',
    width: 100,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: '#FFF',
  },
});
