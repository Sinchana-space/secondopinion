// server.js
const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');
const { Server } = require('socket.io');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

// In-memory "database" for now
const chatHistory = {}; // { 'roomId': [messages] }

app.prepare().then(() => {
  const httpServer = createServer((req, res) => {
    const parsedUrl = parse(req.url, true);
    handle(req, res, parsedUrl);
  });

  const io = new Server(httpServer);

  io.on('connection', (socket) => {
    console.log('A user connected:', socket.id);

    socket.on('join-room', (roomId) => {
      socket.join(roomId);
      // Send existing chat history to the new user
      socket.emit('chat-history', chatHistory[roomId] || []);
    });

    socket.on('send-message', (data) => {
      const { roomId, message } = data;
      if (!chatHistory[roomId]) {
        chatHistory[roomId] = [];
      }
      chatHistory[roomId].push(message);
      // Broadcast the message to everyone in the room
      io.to(roomId).emit('receive-message', message);
    });

    socket.on('disconnect', () => {
      console.log('User disconnected:', socket.id);
    });
  });
  

  const port = process.env.PORT || 3000;
  httpServer.listen(port, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
});