// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyCBYBJZ5d9fD38VyN5wTJ0ijlxWImWfMVw',
  authDomain: 'pongpong-f4016.firebaseapp.com',
  projectId: 'pongpong-f4016',
  storageBucket: 'pongpong-f4016.appspot.com',
  messagingSenderId: '1015705497120',
  appId: '1:1015705497120:web:0ac94d72c35175fca45645',
  measurementId: 'G-84KSB750BK',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
