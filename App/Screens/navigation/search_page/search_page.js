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

import api_call from '../../../api_call';

export default class SearchPage extends Component {
  state = {
    query: '',
    videos: [],
    selectedVideo: null,
  };

  onChangeSearch = (text) => {
    this.setState({query: text});
  };

  searchYT = async () => {
    const response = await api_call.get('./search', {
      params: {
        q: this.state.query,
      },
    });
    this.setState({
      videos: response.data.items,
    });
    console.log(this.state.videos);
  };

  render() {
    return (
      <View style={styles.container}>
        <Appbar.Header>
          <Appbar.Content title="Search Page" />
        </Appbar.Header>
        <Searchbar
          placeholder="Search"
          onChangeText={this.onChangeSearch}
          value={this.state.query}
          onBlur={this.searchYT}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
