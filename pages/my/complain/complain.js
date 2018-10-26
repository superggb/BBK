// pages/my/trace/complain/complain.js
Page({
  data: {
    // 页面配置
    winWidth: 0,
    winHeight: 0,
    // tab切换
    currentTab: 0,
    complain_items_data: [],
    currentTab: 0,
    skey: ''
  },

  getComplain: function () {
    const that = this;
    wx.request({
      url: 'https://www.superggb.cn/bbkServer/complainlist?uid=' + that.data.skey,
      header: {
        'content-type': 'application/json'
      },
      success(res) {
        //console.log(res.data)
        that.setData({
          complain_items_data: res.data
        })
      }
    })
  },

  onPullDownRefresh: function () {
    console.log("pull down");
    wx.showNavigationBarLoading();
    this.getComplain();
    wx.stopPullDownRefresh();
    wx.hideNavigationBarLoading();
  },

  onLoad: function () {
    var that = this;
    this.data.skey = wx.getStorageSync("skey");
    /**
     * 获取系统信息
     */
    wx.getSystemInfo({

      success: function (res) {
        that.setData({
          winWidth: res.windowWidth,
          winHeight: res.windowHeight
        });
      }

    });
  },

  onShow: function () {
    this.getComplain();
  },

  /**
   * 滑动切换tab
   */
  bindChange: function (e) {
    var that = this;
    that.setData({ currentTab: e.detail.current });
  },

  /**
   * 点击tab切换
   */
  swichNav: function (e) {
    var that = this;
    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current
      })
    }
  }  
})
