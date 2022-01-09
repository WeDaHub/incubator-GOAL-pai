const app  = getApp();
Page({
  data: {
    timer: null
  },
  onReady () {
    
    let _this = this;
    wx.getSetting({
      withSubscriptions: true,
      success(res) {
        console.log(res)
        if (!res.authSetting['scope.werun']) {
          wx.authorize({
            scope: 'scope.werun',
            success () {
              // 用户已经同意小程序使用录音功能，后续调用 wx.startRecord 接口不会弹窗询问
              wx.getWeRunData({
                success: function(user) {
                  const {cloudID} = user;
                  console.log(user)
                  _this.getOpenData(cloudID)
                }
              })
            }
          })
        } else {
          wx.getWeRunData({
            success: function(user) {
              const {cloudID} = user;
              console.log(user)
              _this.getOpenData(cloudID)
            }
          })
        }
      }
    });
  },
  async getOpenData(cloudID) {
    console.log(cloudID)
    try {
      const { result } = await wx.cloud.callFunction({
        name: 'getOpenData',
        data: {
          list: [cloudID]
        }
      })
      console.log(result)
    } catch (error) {
      console.error('[云函数] [getOpenData] 获取订阅消息模板 调用失败：', error)
    }
  },
  goToIndex() {
    wx.switchTab({
        url: '/pages/index/index',
    });
  },
  onUnload () {
    clearTimeout(this.timer);
  },
  onLoad: async function (options) {
    await this.onGetOpenid();
    this.timer = setTimeout(() => {
      this.goToIndex();
    }, 1000)
    // this.getUserProfile();
  },
  onGetOpenid: function() {
    // 调用云函数
    wx.cloud.callFunction({
      name: 'login',
      data: {},
      success: res => {
        app.globalData.openid = res.result.openid
        // this.getUserProfile();
      },
      fail: err => {
        console.error('[云函数] [login] 调用失败', err)
      }
    })
  },
  getUserProfile() {
    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认，开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    wx.getUserProfile({
      desc: '展示用户信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        console.log(res)
        app.globalData.avatarUrl = res.userInfo.avatarUrl;
        app.globalData.userInfo = res.userInfo;
        app.globalData.hasUserInfo = true;
      }
    })
  },
  onGetUserInfo: function(e) {
    if (!this.data.logged && e.detail.userInfo) {
      this.setData({
        logged: true,
        avatarUrl: e.detail.userInfo.avatarUrl,
        userInfo: e.detail.userInfo,
        hasUserInfo: true,
      })
    }
  },
})