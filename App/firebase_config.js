import * as firebase from 'firebase';
import '@firebase/auth';
import '@firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyCvc57cWMF7AQivRVUC512KV5qCF7R7Fc4',
  authDomain: 'https://yt-player-second.firebaseapp.com',
  databaseURL: 'https://yt-player-second.firebaseio.com',
  projectId: 'yt-player-second',
  storageBucket: 'yt-player-second.appspot.com',
  //messagingSenderId: '551093808020',
  appId: '1:372911636364:android:2fa19eb0642fd2a9d3a0a9',
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export {firebase};
