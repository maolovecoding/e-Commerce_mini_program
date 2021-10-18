// pages/category/category.js
import {getSystemSize} from "../../utils/system";
import {px2rpx} from "../../miniprogram_npm/lin-ui/utils/util";
import {Categories} from "../../models/categories";
import {SpuListType} from "../../core/enum";

Page({

  /**
   * 页面的初始数据
   */
  data: {
    defaultRootId: 2,
    // 高度
    segHeight: 0,
    // 一级菜单
    roots: [],
    // 选中的一级菜单的二级菜单
    currentSubs: [],
    // 菜单图片
    currentBannerImg: "",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  async onLoad(options) {
    await this.setDynamicSegmentHeight();
    await this.initCategoryData();
  },
  /**
   * 向服务器请求数据
   */
  async initCategoryData() {
    const categories = new Categories();
    // 保存 categories
    this.data.categories = categories;
    await categories.getAll();
    // 一级菜单
    const roots = categories.roots;
    // 默认选中的一级菜单
    const defaultRoot = this.getDefaultRoot(roots);
    // 对应的二级菜单
    const currentSubs = categories.getSubs(defaultRoot.id);
    this.setData({
      // 所有的一级菜单
      roots,
      // 选中的一级菜单的二级菜单
      currentSubs,
      // 图片
      currentBannerImg: defaultRoot.img
    })
  },
  /**
   * 初始化 动态加载菜单的高度
   * @return {Promise<void>}
   */
  async setDynamicSegmentHeight() {
    const res = await getSystemSize();
    // 借用lin-ui的辅助函数，将px转为rpx，而且是根据机型动态转换的
    const windowHeightRpx = px2rpx(res.windowHeight);
    const h = windowHeightRpx - 60 - 20 - 2;
    this.setData({
      segHeight: h,
    });
  },
  /**
   * 获取默认的以及菜单 该菜单被选中
   * @param roots
   */
  getDefaultRoot(roots) {
    let defaultRoot = roots.find(root => root.id === this.data.defaultRootId);
    if (!defaultRoot) {
      defaultRoot = roots[0];
    }
    return defaultRoot;
  },

  onGotoSearch(event) {
    wx.navigateTo({
      url: "/pages/search/search"
    });
  },

  onSegChange(event) {
    const rootId = event.detail.activeKey
    const currentSubs = this.data.categories.getSubs(rootId);
    // TODO 拿到的id其实是字符串类型，这里需要转为数字类型
    const currentRoot = this.data.categories.getRoot(Number.parseInt(rootId));

    this.setData({
      currentSubs,
      currentBannerImg: currentRoot?.img
    });
  },

  onJumpToSpuList(event) {
    const cid = event.detail.cid;
    console.log(cid);
    wx.navigateTo({
      url: `/pages/spu-list/spu-list?cid=${cid}&type=${SpuListType.SUB_CATEGORY}`
    });
  },
});