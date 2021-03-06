// components/sale-explain/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    // 商品详细信息的补充说明
    texts: Array,
  },

  /**
   * 组件的初始数据
   */
  data: {
    _texts: Array,
  },
  observers: {
    texts(texts) {
      this.setData({
        _texts: texts,
      });
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {}
})
