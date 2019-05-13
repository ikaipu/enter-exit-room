import * as firebase from 'firebase';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyAOO9uUKIBSIdHWJP_utlfjYIWo2Es_tKA',
  authDomain: 'enter-exit-room.firebaseapp.com',
  databaseURL: 'https://enter-exit-room.firebaseio.com',
  projectId: 'enter-exit-room',
  storageBucket: 'enter-exit-room.appspot.com',
  messagingSenderId: '755850249380',
  appId: '1:755850249380:web:b83e4ed05126e540',
};

firebase.initializeApp(firebaseConfig);

const firestore = firebase.firestore();

export { firestore };
