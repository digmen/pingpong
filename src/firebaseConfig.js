import firebase from 'firebase/compat/app';
import 'firebase/compat/database';

const firebaseConfig = {
  apiKey: 'AIzaSyCBYBJZ5d9fD38VyN5wTJ0ijlxWImWfMVw',
  authDomain: 'pongpong-f4016.firebaseapp.com',
  projectId: 'pongpong-f4016',
  storageBucket: 'pongpong-f4016.appspot.com',
  messagingSenderId: '1015705497120',
  appId: '1:1015705497120:web:0ac94d72c35175fca45645',
  measurementId: 'G-84KSB750BK',
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const db = firebase.database();
export { db };
