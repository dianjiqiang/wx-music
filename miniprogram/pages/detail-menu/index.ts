// pages/detail-menu/index.ts
import {getSongMenuList, getSongMenuTag} from '../../servers/index'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: '',
    songMenus: [] as any
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    this.changeAllMenuList()
  },
  async changeAllMenuList(){
    const res = await getSongMenuTag()
    const tags = res.tags

    // 根据对应的tags获取歌单'
    const allPromise = []
    for(const tag of tags){
      const promise = getSongMenuList(tag.name)
      allPromise.push(promise)
    }
    Promise.all(allPromise).then(res => {
      this.setData({songMenus: res})
    })
  }
})