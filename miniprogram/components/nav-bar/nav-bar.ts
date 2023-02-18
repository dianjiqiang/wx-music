// components/nav-bar/nav-bar.ts
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    leftText: {
      type: String,
      value: '返回'
    },
    centerText: {
      type: String,
      value: '歌曲播放'
    },
    rightText: {
      type: String,
      value: ''
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    statusHeight: 20
  },
  lifetimes:{
    attached(){
      wx.getSystemInfo({
        success: (res => {
          // @ts-ignore
          this.setData({
            statusHeight: res.statusBarHeight
          })
        })
      })
    }
  },
  options: { 
    multipleSlots: true 
  },

  /**
   * 组件的方法列表
   */
  methods: {
    handleReturnClick(){
      wx.navigateBack()
    }
  }
})
