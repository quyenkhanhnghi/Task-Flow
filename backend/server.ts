import fs from 'fs';
import { createServer } from 'http';
import { Server } from 'socket.io';
import mongoose from 'mongoose';
import boardModel from './model/boardModel';
import { app } from './app';
import dotenv from 'dotenv';
import { PutObjectCommand } from '@aws-sdk/client-s3';
import multer from 'multer';
import s3 from './config/aws.config';
import { upLoadFile, uploadImage } from './controllers/boardControler';

dotenv.config({ path: './config.env' });

const storage = multer.memoryStorage();

const upload = multer({ storage: storage });

// upload files to s3 bucket
app.post('/api/posts', upLoadFile, uploadImage);
// app.post('/api/posts', upload.single('image'), async (req, res) => {
//   console.log(req.body);
//   console.log(req.file);
//   const params = {
//     Bucket: process.env.BUCKET_NAME,
//     Key: req.file?.originalname,
//     Body: req.file?.buffer,
//     ContentType: req.file?.mimetype,
//   };
//   const command = new PutObjectCommand(params);
//   await s3.send(command);
// });
// websocket connection
const httpServer = createServer(app);
const io = new Server(httpServer);

io.on('connection', (socket) => {
  console.log('connect io');
});
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
