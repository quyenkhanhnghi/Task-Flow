import dotenv from 'dotenv';
import fs from 'fs';
import { createServer } from 'http';
import mongoose from 'mongoose';
import { Server, Socket } from 'socket.io';
import { app } from './app';
import { upLoadFile, uploadImage } from './controllers/boardController';
import boardModel from './model/boardModel';

dotenv.config({ path: './config.env' });

// websocket connection
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
    credentials: true,
  },
});

io.on('connection', (socket: Socket) => {
  console.log('User connected with socket id:', socket.id);

  socket.emit('message', 'Welcome to the server!');

  socket.on('testMessage', (data) => {
    console.log('Received test message:', data);
    io.emit('message', `Message from user ${socket.id}: ${data}`);
  });
  socket.on('dragtask', (data) => {
    console.log(data);
  });
  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

// upload files to s3 bucket
app.post('/api/posts', upLoadFile, uploadImage);
// read Json file
const boards = JSON.parse(
  fs.readFileSync(`${__dirname}/todo-boards.json`, 'utf-8'),
);
mongoose.connect(process.env.MONGO_URL!).then(() => {
  console.log('hi from mongodb');
});

// import data into db
const importData = async () => {
  try {
    await boardModel.create(boards);
    console.log('Data imported');
  } catch (err) {
    console.log(err);
  }
};

if (process.argv[2] === '--import') {
  importData();
}

httpServer.listen(4000, () => {
  console.log('Api listening on port 4000');
});
