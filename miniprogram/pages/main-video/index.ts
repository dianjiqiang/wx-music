// pages/main-video/index.ts

import { getTopMvList } from "../../servers/index"

Page({

  /**
   * 页面的初始数据
   */
  data: {
    videoList: [] as any[],
    offset: 0,
    limit: 20,
    hasMore: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    // 初始进入 请求20条数据 偏移量为0
    this.changeTopMvList(this.data.limit , this.data.offset)
  },
  onReachBottom(){
    const newOffset = this.data.offset + this.data.limit
    this.changeTopMvList(this.data.limit, newOffset)
  },
  onPullDownRefresh(){
    // 发送网络请求
    this.clearTopMvList().then(res => {
      if (res) {
        wx.stopPullDownRefresh()
      }
    })
  },
  async changeTopMvList(limit?: number, offset?: number){
    if (!this.data.hasMore) {
      return
    }
    const data = await getTopMvList(limit, offset)
    const videoList = data.data
    const thisVideoList = [...this.data.videoList, ...videoList]
    
    this.setData({
      videoList: thisVideoList,
      offset,
      hasMore: data.hasMore
    })
  },
  async clearTopMvList(){
    const data = await getTopMvList(this.data.limit, 0)
    const videoList = data.data
    
    this.setData({
      videoList,
      offset: 0,
      hasMore: true
    })
    return new Promise<string>((resolve) => {
      resolve('OK')
    })
  },
  // 点击详情页
  onVideoTap(event: any){
    const id = event.target.dataset.id
    wx.navigateTo({
      url: '/pages/detail-video/index?id=' + id
    })
  }
})