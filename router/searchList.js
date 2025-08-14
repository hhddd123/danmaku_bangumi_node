const express = require('express');
const searchList = express.Router();
const { getDB } = require('../utils/connectDB');
const axios = require('axios');

searchList.get('/searchList', async function (req, res) {
    const db = getDB();
    try {
        const collection = db.collection(req.query.web);
        const keyword = req.query.keyword;
        //根据keyword查询vod_name，返回对象数组
        const result = await collection.find({ vod_name: { $regex: keyword } }).toArray();
        res.send(result);
    } catch (error) {
        console.log(error);
        res.send('error');
    }
});

module.exports = searchList;