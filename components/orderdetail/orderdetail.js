// components/orderdetail/orderdetail.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

    detail:{
      type:null
    }

  },

  /**
   * 组件的初始数据
   */
  data: {
    state:''

  },

  /**
   * 组件的方法列表
   */
  methods: {
    toDetail:function(){
      let str = JSON.stringify(this.data.detail);
      console.log(this.data.detail)
      wx.navigateTo({
        url: '/pages/orderAll/orderAll?jsonstr='+str
      })
    }
  }

})
