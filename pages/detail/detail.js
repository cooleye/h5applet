var sliderWidth = 96; // 需要设置slider的宽度，用于计算中间位置

var app = getApp()

Page({
  data:{
    // Courses : null,
    playing_video:null,
    tabs: ["课程", "详情"],
      activeIndex: 0,
      sliderOffset: 0,
      sliderLeft: 0
  },
  onLoad:function(options){

    // emitter.setMaxListeners(11);
    // 页面初始化 options为页面跳转所带来的参数
    var id = options.id;
    var that = this;
    wx.getSystemInfo({
        success: function(res) {
            that.setData({
                sliderLeft: (res.windowWidth / that.data.tabs.length - sliderWidth) / 2,
                sliderOffset: res.windowWidth / that.data.tabs.length * that.data.activeIndex
            });
        }
    });


    app.courseRef.on('value',function(snapshot,prev){
        
        var Courses = snapshot.val();
      
        for(var i = 0;i < Courses.length;i++){
            
          if(id == Courses[i].id){
            
              that.setData({
                Courses:Courses[i]
              })
              console.log(Courses[i])
          }
        }

         that.setData({
            playing_video:Courses[id].chapters[0].url
          })
    })

      this.setData({
        currentClassId:id
      })

     
  },
  tabClick: function (e) {
      this.setData({
          sliderOffset: e.currentTarget.offsetLeft,
          activeIndex: e.currentTarget.id
      });
  },
  playVideo:function(e){

      var that = this;
      var courseId =this.data.currentClassId
      //获取标签上保存的id
      var chapterId = e.currentTarget.dataset.id;
      var Courses = this.data.Courses;

    
       for(let j = 0;j <  Courses.chapters.length;j++){
            if(chapterId == Courses.chapters[j].id){
                let url = Courses.chapters[j].url;
                // console.log(url)
                this.videoContext = wx.createVideoContext('myVideo')
                // console.log(this.videoContext)
                this.setData({
                  playing_video:url
                })

                setTimeout(function(){
                  that.videoContext.play();
                },100)

                var his = wx.getStorageSync('watch_history')

                if(his){

                  var arr = his.data;
                  arr.push({
                    currentClassId:courseId,
                    chapterId:chapterId
                  })
                  wx.setStorageSync('watch_history',{data:arr})
                }else{
                  var str = {data:[]}
                   wx.setStorageSync('watch_history',str)
                }


            }
        }


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