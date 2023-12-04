import express from 'express';
const app = express();
import cors from 'cors';
import env from 'dotenv';
env.config();
const port = process.env.PORT || 3500;
import route_download from './router/download.ts';
import route_upload from './router/upload.ts';

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/download', route_download);
app.use('/upload', route_upload);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, async () => {
  console.log(`Server started on port ${port}`);
});

var exports = {};