import React, {Component} from 'react';
import {Appbar, TextInput, Button, Searchbar} from 'react-native-paper';
import {StyleSheet, View} from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

var data;
export default class Profile extends Component {
  state = {
    loaded: true,
    dataLoaded: false,
    user: '',
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
});
