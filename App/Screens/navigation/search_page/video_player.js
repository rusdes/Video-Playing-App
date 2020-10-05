import React, {Component} from 'react';
import {Appbar, Button, IconButton, Colors} from 'react-native-paper';
import {StyleSheet, Text, View} from 'react-native';
import {KEY} from '../../../api_call';
import YouTube from 'react-native-youtube';

export default class VideoPlayer extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    fav: true,
  };

  render() {
    const {navigation} = this.props;
    const {videoId, Title} = this.props.route.params;
    return (
      <View style={[{backgroundColor: '#929292'}, styles.container]}>
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
        <View style={styles.container}>
          {this.state.fav ? (
            <IconButton
              style={styles.fav_button}
              icon="heart"
              color={Colors.red400}
              size={60}
              onPress={() => {
                this.setState({fav: false});
              }}
            />
          ) : (
            <IconButton
              style={styles.fav_button}
              icon="heart"
              color={Colors.white}
              size={60}
              onPress={() => {
                this.setState({fav: true});
              }}
            />
          )}
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
    paddingTop: 0,
  },
  button: {
    position: 'absolute',
    bottom: 40,
    alignSelf: 'center',
  },
  fav_button: {
    alignSelf: 'center',
  },
});
