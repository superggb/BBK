// pages/order_detail/order_detail.js

Page({

  /**
   * 页面的初始数据
   */
  data: {
    order_item_data: {}
  },

  /** 
   * 点击接受订单后触发的事件 
   */
  acceptTask: function() {
    console.log("你点击了接受订单");
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let order_item = JSON.parse(options.order_item);
    console.log(order_item);
    this.setData({
      order_item_data: order_item
    });
  }
})