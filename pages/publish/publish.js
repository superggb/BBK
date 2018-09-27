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
var m = time.getMinutes();
//秒  
var s = time.getSeconds();  

Page({
  data: {
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


    isAgree: false
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
    this.setData({
      showTopTips: true
    });
    setTimeout(function () {
      that.setData({
        showTopTips: false
      });
    }, 3000);
    
  },

});