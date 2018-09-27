// pages/my/address/editaddress/editaddress.js

const api = require('../../../../config/config.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    address:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },

  Handlefee: function (e) {
    this.setData({
      address: e.detail.value
    })
  },

  editAddress:function(){
    const that = this;

    let url = api.testUrl + "editaddress?id=" + wx.getStorageSync("skey")+"&address="+that.data.address;
    console.log(url);
    wx.request({
      url: url,
      success(res) {
        if(res.data==1){
          wx.showToast({
            title: '修改成功',
            icon: 'succes',
            duration: 1000,
            mask: true
          })
          wx.navigateBack({
            delta: 1
          })}else{
          wx.showToast({
            title: '修改失败',
            icon: 'succes',
            duration: 1000,
            mask: true
          })
          }
      }
    })
  }


  
})