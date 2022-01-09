const app  = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    doneCount: 0,
    unDoneCount: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(app.globalData)
    // this.getPlanList()
  },
  onTabItemTap: function() {
    this.getPlanList()
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },
  async getPlanList() {
    wx.showLoading({
      title: '努力加载中....',
    })
    try {
      const { result } = await wx.cloud.callFunction({
        name: 'getPlanList',
        data: {
          action: 'count',
          openid: app.globalData.openid
        },
      })

      const {doneCount, unDoneCount} = result;
      this.setData({
        doneCount,
        unDoneCount,
        isLoading: false
      })
      wx.hideLoading({})
      
    } catch (err) {
      wx.showToast({
        icon: 'none',
        title: '调用失败',
      })
      console.error('[云函数] [openapi] 获取订阅消息模板 调用失败：', err)
    }
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