
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
  ImagePickerIOS,
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

// The following is the JSON that the following request outputs:
// const x = {
//   categories: [{
//     name: 'plant_flower',
//     score: 0.73046875
//   }],
//   requestId: 'c91c08b1-cc88-4004-8f92-dc5f5330148f',
//   metadata: {
//     width: 387,
//     height: 221,
//     format: 'Jpeg'
//   }
// };
// Computer Vision Key: c3fd9e451da54cb7a1327ea21c1c182e
// https://upload.wikimedia.org/wikipedia/commons/d/de/Bananavarieties.jpg

export default class AI_Photo extends Component {
  state: {
    text: string
  };
  constructor(props) {
    super(props);
    this.state = {
      text: "hey now"
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

  componentDidMount() {
    ImagePicker.showImagePicker(null, (response)  => {
      // Same code as in above section!
      console.log(response);
  });
  }

  render() {
    const pic = {
      uri: 'https://upload.wikimedia.org/wikipedia/commons/d/de/Bananavarieties.jpg'
    };
    return (
      <Container>
        <Header>
          <Title>AI Photo</Title>
        </Header>
        <Content>
          <Text style = {styles.welcome}>Tap the image to select a new photo</Text>
          <View style={styles.image}>
            <Image style={{width: 193, height: 110}} source={pic} />
          </View>
          <Text>{this.state.text}</Text>
          <Button onPress={() => this.getNameOfPicture()}>Send Data</Button>
        </Content>
      </Container>
    );
  }
}

AppRegistry.registerComponent('AI_Photo', () => AI_Photo);
