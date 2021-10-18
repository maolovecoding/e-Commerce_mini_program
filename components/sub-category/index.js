// components/sub-category/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    // 二级菜单
    categories: Array,
    // 图片
    bannerImg: String,
  },
  /**
   * 组件的初始数据
   */
  data: {},

  observers: {
    'categories': function (t) {
      console.log(t)
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onTapGridItem(event) {
      const id = event.detail.key
      this.triggerEvent('itemtap', {
        cid: id
      })
    }
  }
})
