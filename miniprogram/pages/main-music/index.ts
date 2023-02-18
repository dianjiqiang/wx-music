// pages/main-music/index.ts
import { getMusicBanner, getPlayListDetail, getSongMenuList } from '../../servers/index'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    searchValue: '',
    bannerList: [] as any,
    recommendSongs: [] as any,
    originalSongs: {},
    soaringSongs: {},
    newSongs: {},
    hotMenuList: [] as any,
    recMenuList: [] as any
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    // 轮播图
    this.changeBannerList()
    // 获取 热歌榜(推荐歌曲) 原创榜 飙升榜 新歌榜
    this.changeRecommendSongs()
    this.changeOriginalSongs()
    this.changeSoaringSongs()
    this.changeNewSongs()
    // 获取 热门歌单
    this.changeHotMenuList()
    this.changeRecMenuList()
  },
  async changeBannerList() {
    const bannerList = await getMusicBanner()
    this.setData({
      bannerList: bannerList.banners
    })
  },
  async changeRecommendSongs() {
    const res = await getPlayListDetail('3778678')
    const playlist = res.playlist
    const recommendSongs = playlist.tracks.slice(0, 6)
    const app = getApp()
    app.globalData.recommendSongs = playlist
    this.setData({
      recommendSongs
    })
  },
  async changeOriginalSongs() {
    const res = await getPlayListDetail('2884035')
    const playlist = res.playlist
    const recommendSongs = playlist
    const app = getApp()
    app.globalData.originalSongs = playlist
    this.setData({
      originalSongs: recommendSongs
    })
  },
  async changeSoaringSongs() {
    const res = await getPlayListDetail('19723756')
    const playlist = res.playlist
    const recommendSongs = playlist
    const app = getApp()
    app.globalData.soaringSongs = playlist
    this.setData({
      soaringSongs: recommendSongs
    })
  },
  async changeNewSongs() {
    const res = await getPlayListDetail('3779629')
    const playlist = res.playlist
    const recommendSongs = playlist
    const app = getApp()
    app.globalData.newSongs = playlist
    this.setData({
      newSongs: recommendSongs
    })
  },
  async changeHotMenuList() {
    const data = await getSongMenuList()
    this.setData({
      hotMenuList: data.playlists
    })
  },
  async changeRecMenuList(cat = '华语') {
    const data = await getSongMenuList(cat)
    this.setData({
      recMenuList: data.playlists
    })
  },
  // 聚焦搜索
  onFocusSearch() {
    wx.navigateTo({
      url: '/pages/detail-search/index'
    })
  },
  // 点击更多  
  handleMoreClick(event: any) {
    const message = event.target.dataset.message
    if (message.includes("歌单")) {
      wx.navigateTo({
        url: '/pages/detail-menu/index?title=' + message
      })
    } else {
      wx.navigateTo({
        url: '/pages/detail-song/index?title=' + message
      })
    }
  },
  // 子页面点击了歌曲
  bindSongClick(event: any) {
    // 更改播放列表
    const globalId = [] as any
    const newRec = [] as any
    getApp().globalData.playSongList.forEach((item: any) => {
      globalId.push(item.id)
    })
    this.data.recommendSongs.forEach((item: any) => {
      if (globalId.includes(item.id)) {
        return
      }else{
        newRec.push(item)
      }
    })

    getApp().globalData.playSongList.push(...newRec)
    wx.navigateTo({
      // @ts-ignore
      url: '/pages/music-player/index?id=' + event.detail
    })
  }
})