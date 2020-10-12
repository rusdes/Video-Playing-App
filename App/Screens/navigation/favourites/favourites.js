import React, {Component} from 'react';
import {
  Appbar,
  ActivityIndicator,
  Colors,
} from 'react-native-paper';
import {StyleSheet, View, FlatList, Text} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import ListItem from '../search_page/list_view';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

class Favourites extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.getFavs();
  }

  getFavs = async() => {
    let uid = auth().currentUser.uid;
    const usersRef = firestore().collection('users');
    usersRef
      .doc(uid)
      .onSnapshot((doc) => {
        let favouritesList = doc.data()['favourites'];
        console.log("Current favs: ", favouritesList);
        this.set(favouritesList);
      })
  };

  set = (x) => {
    this.setState({ videos: x });
  }

  state = {
    query: '',
    videos: [],
    selectedVideo: null,
    loading: false,
  };

  render() {
    const {navigation} = this.props;
    return (
      <View style={styles.container}>
        <Appbar.Header>
          <Appbar.Content title="Favourites" />
        </Appbar.Header>
        {this.state.videos.length === 0 ? (
          <Text style={styles.text}>
            {"You have no favourite videos"}
          </Text>
        ) : this.state.loading === false ? (
          <FlatList
            data={this.state.videos}
            renderItem={({item}) => {
              console.log(item.id.videoId);
              return (
                <ListItem
                  key={item.etag}
                  item1={item}
                  onPress={(x, y, z) =>
                    navigation.navigate('Video', {
                      Title: x,
                      videoId: y,
                      item: z,
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
  text: {
    flex: 1,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  }
});

export default function (props) {
  const navigation = useNavigation();

  return <Favourites {...props} navigation={navigation} />;
}
