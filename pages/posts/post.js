// var postsData=require('../../data/post-data');
import postsData from "../../data/post-data";

Page({
  data: {
  },
  onLoad: function (options) {
    this.setData({
      post_key:postsData.local_database
    })
  },
  onPostTap:function (e) {
    let postId=e.currentTarget.dataset.postid;
    wx.navigateTo({
      url: 'post-detail/post-detail?id='+postId
    })
  },
})