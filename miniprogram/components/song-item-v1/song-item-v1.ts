// components/song-item-v1/song-item-v1.ts
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    itemData: {
      type: Object,
      value: {}
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    onSongItemTap(){
      // @ts-ignore
      this.triggerEvent('onSongClick', this.properties.itemData.id)
    }
  }
})
