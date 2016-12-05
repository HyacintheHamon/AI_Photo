'use strict';

import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableHighlight,
  TouchableWithoutFeedback,
  ActivityIndicator,
} from 'react-native';

const speech = require('react-native-speech');
const ImagePicker = require('react-native-image-picker');
import RNFetchBlob from 'react-native-fetch-blob';
import './Extensions.js';
const FeaturesList = require('./FeaturesList.js');
const OcpApimSubscriptionKey = require('./../config.js');

export default class AI_Photo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      photoDescription: 'A Pollock painting.',
      pic: {
        uri: 'https://s-media-cache-ak0.pinimg.com/originals/5b/d6/ad/5bd6ad50faf00a3741eaea7a4f2b5c33.jpg'
      },
      rawImageBinary: '',
      isLoading: false,
    };
  }

  // speaks to the user after the data is returned from the microsoft fetch.
  talkToHuman(text) {
    speech.speak({
      text: 'Your photo is of ' + text,
      voice: 'en-US'
    });
  }

  // takes the image as raw binary and sends a post request to microsoft cognitive services API.
  microsoftApiFetch(rawImageBinary) {
    const microsoftUrl = 'https://api.projectoxford.ai/vision/v1.0/analyze?visualFeatures=Categories,Tags,Description,Faces,ImageType,Color,Adult&details=Celebrities&language=en';
    const init = {
      'Accept': 'application/json',
      'Content-Type': 'application/octet-stream',
      'Ocp-Apim-Subscription-Key': OcpApimSubscriptionKey,
    };

    RNFetchBlob.fetch('POST', microsoftUrl, init, rawImageBinary)
      .then(response => response.json())
      .then((json) => {
        const photoDescription = json.description.captions[0].text;
        const editedDescription = photoDescription.capitalizeFirstLetter() + '.';
        return editedDescription;
      })
      .then((photoDescription) => {
        this.setState({ isLoading: false });
        this.setState({photoDescription: photoDescription});
        return photoDescription;
      })
      .then((text) => {
        this.talkToHuman(text);
      })
      .catch((errorMessage, statusCode) => {
        if (statusCode === 415) {
          console.log('The media type supplied to Microsofts API is unsupported.');
        } else if (statusCode === 400) {
          console.log('There are many different problems that could have happened.');
        } else if (statusCode === 500) {
          console.log('Many possible errors. Most likely image processing timed out.');
        }
      })
  }

  buttonWasPressed() {
    this.microsoftApiFetch(this.state.rawImageBinary);
    this.setState({ isLoading: true });
  }

  launchImagePicker() {
    const options = {
      quality: 0.5
    };
    ImagePicker.showImagePicker(options, (response) => {
      let res = response;
      res.width = 100;
      res.height = 100;

      if (res.didCancel) {
        this.setState({pic: {uri: this.state.pic.uri}});
        return
      }

      this.setState({pic: {uri: res.uri}});
      this.setState({rawImageBinary: res.data});

      this.buttonWasPressed();
    });
  }

  render() {
    const featuresList = (<FeaturesList description={this.state.photoDescription}/>);
    let spinner = this.state.isLoading ? (<ActivityIndicator size='large'/>) : (featuresList);
    return (
      <View style={styles.container}>

        <Text style={styles.header}>Tap the image to select a photo!</Text>

        <TouchableWithoutFeedback onPress={() => this.launchImagePicker()}>
          <Image style={styles.mainImage} source={this.state.pic} />
        </TouchableWithoutFeedback>

        <View style={{marginTop:20}}>
          { spinner }
        </View>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#37FDFC',
  },
  header: {
    fontSize: 24,
    marginTop: 24,
  },
  mainImage: {
    width: 250,
    height: 250,
    borderRadius: 125,
    borderWidth: 2,
    marginTop: 20,
  },
});
