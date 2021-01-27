// pages/test/test.js
Page({
  /**
   * 组件的属性列表
   */
  properties: {
  },

  /**
   * 组件的初始数据
   */
  data: {
  },
onLoad: function (options) {
wx.cloud.callFunction({
  name: 'getplayList'
}).then((res) => {
  console.log(res)
})
},
  /**
   * 组件的方法列表
   */
  methods: {
  }
})
