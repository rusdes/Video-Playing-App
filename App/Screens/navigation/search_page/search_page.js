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

export default class SearchPage extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Appbar.Header>
          <Appbar.Content title="Search Page" />
        </Appbar.Header>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
