//order_list.js

Page({
  data: {
    order_items_data: [],
    // 页面配置
    winWidth: 0,
    winHeight: 0,
    // tab切换
    currentTab: 0,
    skey: 0
  },
  
  onLoad: function () {
    var that = this;
    //console.log("skey:" + this.data.skey);
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

  jumpToDetail: function(event) {
    //console.log(event.currentTarget.id);
    // console.log(this.data.order_items_data
    //   .filter(obj => obj.id == event.currentTarget.id)[0]);
    var clicked_item = this.data.order_items_data
      .filter(obj => obj.id == event.currentTarget.id)[0];
    wx.navigateTo({
      url: '../order_detail/order_detail?order_item=' + JSON.stringify(clicked_item)
    })
  },

  getOrder: function() {
    const that = this;
    wx.request({
      url: 'https://www.superggb.cn/bbkServer/order/orders',
      header: {
        'content-type': 'application/json'
      },
      success(res) {
        console.log(res.data)
        that.setData({
          order_items_data: res.data
        })
      }
    })
  },

  onPullDownRefresh: function() {
    console.log("pull down");
    wx.showNavigationBarLoading();
    this.getOrder();
    wx.stopPullDownRefresh();
    wx.hideNavigationBarLoading();
  },

  onShow: function() {
    this.setData({
      skey: wx.getStorageSync("skey")
    });
    this.getOrder();
  },

  addorder: function () {
    wx.navigateTo({ 
      url: '../publish/publish'
    })
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
