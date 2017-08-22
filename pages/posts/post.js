// var postsData=require('../../data/post-data');
import postsData from "../../data/post-data";

Page({
  data: {
  },
  onLoad: function (options) {
    this.setData({
      post_key:postsData.local_database
    })
    // this.data.post_key=postsData.local_database
  },
  onPostTap:function (e) {
    let postId=e.currentTarget.dataset.postid;
    // console.log(e.currentTarget)
    wx.navigateTo({
      url: 'post-detail/post-detail?id='+postId
    })
  },
  onReady: function () {
    // console.log('onReady')
  },
  onShow: function () {
    // console.log('onshow')
  },
  onHide: function () {
  },
  onUnload: function () {

  },
  onPullDownRefresh: function () {

  },
  onReachBottom: function () {

  },

  onShareAppMessage: function () {

  }
})