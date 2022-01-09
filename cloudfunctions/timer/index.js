
const cloud = require('wx-server-sdk')
cloud.init({
  // API 调用都保持和云函数当前所在环境一致
  env: cloud.DYNAMIC_CURRENT_ENV
})
const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  console.log(event, context)
  return await db.collection('planList').where({}).update({
    data: {
      isdone: false
    }
  }).then(res => {
    console.log(res)
  })
}

