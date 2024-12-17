import express from 'express';
import { Server } from 'socket.io';
import { createServer } from 'http';
import cors from 'cors';

const PORT = 3000;

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ['GET', 'POST'],
    credentials: true,
  }
});

app.use(cors());

app.get('/', (req, res) => {
  res.send('hello world');
});

io.on('connection', (socket) => {
  console.log('A new user connected!', socket.id);

  // Handle room joining
  socket.on('join-room', (room) => {
    socket.join(room);
    console.log(`User ${socket.id} joined room: ${room}`);
  });

  socket.on('message', ({ room, message }) => {
    console.log(`Message from room ${room}:`, message);

    // Emit the message to everyone in the specified room
    socket.to(room).emit('receiver-message', { sender: socket.id, message });
  });

  socket.on('disconnect', () => {
    console.log('A user disconnected:', socket.id);
  });
});

server.listen(PORT, () => {
  console.log(`Listening on PORT: ${PORT}`);
});
