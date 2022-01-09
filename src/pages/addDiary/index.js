const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: '',
    content: '',
    errorMsg: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },
  checkForm() {
    const {title, content} = this.data;
    if (!title) {
      this.setData({
        errorMsg: '请输入日记名称'
      })
      return false;
    }
    if (!content) {
      this.setData({
        errorMsg: '请输入日记正文'
      })
      return false;
    }
    return true;
  },
  async add () {
    const status = this.checkForm();
    if (!status) {
      wx.showToast({
        title: this.data.errorMsg,
        mask: true,
        icon: 'error'
      })
      return;
    }
    wx.showLoading({
      title: '添加中....',
    })
    try {
      const { result } = await wx.cloud.callFunction({
        name: 'diary',
        data: {
          title: this.data.title,
          content: this.data.content,
          openid: app.globalData.openid
        }
      })
    } catch (error) {
      console.error('[云函数] [diary] 获取订阅消息模板 调用失败：', error)
    }
    wx.hideLoading({})
    wx.navigateBack({
      delta: 1
    })
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