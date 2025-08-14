const express = require('express');
const collectFeiFan = express.Router();
const { getDB } = require('../../utils/connectDB');
const axios = require('axios');
const X2JS = require('x2js');
const x2js = new X2JS();

//影视类型代码
const typelist = [4, 29, 30, 31, 32, 33];

collectFeiFan.get('/collect/feifan', async function (req, res) {

    const time = req.query.isAll ? '' : req.query.time ? req.query.time : 24;
    const collection = getDB().collection('feifan');

    for (let i = 0; i < typelist.length; i++) {
        try {
            const getPage = await axios.get(`http://api.ffzyapi.com/api.php/provide/vod/from/ffm3u8/at/xml/?ac=list&ac=videolist&t=${typelist[i]}&pg=&h=${time}&ids=&wd=`);
            const pagecount = x2js.xml2js(getPage.data).rss.list._pagecount;
            console.log("正在采集第" + i + "个类型，共" + pagecount + "页");

            for (let page = 1; page <= pagecount; page++) {
                try {
                    console.log("正在采集第" + page + "页");
                    const getList = await axios.get(`http://api.ffzyapi.com/api.php/provide/vod/from/ffm3u8/at/xml/?ac=list&ac=videolist&t=${typelist[i]}&pg=${page}&h=${time}&ids=&wd=`);
                    const list = x2js.xml2js(getList.data).rss.list.video;
                    for (let index = 0; index < list.length; index++) {
                        const ele = list[index];
                         
                        try {
                            await collection.deleteOne({ vod_id: ele.id });
                            //如果ele.dl.dd是数组，则取第二个
                            if (ele.dl.dd instanceof Array) {
                                ele.dl.dd = ele.dl.dd[1];
                            }
                            await collection.insertOne({
                                vod_id: ele.id,
                                vod_name: ele.name,
                                vod_pic: ele.pic,
                                //先以#切割，在以$切割
                                vod_play_url: ele.dl.dd.__cdata.split('#').map(item => item.split('$')),
                            });
                        } catch (error) {
                            console.log(error);
                        }
                    }
                    //停止1秒
                    await new Promise((resolve) => {
                        setTimeout(() => {
                            resolve();
                        }, 1000);
                    });

                } catch (err) {
                    console.log(err);
                }
            }
            //所有axios发送完毕后，返回成功
        } catch (err) {
            console.log(err);
        }
    }
    console.log("采集完成");
    res.send('success');
});


module.exports = collectFeiFan;