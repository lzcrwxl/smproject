// pages/movies/more-movie/more-movie.js
var util=require('../../../utils/utils')
var app=getApp();

Page({
  data: {
    movies:{},
    navigateTitle:"",
    requestUrl:"",
    totalCount:0,
    isEmpty:true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var category=options.category;
    var dataUrl="";
    this.data.navigateTitle=category;
    switch (category){
      case "正在热映":
        dataUrl = app.globalData.doubanBase +
            "/v2/movie/in_theaters";
        break;
      case "即将上映":
        dataUrl = app.globalData.doubanBase +
            "/v2/movie/coming_soon";
        break;
      case "豆瓣Top250":
        dataUrl = app.globalData.doubanBase + "/v2/movie/top250";
        break;
      default:
        break;
    }
    this.data.requestUrl=dataUrl;
    util.http(dataUrl,this.processDoubanData)
  },
  onReady:function (e) {
    wx.setNavigationBarTitle({
      title: this.data.navigateTitle
    })
  },
  onMovieTap:function (e) {
    var movieId=e.currentTarget.dataset.movieid;
    console.log(movieId);
    wx.navigateTo({
      url: '/pages/movies/movie-detail/movie-detail?id='+movieId
    })
  },
  onPullDownRefresh:function (e) {
    console.log("pulldown")
    var refreshUrl = this.data.requestUrl +
        "?star=0&count=20";
    this.data.movies = {};
    this.data.isEmpty = true;
    this.data.totalCount = 0;
    util.http(refreshUrl, this.processDoubanData);
    wx.showNavigationBarLoading();
  },
  processDoubanData:function (moviesDouban) {
    var movies=[];
    console.log(moviesDouban)
    for(var idx in moviesDouban.subjects){
      var subject=moviesDouban.subjects[idx];
      var title=subject.title;
      if(title.length>=6){
        title=title.substring(0,6)+"...";
      }
      var temp={
        stars: util.convertToStarsArray(subject.rating.stars),
        title:title,
        average:subject.rating.average,
        coverageUrl:subject.images.large,
        movieId:subject.id
      }
      movies.push(temp)
    }
    var totalMovies={}
    if(!this.data.isEmpty){
      totalMovies=this.data.movies.concat(movies)
    }else {
      totalMovies=movies;
      this.data.isEmpty=false;
    }
    this.setData({
      movies:totalMovies
    })
    this.data.totalCount += 20;
    wx.hideNavigationBarLoading();
    wx.stopPullDownRefresh();
  },
  onReachBottom:function (e) {
    var nextUrl=this.data.requestUrl+"?start="+this.data.totalCount+"&count=20"
    util.http(nextUrl,this.processDoubanData)
    wx.showNavigationBarLoading();
  }
})