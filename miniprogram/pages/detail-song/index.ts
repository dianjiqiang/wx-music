// pages/detail-song/index.ts
import { getPlayListDetail } from '../../servers/index'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: '',
    songInfo: {},
    type: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(event: any) {
    if (event.type === 'menu') {
      const id = event.id
      wx.setNavigationBarTitle({
        title: '歌单'
      })
      this.setData({
        type: event.type
      })
      // 根据id请求歌单数据
      this.changeMenuSongInfo(id)
      return
    }
    let title = event.title
    this.setData({
      title
    })
    wx.setNavigationBarTitle({
      title
    })
    // 根据title展示不同的页面
    switch(title){
      case '推荐歌曲':
        title = "recommendSongs"
        break
      case '原创榜':
        title = "originalSongs"
        break
      case '新歌榜':
        title = "newSongs"
        break
      default: 
        title = "soaringSongs"
    }
    const app = getApp()
    this.setData({
      songInfo: app.globalData[title]
    })
  },
  async changeMenuSongInfo(id: string){
    const res = await getPlayListDetail(id)
    this.setData({
      songInfo: res.playlist
    })
  },
  onSongItemTap(event: any){
    const globalId = [] as any
    const newRec = [] as any
    getApp().globalData.playSongList.forEach((item: any) => {
      globalId.push(item.id)
    })
    // @ts-ignore
    this.data.songInfo.tracks.forEach((item: any) => {
      if (globalId.includes(item.id)) {
        return
      }else{
        newRec.push(item)
      }
    })
    // @ts-ignore
    getApp().globalData.playSongList.push(...newRec)
    wx.navigateTo({
      // @ts-ignore
      url: '/pages/music-player/index?id=' + event.detail
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})