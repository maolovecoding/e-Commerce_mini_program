// pages/home/home.js

import {Theme} from "../../models/theme.js"
import {Banner} from "../../models/banner";
import {Category} from "../../models/category";

Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 头部主题
    themeA: null,
    //  广告
    bannerB: null,
    // 宫格数据
    grids: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  async onLoad(options) {
    // 初始化所有数据
    await this.initAllData();
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
   * 初始化所有数据
   * @return {Promise<void>}
   */
  async initAllData() {
    // 请求获取数据 主题
    const themeA = await Theme.getHomeLocationA();
    // 获取横幅广告，轮播图
    const bannerB = await Banner.getHomeLocationB();
    // 获取宫格数据
    const grids = await Category.getGridCategory();
    console.log(grids);
    this.setData({
      themeA: themeA[0],
      bannerB,
      grids
    });
  }
})