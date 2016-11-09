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

import styles from './src/styles.js';
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
  }

  getNameOfPicture(uri) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Ocp-Apim-Subscription-Key', 'c3fd9e451da54cb7a1327ea21c1c182e');
    const init = {
      method: 'POST',
      body: '{"url":'+uri+'}',
      headers: headers
    };
    const myRequest = new Request('https://api.projectoxford.ai/vision/v1.0/analyze?', init);

    // i think uri is causing error
    fetch(myRequest)
      .then((response) => {
        console.log(response.json());
        return response.json();
      })
      .then(json => json.categories[0].name)
      .then((name) => {
        this.setState({text:name});
        return name;
      })
      .then((name) => {
        speech.speak({
          text: 'Your photo is of a ' + name,
          voice: 'en-US'
        });
      })
      .catch((error) => { console.error(error) });
  }

  launchImagePicker() {
    ImagePicker.showImagePicker(null, (response) => {
      const uri = response.uri;
      this.setState({pic: {uri:uri}});
      this.getNameOfPicture(uri);
    });
  }

  render() {
    return (
      <Container>
        <Header>
          <Title>AI Photo</Title>
        </Header>
        <Content>
          <Text style = {styles.welcome}>Tap the image to select a new photo!</Text>
          <TouchableHighlight onPress={() => this.launchImagePicker()} style={styles.image}>
            <Image style={{width: 193, height: 110}} source={this.state.pic} />
          </TouchableHighlight>
          <Text>{this.state.text}</Text>
        </Content>
      </Container>
    );
  }
}

AppRegistry.registerComponent('AI_Photo', () => AI_Photo);
