var coolsite360 = require('./coolsite/index.js');
App({
  coolsite360: coolsite360,
  onLaunch: function(){
    //云开发环境初始化
    wx.cloud.init({
      env:"cloud1-4gffifhu6dad0cf5"
    })
  }
})