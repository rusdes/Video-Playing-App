import * as React from 'react';
import {BottomNavigation, Text} from 'react-native-paper';

import Profile from './profile/profile';
import SearchPage from './search_page/search_page';
import Favourites from './favourites/favourites';
import {Children} from 'react';

export default function Nav() {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {key: 'Profile', title: 'Profile', icon: 'account-box'},
    {key: 'SearchPage', title: 'Search Page', icon: 'search-web'},
    {key: 'Favourites', title: 'Favourites', icon: 'heart'},
  ]);

  const renderScene = BottomNavigation.SceneMap({
    Profile: Profile,
    SearchPage: SearchPage,
    Favourites: Favourites,
  });

  return (
    <BottomNavigation
      navigationState={{index, routes}}
      onIndexChange={setIndex}
      renderScene={renderScene}
    />
  );
}
