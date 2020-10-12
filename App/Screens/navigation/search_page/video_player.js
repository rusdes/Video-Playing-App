import React, {Component} from 'react';
import {Appbar, Button, IconButton, Colors} from 'react-native-paper';
import {StyleSheet, Text, View} from 'react-native';
import {KEY} from '../../../api_call';
import YouTube from 'react-native-youtube';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

export default class VideoPlayer extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    fav: false,
  };

  setFavButton = async () => {
    let uid = auth().currentUser.uid;
    const usersRef = firestore().collection('users');
    await usersRef
      .doc(uid)
      .get()
      .then((firestoreDocument) => {
        if (!firestoreDocument.exists) {
          alert('User does not exist anymore.');
          return;
        }
        let favVideosList = firestoreDocument.data()['favVideos'];
        return favVideosList;
      })
      .then((favVideosList) => {
        console.log('fav: ' + favVideosList);
        if (favVideosList.includes(this.props.route.params.videoId)) {
          return true;
        } else {
          return false;
        }
      })
      .then((x) => {
        console.log(x);
        if (x) {
          this.setState({fav: true});
        } else {
          this.setState({fav: false});
        }
      });
  };

  addToFav = async () => {
    let uid = auth().currentUser.uid;
    const usersRef = firestore().collection('users');
    await usersRef
      .doc(uid)
      .update({
        favourites: firestore.FieldValue.arrayUnion(
          this.props.route.params.item,
        ),
        favVideos: firestore.FieldValue.arrayUnion(
          this.props.route.params.videoId,
        ),
      })
      .then(() => {
        this.setState({fav: true});
      });
  };
  removeFromFav = async () => {
    let uid = auth().currentUser.uid;
    const usersRef = firestore().collection('users');
    await usersRef
      .doc(uid)
      .update({
        favourites: firestore.FieldValue.arrayRemove(
          this.props.route.params.item,
        ),
        favVideos: firestore.FieldValue.arrayRemove(
          this.props.route.params.videoId,
        ),
      })
      .then(() => {
        this.setState({fav: false});
      });
  };

  componentDidMount() {
    this.setFavButton();
  }

  componentWillUnmount() {
    // fix Warning: Can't perform a React state update on an unmounted component
    this.setState = (state, callback) => {
      return;
    };
  }

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
                this.removeFromFav();
              }}
            />
          ) : (
            <IconButton
              style={styles.fav_button}
              icon="heart"
              color={Colors.white}
              size={60}
              onPress={() => {
                this.addToFav();
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