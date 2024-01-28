import React, { useState, useEffect } from 'react';
import { db } from './firebaseConfig';

function App() {
  const [roomCode, setRoomCode] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (roomCode) {
      // Подписываемся на обновления сообщений в текущей комнате
      const messagesRef = db.ref('messages/' + roomCode);
      messagesRef.on('value', (snapshot) => {
        const messagesData = snapshot.val();
        if (messagesData) {
          const messagesList = Object.values(messagesData);
          setMessages(messagesList);
        } else {
          setMessages([]);
        }
      });
      return () => {
        // Отписываемся от обновлений при размонтировании компонента
        messagesRef.off();
      };
    }
  }, [roomCode]);

  const generateRoomCode = () => {
    const code = Math.floor(1000 + Math.random() * 9000); // Генерация случайного 4-значного кода
    return code.toString(); // Преобразуем число в строку
  };

  const createRoom = () => {
    const newRoomCode = generateRoomCode(); // Генерация нового кода комнаты
    db.ref('gameCodes/' + newRoomCode)
      .set(true) // Создание комнаты в базе данных
      .then(() => {
        console.log('Комната создана. Код комнаты:', newRoomCode);
        setRoomCode(newRoomCode);
      })
      .catch((error) => {
        console.error('Ошибка при создании комнаты:', error);
        setErrorMessage('Ошибка при создании комнаты');
      });
  };

  const joinRoom = () => {
    db.ref('gameCodes/' + roomCode)
      .once('value', (snapshot) => {
        if (snapshot.exists()) {
          console.log('Вы присоединились к комнате:', roomCode);
          setRoomCode(roomCode); // Обновляем состояние roomCode после успешного присоединения
        } else {
          setErrorMessage('Комната с данным кодом не найдена');
        }
      })
      .catch((error) => {
        console.error('Ошибка при присоединении к комнате:', error);
        setErrorMessage('Ошибка при присоединении к комнате');
      });
  };

  const sendMessage = () => {
    if (roomCode && message) {
      db.ref('messages/' + roomCode)
        .push({
          text: message,
          sender: 'Username', // Здесь нужно заменить "Username" на имя пользователя или другой идентификатор отправителя
          timestamp: Date.now(),
        })
        .then(() => {
          console.log('Сообщение отправлено');
          setMessage('');
        })
        .catch((error) => {
          console.error('Ошибка при отправке сообщения:', error);
          setErrorMessage('Ошибка при отправке сообщения');
        });
    } else {
      setErrorMessage(
        'Невозможно отправить пустое сообщение или отсутствует код комнаты'
      );
    }
  };

  return (
    <div className="container">
      <div>
        <div>
          <div className="room">Комната {roomCode}</div>
          <div className="block__room">
            <input
              className="room__input"
              type="text"
              placeholder="Введите код комнаты"
              value={roomCode}
              onChange={(e) => setRoomCode(e.target.value)}
            />
            <div className='btn__create_and_join'>
              <button className='join_btn' onClick={joinRoom}>Присоединиться</button>
              <button className='create_btn' onClick={createRoom}>Создать новую комнату</button>
            </div>
          </div>
          <h2>Сообщения</h2>
        </div>
        <div>
          <div>
            {messages.map((message, index) => (
              <div key={index}>
                <span>Неизвестно:</span> {message.text}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div>
        <span className="error_messege">
          {errorMessage && <p>{errorMessage}</p>}
        </span>
        <div className="send__messege_block">
          <input
            type="text"
            placeholder="Введите сообщение"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button className="send__messege_btn" onClick={sendMessage}>
            Отправить
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
