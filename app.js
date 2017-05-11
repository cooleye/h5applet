var wilddog = require('lib/wilddog.js');

var config = {
    syncURL: 'https://h5course.wilddogio.com',
    authDomain: 'h5course.wilddog.com'
}




//app.js
App({
  onLaunch: function () {
    //调用API从本地缓存中获取数据
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

  
    wilddog.initializeApp(config)
    this.courseRef = wilddog.sync().ref('Courses').orderByPriority()

    this.menuRef = wilddog.sync().ref('menudata').orderByPriority()
    

    this.swipeRef = wilddog.sync().ref('swiperData').orderByPriority()


    var self = this;
    //或者使用Promise
    wilddog.auth().signInWeapp()
    .then(function(user){
      console.log(user)
      self.userInfo = user;
    })
    .catch(function(err){
      console.log(err)
    })

  },
  getUserInfo:function(cb){
    var that = this
    if(this.globalData.userInfo){
      typeof cb == "function" && cb(this.globalData.userInfo)
    }else{
      //调用登录接口
      wx.login({
        success: function () {
          wx.getUserInfo({
            success: function (res) {
              that.globalData.userInfo = res.userInfo
              typeof cb == "function" && cb(that.globalData.userInfo)
            }
          })
        }
      })
    }
  },
  globalData:{
    userInfo:null
  }
})