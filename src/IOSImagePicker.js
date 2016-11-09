/*
* @flow
*/

'use strict';

import React, { Component } from 'react';
import {
  AppRegistry,
  Text,
  View,
  ImagePickerIOS,
  Image,
} from 'react-native';
import styles from './styles.js';

class MainImage extends Component {
  state: {
    image: null
  };

  constructor() {
    super();
    this.state = { image: null };
  }

  componentDidMount() {
    this.pickImage();
  }

  pickImage() {
    // openSelectDialog(config, successCallback, errorCallback);
    ImagePickerIOS.openSelectDialog({}, imageUri => {
      this.setState({ image: imageUri });
    }, error => console.error(error));
  }

  render() {
    return (
      <View style={styles.image}>
        {this.state.image?
          <Image style={{width: 193, height: 110}} source={{ uri: this.state.image }} /> :
          null
        }
      </View>
    );
  }
}

module.exports = MainImage;
