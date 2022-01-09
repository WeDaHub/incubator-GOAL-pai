
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
  switch(event.action) {
    case 'count':
      return await getCount(event);
      break;
    default:
      return await getData(event);
  }
}
const getCount = async function(event) {
  console.log(event, 'mmmm')
  return db.collection('planList').where({
    openid: event.openid,
  }).get().then(res => {
    const { data } = res;
      console.log(res, 'llllll')
      let doneCount = data.filter(v => v.count > 21).length;
      let unDoneCount = data.filter(v => v.count < 21).length;
      return {
        doneCount,
        unDoneCount
      }
  })
}
const getData = async function(event) {
  return db.collection('planList').where({
    openid: event.openid,
    isdone: event.isdone
  }).get()
}

