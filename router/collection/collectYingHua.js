const express = require('express');
const collectYingHua = express.Router();
const { getDB } = require('../../utils/connectDB');
const axios = require('axios');

//影视类型代码
const typelist = [4, 30, 31, 32, 33];


collectYingHua.get('/collect/yinghua', async function (req, res) {

    const time = req.query.isAll ? '' : req.query.time ? req.query.time : 24;
    const collection = getDB().collection('yinghua');

    for (let i = 0; i < typelist.length; i++) {
        try {
            const getPage = await axios.get(`https://m3u8.apiyhzy.com/api.php/provide/vod/?ac=list&ac=videolist&t=${typelist[i]}&pg=&h=${time}&ids=&wd=`);
            const pagecount = getPage.data.pagecount;
            console.log("正在采集第" + i + "个类型，共" + pagecount + "页");

            for (let page = 1; page <= pagecount; page++) {
                try {
                    console.log("正在采集第" + page + "页");
                    const getList = await axios.get(`https://m3u8.apiyhzy.com/api.php/provide/vod/?ac=list&ac=videolist&t=${typelist[i]}&pg=${page}&h=${time}&ids=&wd=`);
                    const list = getList.data.list;
                    for (let index = 0; index < list.length; index++) {
                        const ele = list[index];
                        //查找mongodb中vod_name是否存在,如果已经存在并且相同，则删除
                        await collection.deleteOne({ vod_id: ele.vod_id });
                        await collection.insertOne({
                            vod_id: ele.vod_id,
                            vod_name: ele.vod_name,
                            vod_pic: ele.vod_pic,
                            //先以#切割，在以$切割
                            vod_play_url: ele.vod_play_url.split('#').map(item => item.split('$')),
                        });
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


module.exports = collectYingHua;