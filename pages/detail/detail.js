// pages/detail/detail.js
var datas = require('../../datas/list-data.js');
var appData = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    detailObj: {},
    index: null,
    isCollected: false,
    isPlay: false
  },

  changeCollection(){
    var isCollected = !this.data.isCollected;
    var obj = wx.getStorageSync('isCollected');
    obj[this.data.index] = isCollected;
    var title = isCollected?'收藏成功':'取消收藏';
    wx.showToast({
      title: title,
      icon: 'success'
    })
    wx.setStorage({
      key: 'isCollected',
      data: obj,
    })
    this.setData({
      isCollected
    })
  },

  musicControl(){
    var isPlay = !this.data.isPlay;
    var { dataUrl, title, coverImgUrl } = this.data.detailObj.music;
    if(isPlay){
      //播放音乐
      wx.playBackgroundAudio({
        dataUrl,
        title,
        coverImgUrl
      });
    }else{
      wx.pauseBackgroundAudio()
    }
    
    this.setData({
      isPlay
    });
  },

  handleShare(){
    wx.showActionSheet({
      itemList: ['分享到好友','分享到朋友圈','分享到微博'],
      itemColor: "#333"
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var index = options.index;
    this.setData({
      detailObj: datas.list_data[index],
      index
    })
    var storageObj = wx.getStorageSync('isCollected');
    //如果有没有isCollected 缓存，就创建一份
    if(!storageObj){
      wx.setStorage({
        key: 'isCollected',
        data: {},
      });
    }else{
      storageObj = wx.getStorageSync('isCollected');
      this.setData({
        isCollected: storageObj[index]?true:false
      })
    }

    if(appData.data.isPlay && appData.data.playPageIndex === this.data.index){
      this.setData({
        isPlay: true
      })
    }

    wx.onBackgroundAudioPlay(() => {
      this.setData({
        isPlay: true
      })
      appData.data.isPlay = true;
      appData.data.playPageIndex = this.data.index;
    })

    wx.onBackgroundAudioPause(() => {
      this.setData({
        isPlay: false
      })
    })
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