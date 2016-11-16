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
import RNFetchBlob from 'react-native-fetch-blob';

export default class AI_Photo extends Component {
  state: {
    text: string,
    pic: Object,
    rawImageBinary: string,
  };
  constructor(props) {
    super(props);

    this.state = {
      text: "hey now",
      pic: {
        uri: 'https://upload.wikimedia.org/wikipedia/commons/d/de/Bananavarieties.jpg'
      },
      rawImageBinary: '',
    };
  }

  talkToHuman(text) {
    speech.speak({
      text: 'Your photo is of a ' + text,
      voice: 'en-US'
    });
  }

  microsoftApiFetch(rawImageBinary) {
    const microsoftUrl = 'https://api.projectoxford.ai/vision/v1.0/analyze?';
    const init = {
      'Accept': 'application/json',
      'Content-Type': 'application/octet-stream',
      'Ocp-Apim-Subscription-Key': 'c3fd9e451da54cb7a1327ea21c1c182e'
    };

    RNFetchBlob.fetch('POST', microsoftUrl, init, rawImageBinary)
      .then(response => response.json())
      .then(json => json.categories[0].name)
      .then((name) => {
        this.setState({text:name});
        console.log(name);
        return name;
      })
      .then((text) => {
        this.talkToHuman(text);
      })
      .catch((errorMessage, statusCode) => {
        if (statusCode === 415) {
          console.log('The media type supplied to Microsofts API is unsupported.');
        } else if (statusCode === 400) {
          console.log('There are many different problems that could have happened.');
        } else if (statusCode === 500) {
          console.log('Many possible errors. Most likely image processing timed out.');
        }
      })
  }

  launchImagePicker() {
    const options = {
      quality: 0.5
    };
    ImagePicker.showImagePicker(options, (response) => {
      let res = response;
      res.width = 100;
      res.height = 100;

      if (res.didCancel) {
        this.setState({pic: {uri:'https://upload.wikimedia.org/wikipedia/commons/d/de/Bananavarieties.jpg'}});
        return
      }

      this.setState({pic: {uri: res.uri}});
      this.setState({rawImageBinary: res.data});
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

        {/* With the following I am going pass in raw image binary instead of a uri */}
        <TouchableWithoutFeedback onPress={()=> this.microsoftApiFetch(this.state.rawImageBinary)}>
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
