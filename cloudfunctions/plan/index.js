
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
    case 'add':
      await add(event);
      break;
    case 'update':
      update(event);
      break;
  }
}

const add  = async function(event) {
  if (event.accept) {
    await  updateAccept(event);
  }
  return db.collection('planList').add({
    data: {
      planName: event.planName,
      iconName: event.iconName,
      openid: event.openid,
      count: 0,
      isdone: false,
      accept: event.accept || false
    }
  }).then(res => {
    return res;
  })
}

const update = async function(event) {
  console.log(event)
  const _ = db.command
  return await db.collection('planList').where({
    // data: {
    _id: event.id,
    openid: event.openid,
    // }
  }).update({
    data: {
      isdone: true,
      count: _.inc(1)
    }
  }).then(res => {
    console.log(res)
  })
}

const updateAccept = async function(event) {
  const _ = db.command
  return await db.collection('planList').where({
    // data: {
    openid: event.openid,
    // }
  }).update({
    data: {
      accept: true,
    }
  }).then(res => {
    console.log(res)
  })
}
