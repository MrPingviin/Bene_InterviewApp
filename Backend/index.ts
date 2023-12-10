import express from 'express';
const app = express();
import cors from 'cors';
import env from 'dotenv';
env.config();
const port = process.env.PORT || 3500;
import route_download from './router/download.ts';
import route_upload from './router/upload.ts';
import route_delete from './router/delete.ts';
import { connectToDatabase } from './logic/connectToDatabase.ts';

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/download', route_download);
app.use('/upload', route_upload);
app.use('/delete', route_delete);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

const server = app.listen(port, async () => {
  try {
    const connection = await connectToDatabase();
    (connection) && console.log(`Server started on port ${port}`);
    (!connection) && (console.log(`Server failed to start on port ${port}`), closeServer());
  } catch (error) {
    console.log("Error => ", error);
    console.log(`Server failed to start on port ${port}`);
    closeServer()
  }
});

function closeServer() {
  server.close();
};

var exports = {};