/**
 * Created by hasee on 2017/8/21.
 */
var util=require('../../utils/utils')

var app=getApp();
Page({
  data:{
    inTheaters:{},
    comingSoon:{},
    top250:{},
    searchResult:{},
    intValue:"",
    containerShow:true,
    searchPannelShow:false
  },
  onLoad: function (e) {
    var inTheatersUrl=app.globalData.doubanBase+"/v2/movie/in_theaters"+"?start=0&count=3"
    var comingSoonUrl=app.globalData.doubanBase+"/v2/movie/coming_soon"+"?start=0&count=3"
    var top250Url=app.globalData.doubanBase+"/v2/movie/top250"+"?start=0&count=3"
    this.getMovieListData(inTheatersUrl,"inTheaters","正在热映");
    this.getMovieListData(comingSoonUrl,"comingSoon","即将上映");
    this.getMovieListData(top250Url,"top250","豆瓣Top250");
  },
  onMoreTap:function (e) {
    var category=e.currentTarget.dataset.category;
    wx.navigateTo({
      url: 'more-movie/more-movie?category='+category
    })
  },
  getMovieListData:function (url,settedKey,categoryTitle) {
    var that=this;
    wx.request({
      url: url,
      method: "GET",
      header: {
        "Content-Type": "json"
      },
      success: res => {
        that.processDoubanData(res.data,settedKey,categoryTitle)
      },
      fail: function () {

      },
    })
  },
  onBindFocus:function (e) {
    this.setData({
      containerShow:false,
      searchPannelShow:true
    })
  },
  onBindBlur:function (e) {
    var text=e.detail.value;
    console.log(text);
  },
  onBindComfirm:function (e) {
    var text=e.detail.value;
    console.log(text);
    var searchUrl = app.globalData.doubanBase + "/v2/movie/search?q=" + text;
    this.getMovieListData(searchUrl,"searchResult","")
  },
  onCancelImgTap:function (e) {
    console.log(e);
    this.setData({
      containerShow:true,
      searchPannelShow:false,
      searchResult:{},
      intValue:""
    })
  },
  processDoubanData:function (moviesDouban,settedKey,categoryTitle) {
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
    var readyData={};
    readyData[settedKey]={
      categoryTitle: categoryTitle,
      movies:movies
    };
    this.setData(readyData)
  }
})