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
import { Container, Header, Title, Content, Footer, FooterTab, Button, Icon, Text,View, } from 'native-base';
import styles from './src/styles.js';

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
          <View style={styles.image}>
            <Image source={pic} style={{width: 193, height: 110}}/>
          </View>
        </Content>
      </Container>
    );
  }
}

AppRegistry.registerComponent('AI_Photo', function() { return AI_Photo });
