import React, {Component} from 'react';
import {Appbar, TextInput, Button, Searchbar} from 'react-native-paper';
import {
  PermissionsAndroid,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  ActivityIndicator,
  FlatList,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

var details;
var email_address;
export default class Profile extends Component {
  state = {
    loaded: false,
  };
  componentDidMount = async () => {
    try {
      let email = await AsyncStorage.getItem('current_email');
      let json = await AsyncStorage.getItem(email);
      if (json !== null) {
        // We have data!!
        console.log(JSON.parse(json));
        details = JSON.parse(json);
        email_address = email;
      }
    } catch (e) {
      console.log(e);
    }
    this.setState({loaded: true});
  };

  render() {
    return (
      <View style={styles.container}>
        <Appbar.Header>
          <Appbar.Content title="Profile" />
        </Appbar.Header>
        {this.state.loaded ? (
          <View style={{padding: 10}}>
            <TextInput
              label="Gender"
              value={details['gender']}
              mode="outlined"
              editable={false}
            />
            <TextInput
              style={{paddingTop: 10}}
              label="Birth Date"
              value={details['birth_date']}
              mode="outlined"
              editable={false}
            />
            <TextInput
              style={{paddingTop: 10}}
              label="Email"
              value={email_address}
              mode="outlined"
              editable={false}
            />
            <TextInput
              style={{paddingTop: 10}}
              label="Name"
              value={details['name']}
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
