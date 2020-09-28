import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';

export default class ListItem extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <TouchableOpacity
        onPress={() =>
          this.props.onPress(
            this.props.item1.snippet.title,
            this.props.item1.id.videoId,
          )
        }>
        <View>
          {this.props.item1.id.kind === 'youtube#video' ? (
            <View style={styles.itemContainer}>
              <Image
                style={[
                  {height: this.props.item1.snippet.thumbnails.default.height},
                  {width: this.props.item1.snippet.thumbnails.default.width},
                  styles.leftElementContainer,
                ]}
                source={{uri: this.props.item1.snippet.thumbnails.default.url}}
              />
              <View style={styles.mainTitleContainer}>
                <Text
                  style={styles.titleStyle}
                  numberOfLines={2}
                  ellipsizeMode="tail">
                  {this.props.item1.snippet.title}
                </Text>
                <Text
                  style={styles.nameStyle}
                  numberOfLines={1}
                  ellipsizeMode="tail">
                  {this.props.item1.snippet.channelTitle}
                </Text>
              </View>
            </View>
          ) : (
            <View style={styles.itemContainer}>
              <View style={styles.channelPhoto}>
                <Image
                  style={[
                    {height: 90},
                    {width: 90},
                    {borderRadius: 45},
                    styles.leftElementContainer,
                  ]}
                  source={{
                    uri: this.props.item1.snippet.thumbnails.default.url,
                  }}
                />
              </View>
              <View style={styles.mainTitleContainer}>
                <Text
                  style={styles.titleStyle}
                  numberOfLines={1}
                  ellipsizeMode="tail">
                  {this.props.item1.snippet.title}
                </Text>
              </View>
            </View>
          )}
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: 'row',
    minHeight: 44,
    height: 100,
    padding: 10,
  },
  leftElementContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  channelPhoto: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 90,
    width: 120,
  },
  rightSectionContainer: {
    marginLeft: 18,
    flexDirection: 'row',
    flex: 20,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: '#515151',
  },
  mainTitleContainer: {
    justifyContent: 'center',
    flexDirection: 'column',
    flex: 1,
    padding: 10,
  },
  titleStyle: {
    fontSize: 16,
  },
  nameStyle: {
    fontSize: 13,
    color: '#737373',
  },
});
