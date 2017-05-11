// pages/history/history.js
var Courses = require('../../resource/datas/Courses.js');

Page({
  data:{},
  onLoad:function(options){
    
    var his = wx.getStorageSync('watch_history');

    this.setData({
      history:his.data
    })

    var arr = [];
    for(var j = 0;j < his.data.length;j++){
       for(var i = 0; i< Courses.length;i++){
        if(his.data[j].currentClassId == Courses[i].id){
          arr.push(Courses[i]);
        }
    }
    }

    this.setData({
      hisData:arr
    })
  },
  onReady:function(){
    // 页面渲染完成
  },
  onShow:function(){
    // 页面显示
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  }
})