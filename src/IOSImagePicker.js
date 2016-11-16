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

/*
microsoftApiFetch2(rawImageBinary: string) {
  let headers = new Headers();
  headers.append('Content-Type', 'application/octet-stream');
  headers.append('Ocp-Apim-Subscription-Key', 'c3fd9e451da54cb7a1327ea21c1c182e');
  const init = {
    method: 'POST',
    processData: false,
    body: rawImageBinary,
    headers: headers
  };

  const myRequest = new Request('https://api.projectoxford.ai/vision/v1.0/analyze?', init);

  fetch(myRequest)
    .then((response) => {
      const statusCode = response.status;
      console.log('The status code is: ' + statusCode);
      console.log(response.json());

      if (statusCode === 200) {
        return response.json();
      } else if (statusCode === 415) {
        console.log('The media type supplied to Microsofts API is unsupported.');
      } else if (statusCode === 400) {
        console.log('There are many different problems that could have happened.');
      } else if (statusCode === 500) {
        console.log('Many possible errors. Most likely image processing timed out.');
      }
    })
    .then((json) => {
      return json.categories[0].name;
    })
    .then((name) => {
      this.setState({text:name});
      return name;
    })
    .then((text) => {
      this.talkToHuman(text);
    })
    .catch((error) => { console.error(error) });
}
*/
