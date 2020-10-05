import React, {Component} from 'react';
import {
  Appbar,
  TextInput,
  ActivityIndicator,
  Colors,
  Searchbar,
} from 'react-native-paper';
import {StyleSheet, View, FlatList} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import ListItem from './list_view';
import api_call from '../../../api_call';

class SearchPage extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.searchYT();
  }

  state = {
    query: '',
    videos: [],
    selectedVideo: null,
    loading: false,
  };

  onChangeSearch = (text) => {
    this.setState({query: text});
  };

  searchYT = async () => {
    this.setState({
      loading: true,
    });
    const response = await api_call.get('./search', {
      params: {
        q: this.state.query,
      },
    });
    this.setState({
      videos: response.data.items,
      loading: false,
    });
    //console.log(this.state.videos);
  };

  render() {
    const {navigation} = this.props;
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
        {this.state.videos.length === 0 ? (
          <ActivityIndicator
            style={styles.spinner}
            animating={true}
            color={Colors.red800}
            size={'large'}
          />
        ) : this.state.loading === false ? (
          <FlatList
            data={this.state.videos}
            renderItem={({item}) => {
              console.log(item.id.videoId);
              return (
                <ListItem
                  key={item.etag}
                  item1={item}
                  onPress={(x, y) =>
                    navigation.navigate('Video', {
                      Title: x,
                      videoId: y,
                    })
                  }
                />
              );
            }}
            keyExtractor={(item) => item.etag}
          />
        ) : (
          <View style={styles.spinner}>
            <ActivityIndicator
              animating={true}
              color={Colors.red800}
              size={'large'}
            />
          </View>
        )}
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
});

export default function (props) {
  const navigation = useNavigation();

  return <SearchPage {...props} navigation={navigation} />;
}
