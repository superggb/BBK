

Page({
  data: {
    count: 0,
    showTopTips: false,
    message: '',


    countries: ["普通邮寄", "快递包裹", "EMS快递", "大型包裹"],
    countryIndex: 0,


    isAgree: false,
    success: false,
    orderm : '',
    cuid:''
  },

  return_home: function (e) {
    wx.switchTab({
      url: '/pages/order_list/order_list',
    });

  },

  onLoad:function(options){
    let ob = JSON.parse(options.jsonstr)
    var that = this
    console.log(options)
    that.setData({
      orderm: ob
    })
    console.log(that.data.orderm)
    // let skey = wx.getStorageSync("skey")
    // if (skey == that.data.orderm.puid) {
    //   that.setData({ cuid: that.data.orderm.auid })
    // }
    // else that.setData({ cuid: that.data.orderm.puid })
  },

  

  Handlemessage: function (e) {
    this.setData({
      count: e.detail.value.length,
      message: e.detail.value
    })
  },

  



  bindCountryCodeChange: function (e) {
    console.log('picker country code 发生选择改变，携带值为', e.detail.value);

    this.setData({
      countryCodeIndex: e.detail.value
    })
  },
  bindCountryChange: function (e) {
    console.log('picker country 发生选择改变，携带值为', e.detail.value);

    this.setData({
      countryIndex: e.detail.value
    })
  },
  bindAccountChange: function (e) {
    console.log('picker account 发生选择改变，携带值为', e.detail.value);

    this.setData({
      accountIndex: e.detail.value
    })
  },
  bindAgreeChange: function (e) {
    this.setData({
      isAgree: !!e.detail.value.length
    });
  },

  showTopTips: function () {
    var that = this;
    if (this.data.message == '') {
      this.setData({
        showTopTips: true
      });
      return
    } else {
      var that = this;
      var reason=this.data.message
      var uid = wx.getStorageSync("skey")
      var id = this.data.orderm.id
      

      wx.request({
        url: 'https://www.superggb.cn/bbkServer/order/complain?oid='+id+'&uid='+uid+'&reason='+reason,
        method: 'GET',
        success: function (res) {
          console.log(res.data);
          if (res.data == '1') {
            wx.showToast({
              title: '提交成功',
              icon: 'loading',
              duration: 2000
            });
            that.setData({
              success: true
            });
          } else if (res.data == '0') {
            wx.showToast({
              title: '提交失败',
              icon: 'loading',
              duration: 2000
            });
            that.setData({
              success: false
            })
          } 
        }
      })
    }
  },

});