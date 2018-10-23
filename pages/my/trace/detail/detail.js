var Base64 = require('../../../../utils/base64.js').Base64;
var MD5 = require('../../../../utils/md5.min.js');
var util = require('../../../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    detailList: {},
    expressName: "",
    expressOrder: "",
    expressCode: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '加载中',
    })


    let data = options;
    this.setData({
      expressName: data.ShipperName,
      expressOrder: data.LogisticCode,
      expressCode: data.ShipperCode
    });
    this.getExpressDetail(data);
    wx.setNavigationBarTitle({
      title: '物流详情'
    })
    
  },

  getExpressDetail: function (data) {
    var self = this;
    let appKey = "faab5cd5-084b-4922-b54f-e8884044ab75";//更换成你申请的appkey
    let requestData = "{\"ShipperCode\":\"" + data.ShipperCode + "\",\"LogisticCode\":\"" + data.LogisticCode + "\"}";
    let eBusinessID = "1386025";//更换成你申请的商户id
    let requestType = "1002";
    let dataSign = Base64.encode(MD5(requestData + appKey));
    console.log(dataSign);
    console.log(requestData);

    wx.request({
      // url: 'http://api.kdniao.cc/Ebusiness/EbusinessOrderHandle.aspx',
      // data: {
      //   RequestData: requestData,
      //   EBusinessID: eBusinessID,
      //   RequestType: requestType,
      //   DataSign: dataSign,
      //   DataType: "2"
      // },
      // method: 'POST',
      url: 'http://221h58z433.imwork.net/traceOrder?' + 'code=' + data.ShipperCode + '&num=' + data.LogisticCode,
      method:'GET',
      header: {
        'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
      },
      success: function (res) {
        wx.hideLoading()
        let resData = res.data;
        console.info('resData2:'+resData);

        resData.Traces = resData.Traces.sort(function (a, b) {
          let atime = Date.parse(a.AcceptTime);
          let btime = Date.parse(b.AcceptTime);
          return btime - atime;
        });

        resData.LogoSrc = util.mapLogo(resData.ShipperCode);
        console.log(resData.LogoSrc);

        self.setData({
          detailList: resData
        })

        wx.setStorage({
          key: resData.LogisticCode,
          data: resData.Traces.shift()
        })

      },
      fail: function () {
        // fail
      },
      complete: function () {
        // complete
      }
    })
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
    setTimeout(function () {
      wx.hideLoading()
    }, 100);
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
    let self = this;
    let data = {
      ShipperName: self.data.expressName,
      LogisticCode: self.data.expressOrder,
      ShipperCode: self.data.expressCode
    }
    this.getExpressDetail(data)
    wx.showLoading({
      title: "正在加载中"
    })
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
    
  }
})