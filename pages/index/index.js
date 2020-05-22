//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    hour: {
      number0: 12,
      number1: 12,
      isFlip: true
    },
    min: {
      number0: 21,
      number1: 21,
      isFlip: true
    }
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  //获取时间
  getCurrentTime: function () {
    const date = new Date();
    const hour = date.getHours();
    const min = date.getMinutes();
    return { 
      hour: hour > 9 ? hour : '0' + hour, 
      min: min > 9 ? min : '0' + min, 
    };
  },
  timeListener: function () {
    const { hour, min } = this.getCurrentTime();
    this.setData({
      hour: {
        number0: this.data.hour.number0,
        number1: hour,
        isFlip: hour !== this.data.hour.number0
      },
      min: {
        number0: this.data.min.number0,
        number1: min,
        isFlip: min !== this.data.min.number0
      }
    })
    setTimeout(() => {
      this.setData({
        hour: {
          number0: hour,
          number1: hour,
          isFlip: false
        },
        min: {
          number0: min,
          number1: min,
          isFlip: false
        }
      })
      setTimeout(() => this.timeListener(), 800);
    }, 500)
  },
  onLoad: function () {
    const { hour, min } = this.getCurrentTime();
    this.setData({
      hour: {
        number0: hour,
        number1: hour,
        isFlip: false
      },
      min: {
        number0: min,
        number1: min,
        isFlip: false
      }
    })
    this.timeListener();
  },
  onShareAppMessage: function() {
    return {
      title: 'onlyClock | 翻页时钟',
      path: '/pages/index/index',
    }
  }
})
