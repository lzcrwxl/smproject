import {Movie} from "class/Movie"
var app = getApp();

Page({
  data: {
    movie: {}
  },
  onLoad: function (options) {
    var movieId = options.id;
    console.log(movieId);
    var url = app.globalData.doubanBase +
        "/v2/movie/subject/" + movieId;
    var movie = new Movie(url)
    movie.getMovieData((movie) => {
      this.setData({
        movie: movie
      })
    })
  },
  /*查看图片*/
  viewMoviePostImg: function (e) {
    var src = e.currentTarget.dataset.src;
    wx.previewImage({
      current: src, // 当前显示图片的http链接
      urls: [src] // 需要预览的图片http链接列表
    })
  },
  onImageTap: function (e) {
    var cast = e.currentTarget.dataset.cast;
    console.log(cast);
    var searchUrl = app.globalData.doubanBase + "/v2/movie/search?q=" + cast;
    // util.getMovieListData(searchUrl,"searchResult","",this.processDoubanMovieData)
  },
  // processDoubanMovieData:function (moviesDouban,settedKey,categoryTitle) {
  //   var movies=[];
  //   console.log(moviesDouban)
  //   for(var idx in moviesDouban.subjects){
  //     var subject=moviesDouban.subjects[idx];
  //     var title=subject.title;
  //     if(title.length>=6){
  //       title=title.substring(0,6)+"...";
  //     }
  //     var temp={
  //       stars: util.convertToStarsArray(subject.rating.stars),
  //       title:title,
  //       average:subject.rating.average,
  //       coverageUrl:subject.images.large,
  //       movieId:subject.id
  //     }
  //     movies.push(temp)
  //   }
  //   var readyData={};
  //   readyData[settedKey]={
  //     categoryTitle: categoryTitle,
  //     movies:movies
  //   };
  //   this.setData(readyData)
  // }
})