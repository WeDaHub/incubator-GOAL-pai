const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [
    ],
    isLoading: true
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getAnniversary();
  },

  toAdd: function() {
    wx.navigateTo({
      url: '../addAnniversary/index',
    })
  },
  handleSelect(e) {
    this.setData({
      radioValue: parseInt(e.currentTarget.dataset.radio)
    })
  },

  async getAnniversary() {
    wx.showLoading({
      title: '添加中....',
    })
    try {
      const { result } = await wx.cloud.callFunction({
        name: 'anniversary',
        data: {
          openid: app.globalData.openid
        }
      })
      this.setData({
        list: this.formatList(result.data),
        isLoading: false
      })
    } catch (error) {
      console.error('[云函数] [anniversaryList] 获取订阅消息模板 调用失败：', error)
    }
    wx.hideLoading({})
  },
  formatList(data) {
    for(let list of data) {
      list.time = this.getBeforeDate(list.date);
    }

    return data;
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
getBeforeDate: function (n){
  var now = new Date();
  var aftertime = new Date(n);
  var year = now.getFullYear();
  var mon= now.getMonth()+1;
  var day= now.getDate();
  var year_after = aftertime.getFullYear();
  var mon_after = aftertime.getMonth()+1;
  var day_after = aftertime.getDate();
  var chs = 0;
  //获取当月的天数
  function DayNumOfMonth(Year,Month)
  {
      return 32 - new Date(Year,Month-1,32).getDate();
  }
  if(aftertime.getTime() - now.getTime() < 0){
      var temp1 = day_after;
      var temp2 = mon_after;
      var temp3 = year_after;
      day_after = day;
      mon_after = mon;
      year_after = year;
      day = temp1;
      mon = temp2;
      year = temp3;
  }
  if(year == year_after){//不跨年
      if(mon == mon_after){//不跨年不跨月
          chs += day_after-day;
      }else{//不跨年跨月
          chs += DayNumOfMonth(year,mon)- day+1;//加上第一个不满的
          for(var i=1;i< mon_after-mon;i++){
              chs += DayNumOfMonth(year,mon+i);
          }
          chs += day_after-1;//加上
      }
  }else{//存在跨年
      chs += DayNumOfMonth(year,mon)- day+1;//加上开始年份不满的一个月
      for(var m=1;m<12-mon;m++){
          chs += DayNumOfMonth(year,mon+m);
      }
      for(var j=1;j < year_after-year;j++){
          if((year+j)%400 == 0 || (year+j)%4 == 0 && (year+j)%100 != 0){
              chs += 366;
          }else{
              chs += 365;
          }
      }
      for(var n=1;n <= mon_after;n++){
          chs += DayNumOfMonth(year_after,n);
      }
      chs += day_after-1;
  }
  if(aftertime.getTime() - now.getTime() < 0){
      return -chs;
  }else{
       return chs;
  }
}
})