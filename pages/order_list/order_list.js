//order_list.js

Page({
  data: {
    order_items_data: []
    // order_items_data:[{
    //   'id': 1,
    //   'type': 'MacBook pro',
    //   'sendAddress': '山东大学威海校区六号楼',
    //   'fee': 10,
    //   'ptime': '2018-06-14 18:16:08'
    // }, {
    //     'id': 2,
    //     'type': 'MacBook pro',
    //     'sendAddress': '山东大学威海校区六号楼',
    //     'fee': 10,
    //     'ptime': '2018-06-14 18:16:08'
    //   }]
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
      url: 'http://221h58z433.imwork.net/order/orders',
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
    this.getOrder();
  },

  addorder: function () {
    wx.navigateTo({ 
      url: '../publish/publish'
    })
  }
})
