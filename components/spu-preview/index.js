// components/spu-preview/index.js
import date from "../../miniprogram_npm/lin-ui/common/async-validator/validator/date";

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    data: Object
  },
  observers: {
    data(data) {
      if (!data || !data.tags) return;
      const tags = data.tags.split("$");
      this.setData({
        tags
      });
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    tags: Array
  },

  /**
   * 组件的方法列表
   */
  methods: {
    /**
     * 获取图片加载后的宽度和高度
     * @param event
     */
    onImgLoad(event) {
      const {width, height} = event.detail;
      // 保持宽高比
      this.setData({
        w: 340,
        h: 340 * height / width
      });
    },
    /**
     * 点击商品 将商品id传递出去
     * @param event
     */
    onItemTap(event) {
      const pid = event.currentTarget.dataset.pid;
      wx.navigateTo({
        url:"/pages/detail/detail?pid=" + pid
      });
      // this.triggerEvent();
    }
  }
})
