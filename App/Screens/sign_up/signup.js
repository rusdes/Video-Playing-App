import React, {Component} from 'react';
import {View, StyleSheet, Keyboard, TouchableOpacity, Text} from 'react-native';
import {TextInput, HelperText, RadioButton, Avatar} from 'react-native-paper';
import AsyncStorage from '@react-native-community/async-storage';
import DateTimePicker from '@react-native-community/datetimepicker';
// import {firebase} from '../../firebase_config';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import ImagePicker from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';

const date = 0;
const dateDisplay = new Date();

export default class SignUp extends Component {
  state = {
    name: '',
    number: '',
    email: '',
    password: '',
    gender: '',
    birth_date: this.getParsedDate(date),
    picture: '',
    showDate: false,
    localPath: '',
  };

  componentWillUnmount() {
    // fix Warning: Can't perform a React state update on an unmounted component
    this.setState = (state, callback) => {
      return;
    };
  }

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

  hasErrors = () => {
    return false;
  };

  nameHasErrors = () => {
    if (this.state.name === '') {
      return false;
    }
    const reg = /^[a-zA-Z]+$/;
    if (reg.test(this.state.name) === true) {
      return false;
    }
    return true;
  };

  hasErrors = () => {
    return false;
  };

  onChangeDate = (event, selectedDate) => {
    if (selectedDate !== undefined) {
      this.setState({
        birth_date: this.getParsedDate(selectedDate),
        showDate: false,
      });
    }
  };

  getParsedDate(date) {
    if (date === 0) {
      return '';
    }
    date = String(date).split(' ');
    var str = date[1] + ' ' + date[2] + ' ' + date[3];
    return str;
  }

  saveSignUp = async () => {
    const emailId = this.state.email.toString();
    const obj = {
      gender: this.state.gender,
      birth_date: this.state.birth_date,
      name: this.state.name,
      password: this.state.password,
    };
    try {
      const jsonValue = JSON.stringify(obj);
      await AsyncStorage.setItem('current_email', emailId);
      await AsyncStorage.setItem(emailId, jsonValue);
      console.log(emailId + ' saved');
      console.log(jsonValue + ' saved');
    } catch (e) {
      console.log(e);
    }
  };

  onRegisterPress = () => {
    auth()
      .createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then((response) => {
        const uid = response.user.uid;

        //upload profile picture
        if (this.state.localPath !== '') {
          storage()
            .ref('/' + uid + '/profile_pic')
            .putFile(this.state.localPath.toString())
            .then((snapshot) => {
              //You can check the image is now uploaded in the storage bucket
              console.log(`image has been successfully uploaded.`);
            })
            .catch((e) => console.log('uploading image error => ', e));
        }

        let account = {};
        account.id = response.user.uid;
        account.gender = this.state.gender;
        account.birth_date = this.state.birth_date;
        account.name = this.state.name;
        account.password = this.state.password;
        account.email = this.state.email.toLowerCase();
        account.picture = this.state.picture;
        account.favourites = [];
        account.favVideos = [];
        const usersRef = firestore().collection('users');
        usersRef
          .doc(uid)
          .set(account)
          .then(this.props.navigation.navigate('LogIn', {uid: uid}))
          .catch((error) => {
            alert(error);
          })
          .catch((error) => {
            alert(error);
          });
      });
  };

  onSignUp = () => {
    this.onRegisterPress();
  };

  options2 = {
    title: 'Select Picture',
    mediaType: 'photo',
    quality: 1,
  };

  selectPicture = () => {
    ImagePicker.showImagePicker(this.options2, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ');
      } else if (response.customButton) {
        console.log('User tapped custom button: ');
      } else {
        const source = {uri: response.uri};
        this.setState({picture: source, localPath: response.path});
        console.log(this.state.picture);
      }
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.logo}>Sign Up</Text>
        <TouchableOpacity
          style={styles.profilePicture}
          onPress={this.selectPicture}>
          {this.state.picture === '' ? (
            <Avatar.Image size={140} source={require('./icon.jpg')} />
          ) : (
            <Avatar.Image size={140} source={this.state.picture} />
          )}
        </TouchableOpacity>
        <View style={styles.inputGender}>
          <RadioButton.Group
            onValueChange={(value) => this.setState({gender: value})}
            value={this.state.gender}>
            <View>
              <Text>Male</Text>
              <RadioButton value="Male" />
            </View>
            <View>
              <Text>Female</Text>
              <RadioButton value="Female" />
            </View>
          </RadioButton.Group>
        </View>
        <View style={styles.inputDate}>
          <TextInput
            style={styles.inputText}
            label="Birth Date"
            onFocus={() => {
              Keyboard.dismiss();
              this.setState({showDate: true});
            }}
            underlineColor="#465881"
            value={this.state.birth_date}
          />
        </View>
        {this.state.showDate ? (
          <DateTimePicker
            testID="dateTimePicker"
            value={dateDisplay}
            mode={'date'}
            display="default"
            onChange={this.onChangeDate}
          />
        ) : (
          <View />
        )}

        <View style={styles.inputView}>
          <TextInput
            style={styles.inputText}
            label="Email"
            underlineColor="#465881"
            value={this.state.email}
            onChangeText={(value) => this.setState({email: value})}
          />
        </View>
        <HelperText type="error" visible={this.emailHasErrors()}>
          Email address is invalid
        </HelperText>

        <View style={styles.inputView}>
          <TextInput
            style={styles.inputText}
            label="Name"
            underlineColor="#465881"
            value={this.state.name}
            onChangeText={(value) => this.setState({name: value})}
          />
        </View>
        <HelperText type="error" visible={this.nameHasErrors()}>
          Name is invalid
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
          Password is invalid
        </HelperText>
        <TouchableOpacity
          style={styles.loginBtn}
          onPress={this.onSignUp}
          color="#fb5b5a"
          accessibilityLabel="Press to Sign Up">
          <Text style={styles.loginText}>Sign Up</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => this.props.navigation.navigate('LogIn')}>
          <Text style={styles.loginText}>Log In</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    width: '80%',
    height: 50,
    marginBottom: 0,
    marginTop: 20,
    justifyContent: 'center',
    padding: 20,
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
  loginText: {
    color: 'white',
  },
  profilePicture: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 80,
    width: 80,
    borderRadius: 40,
  },
});
