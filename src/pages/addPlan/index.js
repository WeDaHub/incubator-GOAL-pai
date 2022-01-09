const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    iconsList: [
      'book', 'meditation', 'sleep', 'water', 'runing', 'fitness'
    ],
    current: '',
    planName: '',
    errorMsg: '',
    accept: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },
  checkForm() {
    const {planName, current} = this.data;
    if (!planName) {
      this.setData({
        errorMsg: '请输入习惯'
      })
      return false;
    }
    if (!current) {
      this.setData({
        errorMsg: '请选择一个图标'
      })
      return false
    }
    return true;
  },
  async add() {
    const status = this.checkForm();
    // 授权发送通知
    if (!status) {
      wx.showToast({
        title: this.data.errorMsg,
        mask: true,
        icon: 'error'
      })
      return;
    }
    let _this = this;
    wx.requestSubscribeMessage({
      tmplIds: ['kkkk'],
      success: function(k) {
        console.log('kkk')
        _this.setPlanData(true);
      },
      fail: function(m) {
        console.log('llll')
         _this.setPlanData(false);
      }
    })
    
  },
  async setPlanData(accept) {
    wx.showLoading({
      title: '添加中....',
    })
    try {
      const { result } = await wx.cloud.callFunction({
        name: 'plan',
        data: {
          planName: this.data.planName,
          iconName: this.data.current,
          openid: app.globalData.openid,
          action: 'add',
          accept: accept
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
    
  },
  handleTap: function(e) {
    this.setData({
      current: e.currentTarget.dataset.item
    })
  },
  submit: function() {
    console.log('新增成功')
  }
})