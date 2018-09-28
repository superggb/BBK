var app = getApp()
Page({
  data: {
    // 页面配置  
    winWidth: 0,
    winHeight: 0,
    // tab切换 
    currentTab: 0,
    porderDetail: null,
    aorderDetail:null
  },
  onLoad: function () {
    var that = this;
    // 获取系统信息 
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          winWidth: res.windowWidth,
          winHeight: res.windowHeight
        });
      }
    });
    let skey = wx.getStorageSync("skey")
    wx.request({
      url: 'http://221h58z433.imwork.net/order/check?puid='+skey,
      method : 'GET',
      success : function (res){
        console.log(res.data)
        that.setData({
          porderDetail:res.data
        });
      }
      
    })
    wx.request({
      url: 'http://221h58z433.imwork.net/order/check?auid='+skey,
      method: 'GET',
      success: function (res) {
        console.log(res.data)
        that.setData({
          aorderDetail: res.data
        });
      }

    })
  },

  dataRefresh:function(){
    var that = this;
    let skey = wx.getStorageSync("skey")
    wx.request({
      url: 'http://221h58z433.imwork.net/order/check?puid=' + skey,
      method: 'GET',
      success: function (res) {
        console.log(res.data)
        that.setData({
          porderDetail: res.data
        });
      }

    })
    wx.request({
      url: 'http://221h58z433.imwork.net/order/check?auid=' + skey,
      method: 'GET',
      success: function (res) {
        console.log(res.data)
        that.setData({
          aorderDetail: res.data
        });
      }

    })
  },

  

  onPullDownRefresh: function (){
    console.log("pull down");
    wx.showNavigationBarLoading();
    this.dataRefresh();
    wx.stopPullDownRefresh();
    wx.hideNavigationBarLoading();

  },
  // 滑动切换tab 
  bindChange: function (e) {
    var that = this;
    that.setData({ currentTab: e.detail.current });
  },
  // 点击tab切换 
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
