const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const eventChannel = this.getOpenerEventChannel();
    const _this = this;
    eventChannel.on('getParams', function(data) {
      // console.log(data.data)
      _this.signin(data.data)
    })
  },
  async signin(params) {
    wx.showLoading({})
    try {
      const { result } = await wx.cloud.callFunction({
        name: 'plan',
        data: {
          action: 'update',
          id: params._id,
          openid: app.globalData.openid
        }
      })
    } catch (error) {
      wx.showToast({
        icon: 'none',
        title: '调用失败',
      })
    }
    wx.hideLoading({})
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  }
})