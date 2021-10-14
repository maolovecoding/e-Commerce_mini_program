// components/tab-bar/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {},

  /**
   * 组件的初始数据
   */
  data: {},

  /**
   * 组件的方法列表
   */
  methods: {
    onGoToHome(event) {
      this.triggerEvent("goToHome", {});
    },
    onGoToCart(event) {
      this.triggerEvent("goToCart", {});
    },
    onAddToCart(event) {
      this.triggerEvent("addToCart", {});
    },
    onBuy(event) {
      this.triggerEvent("buy", {});
    }
  }
})
