// components/lyric/lyric.js

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    isLyricShow :{
      type: Boolean,
      value: false,
    },
    lyric: String,
  },
  observers: {
   lyric(lrc) {
     if(lrc === '暂无歌词'){
       this.setData({
         lyrics: [
           {
             lrc,
           }
         ]
       })
     }else {
       this._parseLyric(lrc)
     }
     console.log(lrc)
   }
  },

  /**
   * 组件的初始数据
   */
  data: {
    lyrics: []
  },

  /**
   * 组件的方法列表
   */
  methods: {
  _parseLyric(lyricSrc){
   let lines = lyricSrc.split('\n')
   let _lyris = []
   lines.forEach((elem) =>{
     const lrc = elem.split(']')[1]
     _lyris.push(lrc)
   })
   this.setData({
     lyrics: _lyris
   })
  }
  }
})
