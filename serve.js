const express = require('express');
const cors = require('cors');
const danPlayer = require('./router/dandanplay/danPlayer');
const { connectDB } = require('./utils/connectDB');
const collectYingHua = require('./router/collection/collectYingHua');
const collectLiangZi = require('./router/collection/collectLiangZi');
const collectUKu = require('./router/collection/collectUKu');
const collectWoLong = require('./router/collection/collectWoLong');
const collectionFeiFan = require('./router/collection/collectFeiFan');
const searchList = require('./router/searchList');
const http = require('http');

const app = express();

(async () => { await connectDB() })();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(collectYingHua);
app.use(collectLiangZi);
app.use(collectUKu);
app.use(collectWoLong);
app.use(collectionFeiFan);
app.use(danPlayer);
app.use(searchList);

const httpServer = http.createServer(app);

httpServer.listen(3000, () => {
  console.log('http is running on http://localhost:3000');
});