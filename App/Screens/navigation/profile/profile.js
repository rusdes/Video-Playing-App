import React, {Component} from 'react';
import {Appbar, TextInput, Avatar} from 'react-native-paper';
import {StyleSheet, View, Image} from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';

var data;
export default class Profile extends Component {
  state = {
    loaded: true,
    dataLoaded: false,
    user: '',
    profileImageUrl: '',
  };

  componentDidMount() {
    this.getData().then(this.setState({dataLoaded: true}));
  }

  getData = async () => {
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
        data = firestoreDocument.data();
        return data;
      })
      .then((data) => {
        this.setState({user: data});
      })
      .then(() => {
        console.log('data: ' + this.state.user);
        if (this.state.profileImageUrl === '') {
          let imageRef = storage().ref('/' + uid + '/profile_pic');
          imageRef
            .getDownloadURL()
            .then((url) => {
              //from url you can fetched the uploaded image easily
              this.setState({profileImageUrl: url});
            })
            .then(() => {
              console.log(this.state.profileImageUrl);
            })
            .catch((e) =>
              console.log('getting downloadURL of image error => ', e),
            );
        }
        return;
      })
      .catch((error) => {
        alert(error);
      });
  };

  render() {
    let data = this.state.user;
    return (
      <View style={styles.container}>
        <Appbar.Header>
          <Appbar.Content title="Profile" />
        </Appbar.Header>
        {this.state.dataLoaded ? (
          <View style={styles.secondContainer}>
            <View style={styles.profilePicture}>
              {this.state.profileImageUrl === '' ? (
                <Avatar.Image
                  size={140}
                  source={require('../../sign_up/icon.jpg')}
                />
              ) : (
                <Image
                  source={{uri: this.state.profileImageUrl}}
                  style={styles.image}
                />
              )}
            </View>

            <View style={{padding: 10}}>
              <TextInput
                label={'Gender'}
                value={data['gender']}
                mode="outlined"
                editable={false}
              />
              <TextInput
                style={{paddingTop: 10}}
                label="Birth Date"
                value={data['birth_date']}
                mode="outlined"
                editable={false}
              />
              <TextInput
                style={{paddingTop: 10}}
                label="Email"
                value={data['email']}
                mode="outlined"
                editable={false}
              />
              <TextInput
                style={{paddingTop: 10}}
                label="Name"
                value={data['name']}
                mode="outlined"
                editable={false}
              />
            </View>
          </View>
        ) : (
          <View />
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  profilePicture: {
    alignItems: 'center',
    flex: 0.5,
  },
  secondContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignContent: 'center',
  },
  image: {
    height: 140,
    width: 140,
    borderRadius: 70,
  },
});
