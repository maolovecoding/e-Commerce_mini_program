// components/counter/index.js
import {Cart} from "../../models/cart";

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    // 默认数量
    count: {
      type: Number,
      value: Cart.SKU_MIN_COUNT
    },
    // 最小数量
    min: {
      type: Number,
      value: Cart.SKU_MIN_COUNT
    },
    // 最大值
    max: {
      type: Number,
      value: Cart.SKU_MAX_COUNT
    },
  },

  /**
   * 组件的初始数据
   */
  data: {},

  /**
   * 组件的方法列表
   */
  methods: {
    /**
     * 数字超出可选范围触发的事件 根据type属性： overflow_min 和 overflow_max
     * @param event
     */
    onOverStep(event) {
      const minOrMaxOut = event.detail.type;
      if (minOrMaxOut === "overflow_max") {
        wx.showToast({
          icon: "none",
          duration: 2000,
          title: "超出最大购买数量！"
        });
      } else if (minOrMaxOut === "overflow_min") {
        wx.showToast({
          icon: "none",
          duration: 2000,
          title: `最少需要购买${Cart.SKU_MIN_COUNT}件奥！`
        });
      }
    },
  }
})
