// pages/my/index.js
Page({
  data: {
    userHeaderUrl: "../../images/useravatar.png",
    optionNamas: ['我的订单', '我的优惠', '快递查询', '收货地址', '手机号码', '关于我们'],
    optionIcons: ['../../images/my/mine_1.png', '../../images/my/mine_2.png', '../../images/my/mine_3.png', '../../images/my/mine_4.png', '../../images/my/mine_5.png', '../../images/my/mine_6.png',]
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数

  },
  onReady: function () {
    // 页面渲染完成

  },
  onShow: function () {
    // 页面显示

  },
  onHide: function () {
    // 页面隐藏

  },
  onUnload: function () {
    // 页面关闭

  },
  makePhone: function () {
    wx.showModal({
      title: "提示",
      content: "你将使用运营商拨打电话1008611",
      success: function (res) {
        if (res.confirm) {
          wx.makePhoneCall({
            phoneNumber: '1008611'
          })
        }
      }
    })
  },
  selectoption: function (event) {
    console.log(event)
    let index = event.currentTarget.dataset.index
    switch (parseInt(index)) {
      case 0:
        this.navigationTo("order", '')
        break;
      case 1:
        this.navigationTo("coupon", '')
        break;
      case 2:
        this.navigationTo("trace", '')
        break;
      case 3:
        this.navigationTo("address", '')
        break;
      case 4:
        this.navigationTo("setting", '')
        break;
      case 5:
        this.navigationTo("about", '')
        break;
      default:
        break;
    }
  },
  navigationTo: function (pageName, params) {
    console.log('跳转' + '../' + pageName + '/' + pageName + params)
    wx.navigateTo({
      url: '../my/' + pageName + '/' + pageName + params,
      success: function (res) {
        // success
      },
      fail: function () {
        // fail
      },
      complete: function () {
        // complete
      }
    })
  }
})