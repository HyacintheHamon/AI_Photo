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

  convertToAppropriateJson(obj) {
    const json = JSON.stringify(obj);
    return json;
  }

  getNameOfPicture(uri: string) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Ocp-Apim-Subscription-Key', 'c3fd9e451da54cb7a1327ea21c1c182e');
    const init = {
      method: 'POST',
      body: this.convertToAppropriateJson( {url:uri} ),
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
      .then((name) => {
        // speech.speak({
        //   text: 'Your photo is of a ' + name,
        //   voice: 'en-US'
        // });
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
      console.log(response);
      this.setState({pic: {uri:res.origURL}});
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
          <Button onPress={()=>this.getNameOfPicture(this.state.pic.uri)}>Send data</Button>
        </Content>
      </Container>
    );
  }
}

AppRegistry.registerComponent('AI_Photo', () => AI_Photo);
