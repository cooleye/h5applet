var app = getApp()

Page({
  data:{},
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
     this.setData({
      cate: options.cate
    })

    var that = this;
    app.courseRef.on('value',function(snapshot,prev){
         var Courses = snapshot.val();
         let listsData = [];
          console.log('cate:' + options.cate)
          for(let i = 0;i < Courses.length;i++){
            let cou = Courses[i];
            if(options.cate == cou.category){
                listsData.push(cou);
            }
          }
          that.setData({
            listsData:listsData
          })
    })
    

    app.menuRef.on('value',function(snapshot,prev){
          var MenuData = snapshot.val();
          for(let i = 0;i < MenuData.length;i++){
            if(options.cate == MenuData[i].title){
              that.setData({
                listImg : MenuData[i].img
              })
            }
          }
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