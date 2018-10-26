//获取当前时间戳  
var timestamp = Date.parse(new Date());
timestamp = timestamp / 1000;
console.log("当前时间戳为：" + timestamp);  

var n = timestamp * 1000;
var time = new Date(n);  
//年  
var Y = time.getFullYear();
//月  
var M = (time.getMonth() + 1 < 10 ? '0' + (time.getMonth() + 1) : time.getMonth() + 1);
//日  
var D = time.getDate() < 10 ? '0' + time.getDate() : time.getDate();
//时  
var h = time.getHours();
//分  
var m = time.getMinutes() < 10 ? '0' + time.getMinutes() : time.getMinutes();;
//秒  
var s = time.getSeconds();  

Page({
  data: {
    count: 0,
    showTopTips: false,
    addressS: '',
    addressE: '',
    message: '',
    remark: '',
    fee: 0,
    stime: '',
    etime: '',
    dateS: Y + "-" + M + "-" + D,
    timeS: h + ":" + m,
    dateE: Y + "-" + M + "-" + D,
    timeE: h + ":" + m,


    countries: ["普通邮寄", "快递包裹", "EMS快递", "大型包裹"],
    countryIndex: 0,


    isAgree: false,
    success: false
  },

  return_home: function (e) {
    wx.switchTab({
      url: '/pages/order_list/order_list',
    });

  },

  HandleaddressS: function (e) {
    this.setData({
      addressS: e.detail.value
    })
  },

  HandleaddressE: function (e) {
    this.setData({
      addressE: e.detail.value
    })
  },

  Handlemessage: function (e) {
    this.setData({
      count: e.detail.value.length,
      message: e.detail.value
    })
  },

  Handleremark: function (e) {
    this.setData({
      remark: e.detail.value
    })
  },

  Handlefee: function (e) {
    this.setData({
      fee: e.detail.value
    })
  },

  bindDateStartChange: function (e) {
    this.setData({
      dateS: e.detail.value
    })
  },
  bindTimeStartChange: function (e) {
    this.setData({
      timeS: e.detail.value
    })
  },
  bindDateEndChange: function (e) {
    this.setData({
      dateE: e.detail.value
    })
  },
  bindTimeEndChange: function (e) {
    this.setData({
      timeE: e.detail.value
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
    if (this.data.addressS == '' || this.data.addressE == '' || this.data.message == '' || this.data.fee == 0) {
      this.setData({
        showTopTips: true
      });
      return
    } else {
        var that = this;
        var puid = wx.getStorageSync('skey');
        var pphone = wx.getStorageSync('phone');
        var sendAddress = that.data.addressE;
        var acceptAddress = that.data.addressS;
        var message = that.data.message;
        var remark = that.data.remark;
        var fee = that.data.fee;
        var stime = that.data.dateS + ' ' + that.data.timeS + ':00';
        var etime = that.data.dateE + ' ' + that.data.timeE + ':00';
        var type1 = that.data.countries[that.data.countryIndex]

        wx.request({
          url: 'https://www.superggb.cn/bbkServer/order/publish',
          method: "POST",
          data: {
            puid: puid,
            pphone: pphone,
            type: type1,
            sendAddress: sendAddress,
            acceptAddress: acceptAddress,
            message: message,
            remark: remark,
            fee: parseInt(fee),
            stime: stime,
            etime: etime
          },
          header: {
            "content-type": "application/json"
          },
          success: function (res) {
            console.log(res.data);
            if (res.data == '1') {
              wx.showToast({
                title: '发布成功',
                icon: 'loading',
                duration: 2000
              });
              that.setData({
                success: true
              });
            } else if (res.data == '0') {
              wx.showToast({
                title: '信息填写不全',
                icon: 'loading',
                duration: 2000
              });
              that.setData({
                success: false
              })
            } else if (res.data == '-1') {
              wx.showToast({
                title: '最多同时发3条信息',
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