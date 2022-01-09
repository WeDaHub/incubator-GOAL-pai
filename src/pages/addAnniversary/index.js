const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    date: '',
    title: '',
    errorMsg: ''
  },

  bindDateChange: function(e) {
    this.setData({
      date: e.detail.value
    })
  },
  checkForm() {
    const {title, date} = this.data;
    if (!title) {
      this.setData({
        errorMsg: '请输入纪念日名称'
      })
      return false;
    }
    if (!date) {
      this.setData({
        errorMsg: '请选择纪念日日期'
      })
      return false;
    }
    return true;
  },
  async add() {
    const status = this.checkForm();
    if (!status) {
      wx.showToast({
        title: this.data.errorMsg,
        mask: true,
        icon: 'error'
      })
      return;
    }
    let params = {
      title: this.data.title,
      date: this.data.date,
      openid: app.globalData.openid
    }
    wx.showLoading({
      title: '添加中....',
    })
    try {
      const { result } = await wx.cloud.callFunction({
        name: 'anniversary',
        data: {
          methods: 'POST',
          ...params
        }
      })
    } catch (error) {
      console.error('[云函数] [anniversaryList] 获取订阅消息模板 调用失败：', error)
    }
    wx.hideLoading({})
    wx.navigateTo({
      url: '../anniversary/index',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const date = new Date();
    const Year = date.getFullYear();
    const Mounth = date.getMonth() + 1;
    const Day = date.getDate();
    const str = `${ Year }-${ Mounth >= 10 ? Mounth : '0' + Mounth }-${ Day > 10 ? Day : '0' + Day}`;
    this.setData({
      date: str
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