// pages/detail/detail.js
import {Spu} from "../../models/spu";
import {SaleExplain} from "../../models/sale-explain";
import {getWindowHeightRpx} from "../../utils/system";

Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 具体的spu商品的全部信息
    spu: null,
    // 是否弹出商品详情页
    showRealm: false,
    // 加入购物车 还是 立即购买
    orderWay: String,
    // 用户选中的规格 和规格值 是否有规格的sku
    specs: null,
    // 商品的描述文本 数组
    explain: Array,
    // 滚动高度 可滚区域
    h: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  async onLoad({pid}) {
    const spu = await Spu.getDetail(pid);
    const explain = await SaleExplain.getFixed();
    const windowHeight = await getWindowHeightRpx();
    const h = windowHeight - 100;
    this.setData({
      spu,
      explain,
      h,
    });
  },

  onGoToHome(event) {
    // TODO 跳转回首页 前面含有tab-bar的页面 必须使用该方法才能正确跳转
    wx.switchTab({
      url: "/pages/home/home"
    });
  },
  onGoToCart(event) {
    wx.switchTab({
      url: "/pages/cart/cart"
    });
  },
  /**
   * 加入购物车事件
   * @param event
   */
  onAddToCart(event) {
    this.setData({
      showRealm: true,
      orderWay: "加入购物车",
    });
  },
  /**
   * 立即购买事件
   * @param event
   */
  onBuy(event) {
    this.setData({
      showRealm: true,
      orderWay: "立即购买",
    });
  },
  /**
   *
   * 规格发生改变 获取改变的规格值
   * @param event
   */
  onSpecChange(event) {
    this.setData({
      specs: event.detail,
    });
  }

})