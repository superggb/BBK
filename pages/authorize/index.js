// pages/authorize/index.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
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
  bindGetUserInfo: function (e) {
    if (!e.detail.userInfo){
      return;
    }
    wx.setStorageSync('userInfo', e.detail.userInfo)
    this.login();
  },
  login: function () {
    let that = this;
    let token = wx.getStorageSync('token');
    // if (token) {
    //   wx.request({
    //     url: 'https://api.it120.cc/' + app.globalData.subDomain + '/user/check-token',
    //     data: {
    //       token: token
    //     },
    //     success: function (res) {
    //       if (res.data.code != 0) {
    //         wx.removeStorageSync('token')
    //         that.login();
    //       } else {
    //         // 回到原来的地方放
    //         wx.navigateBack();
    //       }
    //     }
    //   })
    //   return;
    // }
    wx.login({
      success: function (res) {
        var code = res.code;//发送给服务器的code
        // console.log(res.code);
        wx.getUserInfo({
          success: function (res) {
            var userNick = res.userInfo.nickName;//用户昵称
            var avataUrl = res.userInfo.avatarUrl;//用户头像地址
            //console.log(userNick);
            if (code) {
              wx.request({
                url: 'http://221h58z433.imwork.net/login',//服务器的地址
                method: 'POST', 
                data: {
                  code: code,
                  name: userNick,
                  avatar: avataUrl
                },
                header: {
                  'content-type': 'application/x-www-form-urlencoded'
                },
                success: function (res) {
                  console.log(res.data);
                  wx.setStorageSync('skey', res.data.skey);//将获取skey写入本地缓存
                  wx.setStorageSync('result', res.data.result);
                  wx.setStorageSync('phone', res.data.phone);//手机号
                  // console.log(wx.getStorageSync('skey'));
                  wx.navigateBack();
                }
              })
            }
            else {
              console.log("获取用户登录态失败！");
            }
          }
        })
      },
      fail: function (error) {
        console.log('login failed ' + error);
      }
    })
  },
  // registerUser: function () {
  //   var that = this;
  //   wx.login({
  //     success: function (res) {
  //       var code = res.code; // 微信登录接口返回的 code 参数，下面注册接口需要用到
  //       wx.getUserInfo({
  //         success: function (res) {
  //           var iv = res.iv;
  //           var encryptedData = res.encryptedData;
  //           // 下面开始调用注册接口
  //           wx.request({
  //             url: 'https://api.it120.cc/' + app.globalData.subDomain + '/user/wxapp/register/complex',
  //             data: { code: code, encryptedData: encryptedData, iv: iv }, // 设置请求的 参数
  //             success: (res) => {
  //               wx.hideLoading();
  //               that.login();
  //             }
  //           })
  //         }
  //       })
  //     }
  //   })
  // }
})