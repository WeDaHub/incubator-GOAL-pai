
const cloud = require('wx-server-sdk')
cloud.init({
  // API 调用都保持和云函数当前所在环境一致
  env: cloud.DYNAMIC_CURRENT_ENV
})
const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  console.log(event, context)
  // collection 上的 get 方法会返回一个 Promise，因此云函数会在数据库异步取完数据后返回结果
  if (event.methods === 'POST') {
    return db.collection('anniversaryList').add({
      data: {
        due: new Date(),
        date: event.date,
        title: event.title,
        openid: event.openid
      }
    }).then(res => {
      return res;
    })
  } else {
    return db.collection('anniversaryList').where({
      openid: event.openid
    }).get()
  }
}

