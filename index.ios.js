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

  getDataFromMicrosoft() {
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
      .then(response => response.json())
      .then(json => json.categories[0].name)
      .then(function(name) { this.setState({text:name}) }.bind(this))
      .catch((error) => { console.error(error) });
  }

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
          <View style={styles.image} >
            <Image source={pic} style={{width: 193, height: 110}}/>
          </View>
          <Text>{this.state.text}</Text>
          <Button onPress={() => this.getDataFromMicrosoft()}>Send Data</Button>
        </Content>
      </Container>
    );
  }
}

AppRegistry.registerComponent('AI_Photo', function() { return AI_Photo });
