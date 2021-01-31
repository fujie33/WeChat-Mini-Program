// pages/player/player.js
let musiclist = []
const backgroundAudioManager = wx.getBackgroundAudioManager()
//正在播放的歌曲index
let playingIndex = 0
Page({

  /**
   * 页面的初始数据
   */
  data: {
    picUrl: '',
    isplayer: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    console.log(options.music, typeof (options.musicId))
    playingIndex = options.index
    musiclist = wx.getStorageSync('musiclist')
    this._loadMusicDetail(options.musicId)
  },
  toggleplaying(){
   this.setData({
     isplaying: !this.data.isplaying
   })
  },
  _loadMusicDetail(musicId) {
    let music = musiclist[playingIndex]
    console.log(music)
    wx.setNavigationBarTitle({
      title: music.name,
    })
    this.setData({
      picUrl : music.al.picUrl
    })
    wx.cloud.callFunction({
      name: 'music',
      data: {
        musicId,
        $url: 'musicUrl',
      }
    }).then((res) => {
      console.log(res)
      const url = res.result.data[0].url
      if(url === null){
        wx.showToast({
          title: '没有权限播放'
        })
        backgroundAudioManager.pause()
        this.setData({
          isplaying: flase
        })
        return
      }
      backgroundAudioManager.src = url
      backgroundAudioManager.title =music.name
      backgroundAudioManager.coverImgUrl = music.al.picUrl
      backgroundAudioManager.singer = music.ar[0].names
      this.setData({
        isplaying: true
      })
    })
  },
  toggleplaying(){
    if(this.data.isplaying){
      backgroundAudioManager.pause()
    }else{
      backgroundAudioManager.play()
    }
    this.setData({
      isplaying: !this.data.isplaying
    })
  },
  onPrev(){
    playingIndex--
    if(playingIndex < 0){
      playingIndex = musiclist.length - 1
    }
    this._loadMusicDetail(musiclist[playingIndex].id)
  },
  onNext(){
    playingIndex++
    if(playingIndex === musiclist.length){
      playingIndex = 0
    }
    this._loadMusicDetail(musiclist[playingIndex].id)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})