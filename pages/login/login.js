// pages/login/login.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    text: 'test', //按钮文字
    currentTime: 61, //倒计时
    disabled: false, //按钮是否禁用
    phone: '', //获取到的手机栏中的值
    skey: wx.getStorageInfoSync('skey'), //读取缓存中的skey
    address: '',//宿舍地址
    stunumber: 0,//默认学号
    password: '',//密码
    success: false,
    state: '',
  },
  /**
    * 获取验证码
    */
  return_home: function (e) {
    wx.switchTab({
    url: '/pages/dqorder/index',
  });

  },
  handleInputPhone: function (e) {
    this.setData({
      phone: e.detail.value
    })
  },
  handleStuNumber: function (e) {
    // console.log(e);
    this.setData({
      stunumber: e.detail.value
    })
  },
  handleAddress: function (e) {
    // console.log(e);
    this.setData({
      address: e.detail.value
    })
  },
  handleNewChanges: function (e) {
    // console.log(e);
    this.setData({
      NewChanges: e.detail.value
    })
  },
  handleNewChangesAgain: function (e) {
    // console.log(e);
    this.setData({
      NewChangesAgain: e.detail.value
    })

  },
  doGetCode: function () {
    var that = this;
    var warn = null;
    that.setData({
      disabled: true, //只要点击了按钮就让按钮禁用 （避免正常情况下多次触发定时器事件）
      color: '#ccc',
    })

    var phone = that.data.phone;
    if (phone.trim().length != 11 || !/^1[3|4|5|6|7|8|9]\d{9}$/.test(phone)) {
          warn = "手机号格式不正确";
        } //手机号已被注册提示信息
    if (warn != null) {
      wx.showModal({
        title: '提示',
        content: warn
      })
      that.setData({
        disabled: false,
        color: '#33FF99'
      })
      return;
    }
    if (warn == null) {
      wx.showToast({
        title: '手机号码正确',
        duration: 2000
      });
    }
  },
  submit: function (e) {
    var that = this
    if (this.data.stunumber == 0) {
      wx.showToast({
        title: '请输入学号',
        image: '/images/notion/error.png',
        duration: 2000
      })
      return
    }
    else if (this.data.address == '') {
      wx.showToast({
        title: '请输入宿舍',
        image: '/images/notion/error.png',
        duration: 2000
      })
      return
    } else if (this.data.NewChanges == '') {
      wx.showToast({
        title: '请输入密码',
        image: '/images/notion/error.png',
        duration: 2000
      })
      return
    } else if (this.data.NewChangesAgain != this.data.NewChanges) {
      wx.showToast({
        title: '两次密码不一致',
        image: '/images/notion/error.png',
        duration: 2000
      })
      return
    } else {
      var that = this;
      var skey = wx.getStorageSync('skey');
      var phone = that.data.phone;
      var address = that.data.address;
      var stunumber = that.data.stunumber;
      var password = that.data.NewChanges;
      wx.request({
        url: 'http://221h58z433.imwork.net/userInfo',
        method: "POST",
        data: {
          id: skey,
          phone: phone,
          address: address,
          stunumber: stunumber,
          password: password
        },
        header: {
          "content-type": "application/x-www-form-urlencoded"
        },
        success: function (res) {
          console.log(res.data);
          wx.setStorageSync('firstLogin', res.data);//第一次认证后进入主页面
          if (res.data == '1') {
            wx.showToast({
              title: '验证成功',
              icon: 'loading',
              duration: 2000
            });
            that.setData({
              success: true
            });
          } else if (res.data == '0') {
            wx.showToast({
              title: '学号或密码错误',
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
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
