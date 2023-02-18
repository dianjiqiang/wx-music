// app.ts
App<IAppOption>({
  globalData: {
    // @ts-ignore
    audioContext: wx.createInnerAudioContext() as any,
    playSongList: [],
    activePlayIndex: 0
  },
  onLaunch() {
  },
})