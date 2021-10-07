// components/cell/index.js
import number from "../../miniprogram_npm/lin-ui/common/async-validator/validator/number";

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    cell: Object,
    // 行号
    x: Number,
    // 列号
    y: Number,
  },

  /**
   * 组件的初始数据
   */
  data: {},

  /**
   * 组件的方法列表
   */
  methods: {
    onTap(event) {
      // 自定义事件这里最好只使用小写
      this.triggerEvent("celltap", {
        cell: this.properties.cell,
        x: this.properties.x,
        y: this.properties.y,
      }, {
        // 配置冒泡
        bubbles: true,
        // 事件可以跨越组件触发
        composed: true
      });
    }
  }
})
