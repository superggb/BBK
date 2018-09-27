// pages/my/address/address.js

const api = require('../../../config/config.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    
    address:"暂无地址"
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    let skey = wx.getStorageSync("skey");
    console.log("skey="+skey);
    that.getAddress(skey);
  },


getAddress:function(skey){
  const that = this;
  let url=api.testUrl+"address?id="+skey;
  wx.request({
    url: url,
    success(res) {
      that.setData({
        address: res.data
      })
    }
  })
},

editAddress:function(){
  wx.navigateTo({
    url: 'editaddress/editaddress'
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