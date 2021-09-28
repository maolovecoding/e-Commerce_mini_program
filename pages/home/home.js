// pages/home/home.js

import {Theme} from "../../models/theme.js"
import {Banner} from "../../models/banner";
import {Category} from "../../models/category";
import {Activity} from "../../models/activity";
import {SpuPaging} from "../../models/spu-paging";

Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 头部主题
    themeA: null,
    // 主题E 每周上新
    themeE: null,
    themeESpuList: [],
    //  广告
    bannerB: null,
    // 宫格数据
    grids: [],
    // 优惠券
    activityD: null,
    // 主题F 精选主题
    themeF: null,
    // 热卖榜单
    bannerG: null,
    //
    themeH: null,
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
    // const themeA = await Theme.getHomeLocationA();
    // 获取所有的主题数据
    const theme = new Theme();
    await theme.getThemes();
    const themeA = await theme.getHomeLocationA();
    // 主题E
    const themeE = await theme.getHomeLocationE();
    // 判断专题E是否还在上架
    let themeESpuList;
    if (themeE.online) { // 上架，才需要获取这个专题的详细数据
      // 获取主题E的spu商品详细数据
      const data = await Theme.getHomeLocationESpu();
      console.log(data);
      // 只展示专题的部分数据，剩余的数据通过点击 跳转到新页面查看
      if (data) {
        themeESpuList = data.spu_list.slice(0, 8);
      }
    }
    const themeF = await theme.getHomeLocationF();

    // 获取横幅广告，轮播图
    const bannerB = await Banner.getHomeLocationB();
    // 获取宫格数据
    const grids = await Category.getHomeLocationC();
    // 获取优惠券数据
    const activityD = await Activity.getHomeLocationD();
    // 热卖榜单
    const bannerG = await Banner.getHomeLocationG();
    // 主题H
    const themeH = await theme.getHomeLocationH();
    this.setData({
      // themeA: themeA[0],
      themeA,
      bannerB,
      grids,
      activityD,
      themeE,
      themeESpuList,
      themeF,
      bannerG,
      themeH
    });
    await this.initBottomSpuList();
  },
  /**
   * 获取无限瀑布流的数据，一直刷新一直加载
   * @return {Promise<void>}
   */
  async initBottomSpuList(){
    const paging = await SpuPaging.getLatestPaging();
    const data = await paging.getMoreData();
    console.log(data);
    if(!data) return;
  },
})