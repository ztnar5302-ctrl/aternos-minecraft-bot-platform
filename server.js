const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

// API Routes
app.use('/api/bots', require('./routes/bots'));
app.use('/api/servers', require('./routes/servers'));
app.use('/api/bedrock', require('./routes/bedrock'));

// Socket.io للتواصل الفوري
io.on('connection', (socket) => {
  console.log('المستخدم متصل:', socket.id);

  socket.on('create_bot', (data) => {
    console.log('طلب إنشاء بوت:', data);
    io.emit('bot_created', data);
  });

  socket.on('disconnect', () => {
    console.log('المستخدم قطع الاتصال:', socket.id);
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`🚀 الخادم يعمل على المنفذ ${PORT}`);
});
