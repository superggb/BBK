Page({

  /**
   * 页面的初始数据
   */
  data: {
    detailAll:null,
    statement:'',
    contact: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let ob = JSON.parse(options.jsonstr)
    var that = this
    console.log(options)
    that.setData({
      detailAll:ob
    })
    if(ob.state==2) that.setData({statement:'已完成'})
    else if(ob.state==1) that.setData({statement:'等待送货'})
    else that.setData({ statement: '等待接单' })
    let skey = wx.getStorageSync("skey")
    if(skey==that.data.detailAll.pid) that.setData({contact:that.data.detailAll.aphone})
    else that.setData({contact:that.data.detailAll.pphone})
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

  onclick: function () {
    var MD5 = require('../../utils/md5.min.js')
    var that = this
    let orderid = that.data.detailAll.id
    let userid = wx.getStorageSync("skey")
    console.log(userid + 'bbknb')
    let mdid = MD5(userid+'/bbknb')
    console.log(mdid)

    wx.showModal({
      title: '确认提醒',
      content: '确定已经收到货物？',
      success:function(res){
        if(res.confirm){
          console.log("ok")
          wx.request({
            url: 'http://221h58z433.imwork.net/order/confirm?id='+orderid+"&confirmkey="+mdid,
            success:function(res){
              console.log(res.data)
              wx.navigateBack({

              })

            }
          })
        }
        else {
          console.log("cancel")
        }
      }
    })
  },
  makePhone: function () {
    wx.showModal({
      title: "提示",
      content: "你将使用运营商拨打电话"+this.data.contact,
      success: function (res) {
        if (res.confirm) {
          wx.makePhoneCall({
            phoneNumber: this.data.contact
          })
        }
      }
    })
  }
})