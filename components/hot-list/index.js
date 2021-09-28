// components/hot-list/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    banner: Object,
  },
  /**
   * 监听器 监听任意多个属性，当属性没赋值时，触发同名回调函数，参数是新的值
   */
  observers: {
    banner(banner) {
      if (!banner) return;
      if (!banner.items?.length) return;
      // 左侧的主题图
      const left = banner.items.find(val => val.name === "left");
      const rightTop = banner.items.find(val => val.name === "right-top");
      const rightBottom = banner.items.find(val => val.name === "right-bottom");
      this.setData({
        left, rightTop, rightBottom
      })
    }
  },

  /**
   * 组件的初始数据
   */
  data: {},

  /**
   * 组件的方法列表
   */
  methods: {}
})
