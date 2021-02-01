// components/progress-bar/progress-bar.js
let movableAreaWidth = 0 //可移动区域的宽度
let movableViewWidth = 0 //移动元素的宽度
const backgroundAudioManager =wx.getBackgroundAudioManager()
let currentSec = -1 //当前秒数
let duration = 0 //歌曲总时长
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    showTime: {
      currentTime: '00:00',
      totalTime: '03:00',
    },
    distance: 13.3,
    progress: 10,
  },
  lifetimes:{
    ready(){
     this._bindBGMEvent()
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    //
    _bindBGMEvent(){
      backgroundAudioManager.onPlay(() => {
      console.log('onPlay')
      })
      backgroundAudioManager.onStop(() => {
        console.log('onStop')
        })
      backgroundAudioManager.onPause(() => {
          console.log('onPause')
          })
      backgroundAudioManager.onWaiting(() => {
            console.log('onWaiting')
          })
      backgroundAudioManager.onCanplay(() => {
            console.log('onCanplay')
            console.log(`歌曲总时长: ${backgroundAudioManager.duration}`)
            let duration = backgroundAudioManager.duration
            if (typeof duration != 'undefined'){
              //设置总时长
            this._setTotalTime()
            }else{
              setTimeout(() =>{
                console.log(`歌曲总时长: ${backgroundAudioManager.duration}`)
                //设置总时长
                this._setTotalTime()
              },1000)
            }
            })
      backgroundAudioManager.onTimeUpdate(() => {
        // console.log('onTimeUpdata')
        // console.log(backgroundAudioManager.currentTime)
      })
      backgroundAudioManager.onEnded(() => {
        console.log('onEnded')
      })
      backgroundAudioManager.onError((res) => {
        console.log('onError')
        wx.showToast({
          title: '发生错误' + res.errMsg,
        })
      }) 
  },
  _setTotalTime(){
    duration = backgroundAudioManager.duration
    const durationFmt = this._timeFormat(duration)
    this.setData({
      ['showTime.totalTime']: `${durationFmt.min}:${durationFmt.sec}`
    })
  },

  _timeFormat(sec){
   const min = Math.floor(sec / 60) //分钟
   sec = Math.floor(sec % 60) //秒
   return {
     'min': this._fillZero(min),
     'sec': this._fillZero(sec),
   }
  },
  _fillZero(num) {
    return num < 10 ? '0' + num : num
  }
}
})

