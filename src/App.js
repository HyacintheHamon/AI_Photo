/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
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
      text: 'Your photo is of ' + text,
      voice: 'en-US'
    });
  }

  microsoftApiFetch(rawImageBinary) {
    const microsoftUrl = 'https://api.projectoxford.ai/vision/v1.0/analyze?visualFeatures=Categories,Tags,Description,Faces,ImageType,Color,Adult&details=Celebrities&language=en';
    const init = {
      'Accept': 'application/json',
      'Content-Type': 'application/octet-stream',
      'Ocp-Apim-Subscription-Key': 'c3fd9e451da54cb7a1327ea21c1c182e'
    };

    RNFetchBlob.fetch('POST', microsoftUrl, init, rawImageBinary)
      .then(response => response.json())
      .then(json => json.description.captions[0].text)
      .then((name) => {
        this.setState({text:name});
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

/*
{
  categories: [{
    name: 'outdoor_water',
    score: 0.828125
  }],
  adult:
   { isAdultContent: false,
     isRacyContent: false,
     adultScore: 0.007351919077336788,
     racyScore: 0.012373056262731552 },
  tags:
   [ { name: 'outdoor', confidence: 0.9959841966629028 },
     { name: 'mountain', confidence: 0.9949145317077637 },
     { name: 'nature', confidence: 0.9926238059997559 },
     { name: 'sky', confidence: 0.9898942112922668 },
     { name: 'grass', confidence: 0.9620691537857056 },
     { name: 'hill', confidence: 0.7776529788970947 },
     { name: 'waterfall', confidence: 0.7644999623298645 },
     { name: 'hillside', confidence: 0.6875730156898499 },
     { name: 'canyon', confidence: 0.6577474474906921 },
     { name: 'dirt', confidence: 0.2712985873222351 },
     { name: 'lush', confidence: 0.19674451649188995 } ],
  description:
   { tags:
      [ 'outdoor',
        'mountain',
        'nature',
        'grass',
        'hill',
        'waterfall',
        'hillside',
        'side',
        'water',
        'rocky',
        'narrow',
        'river',
        'train',
        'path',
        'trail',
        'going',
        'green',
        'dirt',
        'country',
        'standing',
        'sheep',
        'man',
        'grassy',
        'large',
        'traveling',
        'forest',
        'track',
        'field',
        'grazing',
        'herd',
        'riding',
        'slope' ],
     captions:
      [ { text: 'a train on a rocky hill',
          confidence: 0.4519705464105171 } ] },
*/
