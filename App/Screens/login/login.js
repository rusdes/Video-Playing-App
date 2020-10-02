import React, {Component} from 'react';
import {View, StyleSheet, TouchableOpacity, Text} from 'react-native';
import {TextInput, HelperText} from 'react-native-paper';
import AsyncStorage from '@react-native-community/async-storage';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

let correct = true;
let details;
export default class SignUp extends Component {
  state = {
    email: '',
    password: '',
    correct_state: true,
  };

  componentWillUnmount() {
    // fix Warning: Can't perform a React state update on an unmounted component
    this.setState = (state, callback) => {
      return;
    };
  }

  hasErrors = () => {
    if (this.state.email === '') {
      return false;
    }
    return !this.state.correct_state;
  };

  saveEmail = async () => {
    try {
      let email = this.state.email.toString();
      console.log(email);
      let json = await AsyncStorage.getItem(email);
      console.log(json);
      if (json !== null) {
        try {
          correct = true;
          details = JSON.parse(json);
          if (this.state.password !== details['password']) {
            correct = false;
            console.log(correct);
            console.log(2);
          } else {
            await AsyncStorage.setItem('current_email', email);
          }
        } catch (e) {
          correct = false;
          console.log(correct);
          console.log(2);
        }
      } else {
        correct = false;
        console.log(correct);
        console.log(2);
      }
    } catch (e) {
      console.log(e);
    }
  };

  emailHasErrors = () => {
    if (this.state.email === '') {
      return false;
    }
    const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (reg.test(this.state.email) === true) {
      return false;
    }
    return true;
  };

  onLogIn = async () => {
    await this.saveEmail();
    this.setState({correct_state: correct});
    if (correct) {
      console.log('Navigation');
      this.props.navigation.navigate('Navigation');
    }
  };

  onLoginPress = () => {
    auth()
      .signInWithEmailAndPassword(this.state.email, this.state.password)
      .then((response) => {
        const uid = response.user.uid;
        const usersRef = firestore().collection('users');
        usersRef
          .doc(uid)
          .get()
          .then((firestoreDocument) => {
            if (!firestoreDocument.exists) {
              alert('User does not exist anymore.');
              return;
            }
            const user = firestoreDocument.data();
            this.props.navigation.navigate('Navigation');
          })
          .catch((error) => {
            alert(error);
          });
      })
      .catch((error) => {
        alert(error);
      });
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.logo}>Log In</Text>

        <View style={styles.inputView}>
          <TextInput
            style={styles.inputText}
            label="Email"
            underlineColor="#465881"
            onChangeText={(value) => this.setState({email: value})}
            value={this.state.email}
          />
        </View>
        <HelperText type="error" visible={this.emailHasErrors()}>
          Email address is invalid
        </HelperText>

        <View style={styles.inputView}>
          <TextInput
            style={styles.inputText}
            label="Password"
            underlineColor="#465881"
            value={this.state.password}
            onChangeText={(value) => this.setState({password: value})}
            secureTextEntry={true}
          />
        </View>
        <HelperText type="error" visible={this.hasErrors()}>
          Email address or password is invalid
        </HelperText>
        <TouchableOpacity
          style={styles.loginBtn}
          onPress={this.onLoginPress}
          color="#fb5b5a">
          <Text style={styles.loginText}>Log In</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => this.props.navigation.navigate('SignUp')}>
          <Text style={styles.loginText}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  loginBtn: {
    width: '80%',
    backgroundColor: '#fb5b5a',
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
    marginBottom: 10,
  },
  button: {
    alignSelf: 'stretch',
    flexDirection: 'row',
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: '#003f5c',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    fontWeight: 'bold',
    fontSize: 50,
    color: '#fb5b5a',
    marginBottom: 40,
  },
  inputView: {
    width: '80%',
    backgroundColor: '#465881',
    borderRadius: 25,
    height: 50,
    marginBottom: 0,
    marginTop: 20,
    justifyContent: 'center',
    padding: 20,
  },
  inputDate: {
    width: '80%',
    backgroundColor: '#465881',
    borderRadius: 25,
    height: 50,
    marginBottom: 20,
    marginTop: 20,
    justifyContent: 'center',
    padding: 20,
  },
  inputGender: {
    flexDirection: 'row',
    flexWrap: 'nowrap',
    width: '80%',
    height: 80,
    marginBottom: 0,
    marginTop: 20,
    padding: 20,
    justifyContent: 'space-evenly',
  },
  inputText: {
    backgroundColor: '#465881',
    height: 50,
    color: 'white',
  },
  forgot: {
    color: 'white',
    fontSize: 11,
  },
  loginText: {
    color: 'white',
    alignSelf: 'center',
    justifyContent: 'center',
  },
});
