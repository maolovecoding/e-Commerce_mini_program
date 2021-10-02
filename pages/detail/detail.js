// pages/detail/detail.js
import {Spu} from "../../models/spu";

Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 具体的spu商品的全部信息
    spu: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  async onLoad({pid}) {
    const spu = await Spu.getDetail(pid);
    console.log(spu);
    this.setData({
      spu
    });
  },

})