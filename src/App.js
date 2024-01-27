import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

const socket = io('wss://pingpong-op6jay04a-digmen.vercel.app');

function App() {
  const [roomCode, setRoomCode] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const joinRoom = () => {
    socket.emit('join_room', { roomCode });
  };

  const createRoom = () => {
    socket.emit('create_room');
  };

  useEffect(() => {
    socket.on('room_created', (data) => {
      setRoomCode(data.roomCode);
    });

    socket.on('error', (error) => {
      setErrorMessage(error.message);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

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
