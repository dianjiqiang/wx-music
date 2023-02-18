// pages/music-player/index.ts
import { getSongDetail, getSongLyric } from '../../servers/index'
import { throttle, analysisLyric } from '../../utils/util'

const audioContext = getApp().globalData.audioContext

Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: '',
    currentSong: {},
    lrcInfos: [] as any,
    lrcString: '-',
    lrcIndex: 0,
    pageConstTop: 140,
    active: 0,
    contentHeight: 300,
    currentTime: 0,
    durationTime: 0,
    sliderValue: 0,
    isSliderChange: false,
    isPlay: true,
    lyricScrollTop: 0,
    isScrolling: false,
    Timer: null as any,
    playSongList: [],
    isHidden: true,
    playOverType: 'play_order'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options: any) {
    const id = options.id
    this.setData({
      id
    })
    wx.getSystemInfo({
      success: (event) => {
        this.setData({
          contentHeight: event.screenHeight - event.statusBarHeight - 44
        })
      }
    })
    // 获取歌单
    this.setData({
      playSongList: getApp().globalData.playSongList
    })


    //根据id获取获取详情
    this.changeSongDetail(id)
    // 根据id 获取歌词
    this.changeSongLyric(id)
    // 播放当前歌曲
    this.playerMusic()
  },
  async changeSongDetail(id: string) {
    const res = await getSongDetail(id)
    this.setData({
      currentSong: res.songs[0],
      durationTime: res.songs[0].dt
    })
  },
  async changeSongLyric(id: string) {
    const res = await getSongLyric(id)
    const newRes = analysisLyric(res.lrc.lyric)
    this.setData({
      lrcInfos: newRes
    })
  },
  updateProgress() {
    const currentTime = audioContext.currentTime * 1000
    // if(this.data.durationTime - currentTime <= 1000){
    //   if(this.data.playOverType === 'play_random'){

    //   }
    // }
    
    // 记录当前时间
    this.setData({
      currentTime,
      sliderValue: Math.floor((currentTime / this.data.durationTime) * 100)
    })
  },
  playerMusic(id?: string) {
    if (id) {
      audioContext.src = `https://music.163.com/song/media/outer/url?id=${id}.mp3`
    }else{
      audioContext.src = `https://music.163.com/song/media/outer/url?id=${this.data.id}.mp3`
    }
    audioContext.autoplay = true
    const throttleUpdateProgress = throttle(this.updateProgress, 1000)
    audioContext.onTimeUpdate(() => {
      if (!this.data.isSliderChange) {
        throttleUpdateProgress()
        // 获取高亮歌词
        const currentTime = audioContext.currentTime * 1000
        for (let i = 0; i < this.data.lrcInfos.length; i++) {
          if (this.data.lrcInfos[i].time > currentTime) {
            if (this.data.lrcString === this.data.lrcInfos[i - 1].text) {
              break
            }
            this.setData({
              lrcString: this.data.lrcInfos[i - 1].text,
              lrcIndex: i - 1
            })
            break
          }
        }
        // 获取歌词索引位置
        if (!this.data.isScrolling) {
          if (35 * this.data.lrcIndex >= this.data.contentHeight / 2 - 240) {
            this.setData({
              lyricScrollTop: 35 * this.data.lrcIndex - 140
            })
          }
        }
      }
    })
    audioContext.onWaiting(() => {
      audioContext.pause()
    })
    audioContext.onCanplay(() => {
      audioContext.play()
    })
  },
  onSwiperChange(event: any) {
    this.setData({
      active: event.detail.current
    })
  },
  handleSwiperClick() {
    this.setData({
      isHidden: true
    })
  },
  handleIsHidden() {
    this.setData({
      isHidden: false
    })
  },
  onNavTabItemTap(event: any) {
    this.setData({
      active: event.target.dataset.index
    })
  },
  onChangeSlider(event: any) {
    this.data.isSliderChange = false
    audioContext.seek(this.data.durationTime / 100000 * event.detail.value)
    this.setData({
      currentTime: this.data.durationTime / 100 * event.detail.value,
      sliderValue: event.detail.value
    })
  },
  onChangeChanging(event: any) {
    // audioContext.seek(this.data.durationTime / 100000 * event.detail.value)
    const currentTime = this.data.durationTime / 100 * event.detail.value
    this.setData({
      currentTime,
    })
    this.data.isSliderChange = true

    // 根据时间匹配歌词
    for (let i = 0; i < this.data.lrcInfos.length; i++) {
      if (this.data.lrcInfos[i].time > currentTime) {
        this.setData({
          lrcString: this.data.lrcInfos[i - 1].text,
          lrcIndex: i - 1
        })
        break
      }
    }
  },
  handlePlayClick() {
    if (this.data.isPlay) {
      audioContext.pause()
      this.setData({
        isPlay: false
      })
    } else {
      audioContext.play()
      this.setData({
        isPlay: true
      })
    }
  },
  changeSongCurrentTime(event: any) {
    const currentTime = event.target.dataset.item.time
    audioContext.seek(currentTime / 1000 - 0.4)
    this.setData({
      currentTime,
    })
    this.data.isScrolling = false
  },
  scrollTouchstart() {
    this.data.isScrolling = true
  },
  scrollTouchend() {
    if (this.data.Timer) {
      clearTimeout(this.data.Timer)
    }
    this.data.Timer = setTimeout(() => {
      this.data.isScrolling = false
    }, 5000)
  },
  handleChangePlayer(event: any){
    // @ts-ignore
    const id = this.data.playSongList[event.detail].id
    //根据id获取获取详情
    this.changeSongDetail(id)
    // 根据id 获取歌词
    this.changeSongLyric(id)
    // 播放当前歌曲
    this.playerMusic(id)
  },
  handleChangePlayerMusic(event: any){
    let activePlayIndex = 0 as any
    if (event.mark.type === true) {
      activePlayIndex = getApp().globalData.activePlayIndex - 1
    }else{
      activePlayIndex = getApp().globalData.activePlayIndex + 1
    }
    // @ts-ignore
    const id = this.data.playSongList[activePlayIndex].id
    this.setData({
      id: String(id)
    })
    //根据id获取获取详情
    this.changeSongDetail(id)
    // 根据id 获取歌词
    this.changeSongLyric(id)
    // 播放当前歌曲
    this.playerMusic(id)
    // 更改总app顺序
    getApp().globalData.activePlayIndex = activePlayIndex
  },
  changeOverType(){
    if (this.data.playOverType === 'play_order') {
      this.setData({
        playOverType: 'play_random'
      })
    }else if(this.data.playOverType === 'play_random'){
      this.setData({
        playOverType: 'play_repeat'
      })
    }else{
      this.setData({
        playOverType: 'play_order'
      })
    }
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