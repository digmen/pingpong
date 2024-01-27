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

// Функция для генерации случайного кода из цифр
function generateRandomCode(length) {
  let code = '';
  for (let i = 0; i < length; i++) {
    code += Math.floor(Math.random() * 10); // Генерируем случайное число от 0 до 9
  }
  return code;
}

// Функция для сохранения кода в базе данных
function saveGameCode(code) {
  db.ref('gameCodes/' + code).set({
    createdAt: firebase.database.ServerValue.TIMESTAMP,
    // Другие данные, которые могут понадобиться для игры
  });
}

// Генерируем и сохраняем новый код игры из цифр
const gameCodes = generateRandomCode(6); // Например, 6 символов
saveGameCode(gameCodes);

export { db, gameCodes };
