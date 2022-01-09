const cloud = require('wx-server-sdk')
cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})

exports.main = async (event, context) => {
  console.log(event)
  const res = await cloud.getOpenData({
    list: event.list, // 假设 event.openData.list 是一个 CloudID 字符串列表
  })
  return res.list
}
