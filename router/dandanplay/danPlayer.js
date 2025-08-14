const express = require('express');
const danplayer = express.Router();
const axios = require('axios');
const secret = require('../../utils/getSecret');
const formatDanmaku = require('../../utils/formatDanmaku');


//获取弹幕番剧列表
danplayer.get('/api/v2/search/anime', function (req, res) {

    keyword = encodeURIComponent(req.query.keyword);
    const { appId, timestamp, signature } = secret.getSecret('/api/v2/search/anime');

    axios.get(`https://api.dandanplay.net/api/v2/search/anime?keyword=${keyword}`, {
        //设置响应头
        headers: {
            'X-Appid': appId,
            'X-Timestamp': timestamp,
            'X-Signature': signature
        }
    }).then(response => {
        console.log("我被访问了");
        res.send(response.data);
    }).catch(err => {
        console.log("我被访问了");
        res.send(err);
    });
})

//获取番剧集数
danplayer.get('/api/v2/bangumi', function (req, res) {

    const { appId, timestamp, signature } = secret.getSecret(`/api/v2/bangumi/${req.query.bangumiId}`);
    console.log(req.query.bangumiId);

    axios.get(`https://api.dandanplay.net/api/v2/bangumi/${req.query.bangumiId}`, {
        //设置响应头
        headers: {
            'X-Appid': appId,
            'X-Timestamp': timestamp,
            'X-Signature': signature
        }
    }).then(response => {
        console.log("我被访问了");
        res.send(response.data.bangumi.episodes);
    }).catch(err => {
        console.log("我被访问了");
        res.send(err);
    });
})

//获取弹幕列表
danplayer.get('/api/v2/comment', function (req, res) {
    const { appId, timestamp, signature } = secret.getSecret(`/api/v2/comment/${req.query.episodeId}`)

    axios.get(`https://api.dandanplay.net/api/v2/comment/${req.query.episodeId}?withRelated=true`, {
        //设置响应头
        headers: {
            'X-Appid': appId,
            'X-Timestamp': timestamp,
            'X-Signature': signature
        }
    }).then(response => {
        console.log("我被访问了");
        const data = formatDanmaku.formatDanmaku(response.data);
        res.send(data);
    }).catch(err => {
        res.send(err);
    });
})

module.exports = danplayer;