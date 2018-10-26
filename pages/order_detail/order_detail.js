// pages/order_detail/order_detail.js

Page({

  /**
   * 页面的初始数据
   */
  data: {
    order_item_data: {},
    skey: '',
    phone: '',
    message_content: [
      '对不起，接单失败。',
      '对不起，您的信用度不够，无法接单。',
      '对不起，您的接单数目已经达到上限。',
      '对不起，该订单已被别人接收',
      '恭喜您，接单成功。'
    ]
  },

  /** 
   * 点击确认接受订单后触发的事件 
   */
  confirmTask: function() {
    var that = this;
    wx.showModal({
      title: '提示',
      content: '接受订单后无法取消，确定接受订单吗',
      showCancel: true,
      success: function (res) {
        if (res.confirm) {
          that.acceptTask();
        }
      }
    });
  },

  /** 
   * 点击确认接受后触发的事件 
   */
  acceptTask: function() {
    var that = this;
    //console.log("phone:");
    //console.log(wx.getStorageSync('phone'));
    wx.request({
      url: 'https://www.superggb.cn/bbkServer/order/accept?auid=' + this.data.skey + '&id=' + this.data.order_item_data.id + '&aphone=' + this.data.phone,
      header: {
        'content-type': 'application/json'  
      },
      success(res) {
        console.log(res.data);
        switch(res.data){
          case 0:
            that.showMessageBox(0);
            break;
          case -1:
            that.showMessageBox(1);
            break;
          case -2:
            that.showMessageBox(2);
            break;
          case -3:
            that.showMessageBox(3);
            break;
          case 1:
            that.showMessageBox(4);
            break;
        }
      }
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.data.skey = wx.getStorageSync('skey');
    this.data.phone = wx.getStorageSync('phone');
    let order_item = JSON.parse(options.order_item);
    console.log(order_item);
    this.setData({
      order_item_data: order_item
    });
  },

  showMessageBox: function(index) {
    wx.showModal({
      title: '提示',
      content: this.data.message_content[index],
      showCancel: false,
      success: function(res) {
        if (res.confirm) {
          wx.switchTab({
            url: '/pages/order_list/order_list',
          });
        }
      }
    });
  }
})