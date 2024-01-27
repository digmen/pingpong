import React, { useState } from 'react';
import { db } from './firebaseConfig'; // Импортируем только db из файла firebaseConfig

function App() {
  const [roomCode, setRoomCode] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Функция для создания новой комнаты и генерации уникального кода
  const createRoom = () => {
    const newRoomCode = generateRandomCode(6); // Генерируем уникальный код комнаты
    db.ref('gameCodes/' + newRoomCode)
      .set(true) // Записываем код комнаты в базу данных
      .then(() => {
        console.log('Комната создана. Код комнаты:', newRoomCode);
        setRoomCode(newRoomCode); // Устанавливаем код комнаты в состояние компонента
      })
      .catch((error) => {
        console.error('Ошибка при создании комнаты:', error);
        setErrorMessage('Ошибка при создании комнаты');
      });
  };

  // Функция для присоединения к комнате
  const joinRoom = () => {
    // Проверяем существование комнаты с данным кодом
    db.ref('gameCodes/' + roomCode).once('value', (snapshot) => {
      if (snapshot.exists()) {
        // Комната существует, переходим к игре
        console.log('Вы присоединились к комнате:', roomCode);
      } else {
        setErrorMessage('Комната с данным кодом не найдена');
      }
    });
  };

  // Функция для генерации случайного кода
  // Функция для генерации случайного кода из цифр до 9999
  const generateRandomCode = () => {
    let code = '';
    for (let i = 0; i < 4; i++) {
      const digit = Math.floor(Math.random() * 10); // Генерируем случайную цифру от 0 до 9
      code += digit.toString(); // Преобразуем цифру в строку и добавляем к коду
    }
    return code;
  };

  return (
    <div>
      <h1>Присоединиться к комнате</h1>
      <input
        type="text"
        placeholder="Введите код комнаты"
        value={roomCode}
        onChange={(e) => setRoomCode(e.target.value)}
      />
      <button onClick={joinRoom}>Присоединиться</button>
      <button onClick={createRoom}>Создать новую комнату</button>
      {errorMessage && <p>{errorMessage}</p>}
    </div>
  );
}

export default App;
