import React, {Component} from 'react';
import {Appbar, Button} from 'react-native-paper';
import {StyleSheet, Text, View} from 'react-native';
import {KEY} from '../../../api_call';
import YouTube from 'react-native-youtube';

export default class VideoPlayer extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const {navigation} = this.props;
    const {videoId, Title} = this.props.route.params;
    console.log('Title ');
    console.log(KEY);
    return (
      <View style={styles.container}>
        <Appbar.Header>
          <Appbar.Content title="Video Player" />
        </Appbar.Header>
        <View style={{width: '100%', height: '40%'}}>
          <YouTube
            apiKey={KEY}
            videoId={videoId} // The YouTube video ID
            play // control playback of video with true/false
            fullscreen={false} // control fullscreen or inline
            loop={false} // control whether the video should loop when ended
            showinfo
            controls={1}
            rel={false}
            style={{alignSelf: 'stretch', height: 300}}
          />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.text}>{Title}</Text>
        </View>
        <Button
          icon="arrow-left-box"
          mode="contained"
          style={styles.button}
          onPress={() => navigation.goBack()}>
          Back
        </Button>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  spinner: {
    flex: 1,
    flexDirection: 'column',
    alignContent: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 17,
    fontWeight: 'bold',
  },
  textContainer: {
    padding: 20,
  },
  button: {
    position: 'absolute',
    bottom: 40,
    alignSelf: 'center',
  },
});
