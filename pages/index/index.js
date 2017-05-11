//index.js
//获取应用实例
var app = getApp()

Page({
  data: {
    autoplay: true,
    interval: 3000,
    duration: 1000,
    indicatorDots: true,
    motto: 'Hello World',
    userInfo: {},
  },
  onLoad: function () {
    
    var that = this

    app.courseRef.on('value',function(snapshot){
        var Courses = snapshot.val();
        that.setData({
            Courses:Courses
        })
    })

   app.swipeRef.on('value',function(snapshot){
        var imgUrls = snapshot.val();
        that.setData({
            imgUrls:imgUrls
        })
   })

   app.menuRef.on('value',function(snapshot){
       var menudata = snapshot.val();
       that.setData({
           menudata:menudata
       })
   })

    //调用应用实例的方法获取全局数据
    app.getUserInfo(function(userInfo){
      //更新数据
      that.setData({
        userInfo:userInfo
      })
    })  

  }


})
