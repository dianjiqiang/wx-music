import { getMvUrl,getMvInfo,getMvRelate } from "../../servers/index"

// pages/detail-video/index.ts
Page({
  data: {
    id: '',
    mvDetail: {},
    danmuList:[
      {text:"哈哈,真好听", color: '#ffffff', time: 3},
      {text:"这是新歌吗?", color: '#ffffff', time: 6},
      {text:"哈哈,真好听", color: '#ffffff', time: 5},
      {text:"哈哈,真好听", color: '#ffffff', time: 4},
    ],
    mvInfo:{},
    mvRelate:[] as any
  },
  onLoad(options: any) {
    const id = options.id
    this.setData({
      id
    })
    getApp().globalData.audioContext.pause()
    // 请求视频播放地址
    this.changeMvDetail(id)
    // 请求视频关联详情数据
    this.changeMvInfo(id)
    // 请求相关视频信息
    this.changeMvRelate(id)
  },
  async changeMvDetail(id?: string){
    const data = await getMvUrl(id)
    this.setData({
      mvDetail: data.data
    })
  },
  async changeMvInfo(id?: string){
    const data = await getMvInfo(id)
    this.setData({
      mvInfo: data.data
    })
  },
  async changeMvRelate(id?: string){
    const data = await getMvRelate(id)
    this.setData({
      mvRelate: data.data
    })
  },
  onUnload(){
    getApp().globalData.audioContext.play()
  }
})