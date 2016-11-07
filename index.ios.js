/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Image,
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
  View, } from 'native-base';

import styles from './src/styles.js';

// const request = require('request');

// Computer Vision Key: c3fd9e451da54cb7a1327ea21c1c182e

export default class AI_Photo extends Component {
  callApi() {
    fetch('https://api.projectoxford.ai/vision/v1.0/analyze?', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Ocp-Apim-Subscription-Key': 'c3fd9e451da54cb7a1327ea21c1c182e'
      },
      body: JSON.stringify({
        firstParam: 'yourValue',
        secondParam: 'yourOtherValue',
      })
    })
  }

  // requestCognitiveServices() {
  //   request({
  //       url: 'https://api.projectoxford.ai/vision/v1.0/analyze?',
  //       method: 'POST',
  //       json:{"url":"https://upload.wikimedia.org/wikipedia/commons/d/de/Bananavarieties.jpg"},
  //       headers: {
  //           'Content-Type': 'application/json',
  //           'Ocp-Apim-Subscription-Key': 'c3fd9e451da54cb7a1327ea21c1c182e'
  //       }
  //   }, (error, response, body) => {
  //       if (error) {
  //         console.log(error);
  //         return;
  //       }
  //       const obj = body["documents"][0];
  //       console.log(obj);
  //   });
  // }

  render() {
    let pic = {
      uri: 'https://upload.wikimedia.org/wikipedia/commons/d/de/Bananavarieties.jpg'
    };
    return (
      <Container>
        <Header>
          <Title>AI Photo</Title>
        </Header>
        <Content>
          <View style={styles.image}>
            <Image source={pic} style={{width: 193, height: 110}}/>
            <Button>
              Send Request
            </Button>
          </View>
        </Content>
      </Container>
    );
  }
}

AppRegistry.registerComponent('AI_Photo', function() { return AI_Photo });
