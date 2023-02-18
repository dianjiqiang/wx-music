// components/song-list/song-list.ts
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    playSongList:{
      type: Array,
      value: []
    },
    isHidden: {
      type: Boolean,
      value: true
    },
    picUrl:{
      type: String,
      value: ''
    },
    playId:{
      type: String,
      value: ''
    }
  },
  observers:{
    'playSongList, playId':function(data: any, playId: string){
      data.forEach((item: any, index: number) => {
        if (String(item.id) === playId) {
          getApp().globalData.activePlayIndex = index
          // @ts-ignore
          this.setData({
            activeIndex: index
          })
        }
      })
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    activeIndex: 0
  },

  /**
   * 组件的方法列表
   */
  methods: {
    changeActiveIndex(event: any){
      getApp().globalData.activePlayIndex = event.mark.index
      // @ts-ignore
      this.setData({
        activeIndex: event.mark.index
      })
      // @ts-ignore
      this.triggerEvent('handleChangePlayer', event.mark.index);
    }
  },
})
