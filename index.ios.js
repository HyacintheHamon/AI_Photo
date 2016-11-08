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
  View, } from 'native-base';

import styles from './src/styles.js';

// Computer Vision Key: c3fd9e451da54cb7a1327ea21c1c182e
const getDataFromMicrosoft = () => {
  let headers = new Headers();
  headers.append('Content-Type', 'application/json');
  headers.append('Ocp-Apim-Subscription-Key', 'c3fd9e451da54cb7a1327ea21c1c182e');

  const init = {
    method: 'POST',
    body: '{"url":"https://upload.wikimedia.org/wikipedia/commons/d/de/Bananavarieties.jpg"}',
    headers: headers
  };

  const myRequest = new Request('https://api.projectoxford.ai/vision/v1.0/analyze?', init);

  fetch(myRequest)
    .then(function(response) {
      if(response.status == 200) return response.json();
      else throw new Error('Something went wrong on api server!');
    })
    .then(function(response) {
      console.debug(response);
    })
    .catch(function(error) {
      console.error(error);
    });
  console.log('Hey now');
};

export default class AI_Photo extends Component {
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
          <TouchableHighlight style={styles.image} onPress={() => getDataFromMicrosoft()}>
            <Image source={pic} style={{width: 193, height: 110}}/>
          </TouchableHighlight>
        </Content>
      </Container>
    );
  }
}

AppRegistry.registerComponent('AI_Photo', function() { return AI_Photo });
