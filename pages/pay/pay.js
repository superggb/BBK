// pages/pay/pay.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cost : 0,
    orderid : 0,
    mdid : ''


  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    this.setData({
      cost : options.cost,
      orderid : options.orderid,
      mdid : options.mdid
    })

  },

  onclick:function(){
    let that = this
    wx.request({
      url: 'https://www.superggb.cn/bbkServer/order/confirm?id='+that.data.orderid+"&confirmkey="+that.data.mdid,
      success:function(res){
        console.log(res.data)
        wx.showModal({
          title: '提示',
          content: '支付成功',
          showCancel: false,
          success: function (res) {
            if (res.confirm) {
              wx.switchTab({
                url: '/pages/djorder/index',
              });
            }
          }
        });

      }
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