const { MongoClient } = require('mongodb');

let db = null;

async function connectDB() {

  const uri = process.env.MONGODB_URI || "mongodb://localhost:27017"; // 如果你使用的是远程 MongoDB，请相应更改 URI
  // 创建一个新的 MongoClient
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
  try {
    // 连接到 MongoDB 服务器
    await client.connect();
    console.log("Connected successfully to server");
    db = client.db('videoList');
  } catch (err) {
    console.log(err.stack);
  }
}

function getDB() {
  if (!db) {
    throw new Error('数据库尚未连接，请先调用 connectDB 方法');
  }
  return db;
}

module.exports = {
  connectDB,
  getDB,
};