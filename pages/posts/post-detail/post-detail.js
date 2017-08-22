import postsData from '../../../data/post-data.js'
var app=getApp();
Page({
  data: {
    isPlayingMusic:false
  },
  onLoad: function (option) {
    var globalData=app.globalData;
    console.log(globalData)
    let postId = option.id;
    this.data.currentPostId = postId;
    var postData = postsData.local_database[postId]
    this.setData({
      postData: postData
    })
    var postsCollected = wx.getStorageSync('posts_collected');
    if (postsCollected) {
      let postCollected = postsCollected[postId];
      this.setData({
        collected: postCollected
      })
    } else {
      let postsCollected = {};
      postsCollected[postId] = false,
          wx.setStorageSync("posts_collected", postsCollected)
    }
    // this.data.postData=postData;
  },
  setAudioMonitor:function () {

  },
  onCollection: function () {
    let key = wx.getStorageSync('posts_collected');
    var postCollected = key[this.data.currentPostId]
    postCollected = !postCollected;
    key[this.data.currentPostId] = postCollected;
    wx.setStorageSync('posts_collected', key);
    this.setData({
      collected: postCollected
    })
    wx.showToast({
      title: postCollected ? "收藏成功" : "取消收藏",

    })
  },
  onShare: function () {
    wx.showActionSheet({
      itemList: [
        "分享给微信好友",
        "分享到朋友圈",
        "分享到微博"
      ],
      success: res => {


      }
    })
  },
  onMusicTap: function (e) {
    var currentPostId=this.data.currentPostId;
    var isPlayingMusice=this.data.isPlayingMusic;
    var music=postsData.local_database[currentPostId].music;
    if(isPlayingMusice){
      wx.pauseBackgroundAudio();
      this.setData({
        isPlayingMusic:false
    })
    }else {
      wx.playBackgroundAudio({
        dataUrl: music.url,
        title: music.title,
        coverImg: music.coverImg
      })
      this.setData({
        isPlayingMusic:true
      })
    }
    console.log('music')

  }
})