
const cloud = require('wx-server-sdk')
cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})
const db = cloud.database()
// 云函数入口函数
exports.main = async (event, context) => {
  const list = await sendList();
  for (let item of list) {
    if (item.count) {
      return await sendMsg(item._id, item.count);
    }
  }
}
const sendList = async function() {
  const $ = db.command.aggregate;
  const result = await db.collection('planList').aggregate().match({
    isdone: false, // 这里等同于where
    accept: true
  }).group({
    _id: '$openid', // 按照openid分组
    count: $.sum(1) // 统计分组中的数据个数
  }).end();
  const {list} = result
  return list;
}
const sendMsg = async function(openid, count) {
    const result = await cloud.openapi.subscribeMessage.send({
      touser: openid,
      page: 'pages/welcome/index', //要跳转到那个小程序页面
      data: {
        thing1: {
          value: '小懒猪今天又是新的一天呢'
        },
        thing4: {
          value: '你还有' + count + '个计划没有完成哦'
        },
        thing3: {
          value: '努力做一个超棒的小朋友哈'
        }
      },
      templateId: ''
    })
    return result
}



