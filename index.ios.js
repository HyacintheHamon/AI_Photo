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
  // state: {
  //   text: string
  // };
  constructor(props) {
    super(props);
    this.state = {
      text: "hey now",
      pic: {
        uri: 'https://upload.wikimedia.org/wikipedia/commons/d/de/Bananavarieties.jpg'
      },
    };
  }

  getNameOfPicture() {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Ocp-Apim-Subscription-Key', 'c3fd9e451da54cb7a1327ea21c1c182e');
    const init = {
      method: 'POST',
      body: '{"url":"https://www.occrp.org/images/stories/CCWatch/16147_2.jpg"}',
      headers: headers
    };
    const myRequest = new Request('https://api.projectoxford.ai/vision/v1.0/analyze?', init);

    fetch(myRequest)
      .then(response => response.json())
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

  // Response object.
  /*
  {
    height: 2560,
    origURL: 'assets-library://asset/asset.JPG?id=452224F4-B49A-4A46-95A1-E391A5C2AA30&ext=JPG',
    data: '/9j/4AAQSkZJRgABAQAASABIAAD/,
    width: 1440,
    fileSize: 152466,
    isVertical: true,
    uri: 'file:///Users/JacobSiegel/Library/Developer/CoreSimulator/Devices/1F6B2B24-E58E-4AC2-AFC6-D4423122DEFC/data/Containers/Data/Application/5F211997-A2BD-48A2-B7C7-BF89D0602BE1/tmp/02096692-A539-4A05-85AD-6AF4698B4D98.jpg',
  }

  */
  launchImagePicker() {
    ImagePicker.showImagePicker(null, (response) => {
      console.log(response.uri);
      this.setState({pic: {uri:response.uri}});
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
          <Button onPress={() => this.getNameOfPicture()}>Send Data</Button>
        </Content>
      </Container>
    );
  }
}

AppRegistry.registerComponent('AI_Photo', () => AI_Photo);
