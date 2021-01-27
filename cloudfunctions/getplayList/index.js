// 云函数入口文件
const cloud = require('wx-server-sdk')

//初始化云环境
cloud.init({
  env: 'fujie-8gxfyl876ba6a83a'
})
//引用云数据库，并定义一个常量方便调用
const db = cloud.database()
//引用云数据库的playlist集合，并定义一个常量方法使用
const playlistCollection = db.collection('playlist')
//引用网格请求数据库axios，并定义一个常量方法调用
const axios = require('axios')
//定义接口地址，复制内网穿透后的postman测试通过的接口地址
const URL = 'https://yueyueyinyueji.cn1.utools.club/top/playlist/highqualitybefore=1503639064232&limit=20'

// 云函数入口函数
exports.main = async (event, context) => {
  //使用axios发送异步get请求，并把结果赋值给data变量
  const{
    data
  } = await axios.get(URL)
  console.log('######' + JSON.stringify(data))
  if (data.code >= 1000) {
    console.log(data.msg)
    return 0
  }
  //解析data的result属性，获得请求的歌单结果
  const playlist = data.playlists
  //定义一个新的数组，用于存放处理后的歌单
  const newData = []
  //遍历歌单数组
  for(let i = 0, len = playlist.length; i < len; i++) {
    //给每个歌单信息增加creatTime属性
    let pl = playlist[i]
    //用数据库服务器时间作为歌单的创建时间
    pl.craeteTime = db.serverDate()
    //处理后的歌单记录加入新数组
    newData.push(pl)
  }
  console.log(newData)
  //一次性批量插入数据
  if (newData.length > 0) {
    //异步调用云数据库的新增操作
    await playlistCollection.add({
      data: [...newData]
    }).then((res)=>{
      console.log('插入成功')
    }).catch((err) =>{
      console.log(err)
      console.error('插入失败')
    })
  }
  return newData.length
}