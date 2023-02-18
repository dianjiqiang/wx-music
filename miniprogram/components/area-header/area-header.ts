// components/area-header/area-header.ts
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    title:{
      type: String,
      value: '标题'
    },
    more:{
      type: String,
      value: '更多'
    },
    isMore:{
      type: Boolean,
      value: true
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
    handleClickMore(){
      // @ts-ignore
      this.triggerEvent('moreClick')
    }
  }
})
