// server.js
const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 8080 });

// Хранилище активных комнат
const rooms = new Map();

wss.on('connection', function connection(ws) {
  // Обработка нового подключения

  // Обработка сообщений от клиента
  ws.on('message', function incoming(message) {
    const data = JSON.parse(message);
    const { type, roomCode } = data;

    switch (type) {
      case 'join_room':
        joinRoom(ws, roomCode);
        break;
      case 'create_room':
        createRoom(ws);
        break;
      default:
        console.log('Unknown message type:', type);
    }
  });
});

function joinRoom(ws, roomCode) {
  const room = rooms.get(roomCode);
  if (room) {
    // Обработка присоединения к существующей комнате
    // Дополнительная логика для обработки присоединения игрока к комнате
    console.log('Player joined room:', roomCode);
  } else {
    // Отправляем ошибку, если комната не найдена
    ws.send(JSON.stringify({ type: 'error', message: 'Room not found' }));
  }
}

function createRoom(ws) {
  // Генерация уникального кода комнаты
  const roomCode = generateRandomCode();
  rooms.set(roomCode, { players: [] });

  // Отправка уникального кода клиенту
  ws.send(JSON.stringify({ type: 'room_created', roomCode }));
  console.log('Room created:', roomCode);
}

function generateRandomCode() {
  // Генерация случайного кода из цифр от 0000 до 9999
  return Math.floor(Math.random() * 10000)
    .toString()
    .padStart(4, '0');
}
