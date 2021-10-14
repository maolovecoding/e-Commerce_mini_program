// components/realm/index.js
import {FenceGroup} from "../models/fence-group";
import {Judger} from "../models/judger";
import {Spu} from "../../models/spu";
import {Cell} from "../models/cell";
import {Cart} from "../../models/cart";

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    spu: Object,
    // 按钮显示 加入购物车 ，立即购买
    orderWay: String,
  },
  /**
   * 监听器，这里来处理spu商品的数据。提取规格值
   */
  observers: {
    spu(spu) {
      if (!spu) return;
      // 无规格的情况 只有spu下的一个sku，无其他的sku了
      if (Spu.isNoSpec(spu)) {
        this.processNoSpec(spu);
      } else {
        // 有规格的情况
        this.processHasSpec(spu);
      }
      this.triggerSpecEvent();
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    // 控制规格的选择对象
    judger: Object,
    // 图片
    previewImg: String,
    // 商品名称
    title: String,
    // 折扣价格，原价
    price: Number,
    discountPrice: Number,
    // 库存
    stock: Number,
    // 有无规格 无规格的则需要特殊处理
    noSpec: Boolean,
    // 是否选择了完整的sku规格
    isSkuIntact: Boolean,
    // 已选规格值
    currentValues: Array,
    // 未选规格名
    missingKeys: Array,
    // 是否缺货
    outOfStock: Boolean,
    // 当前选中的购买数量
    currentSkuCount: Cart.SKU_MIN_COUNT,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    /**
     * 初始化 数据 初始化的数据是规格矩阵的数据
     * @param fenceGroup
     */
    bindFenceGroupData(fenceGroup) {
      this.setData({
        fences: fenceGroup.fences,
      });
    },
    /**
     * 点击规格
     * @param event
     */
    onCellTap(event) {
      const judger = this.data.judger;
      // 构建成模型类 可以使用Cell类的方法了
      const cell = new Cell(event.detail.cell.spec);
      // 构建模型类 状态status变成了默认值了，我们需要改变状态为原始cell的值
      cell.status = event.detail.cell.status;
      const x = event.detail.x;
      const y = event.detail.y;
      judger.judge({cell, x, y});
      // 用户点击 是否选中了完整sku
      const skuIntact = judger.isSkuIntact();
      // 生成了完整的sku 是用户点击生成了新的sku
      if (skuIntact) {
        const currentSku = judger.getDeterminateSku();
        // 切换新的sku数据
        this.bindSkuData(currentSku);
        this.setStockStatus(currentSku.stock, this.data.currentSkuCount);
      }
      // 是否选中完整sku
      this.bindTipData();
      this.bindFenceGroupData(judger.fenceGroup);
      this.triggerSpecEvent();
    },
    /**
     * 是否超出库存量
     * @param stock 总库存量
     * @param currentCount 当前点击的购买数量
     * @return {boolean} 缺货 或者不缺货
     */
    isOutOfStock(stock, currentCount) {
      return stock < currentCount;
    },
    /**
     * 绑定数据 是否缺货
     * @param stock
     * @param currentCount
     */
    setStockStatus(stock, currentCount) {
      this.setData({
        outOfStock: this.isOutOfStock(stock, currentCount),
      });
    },
    /**
     * 绑定默认spu的图片
     */
    bindSpuData() {
      this.setData({
        previewImg: this.properties.spu.img,
        title: this.properties.spu.title,
        price: this.properties.spu.price,
        discountPrice: this.properties.spu.discount_price,
      });
    },
    /**
     * 绑定默认sku的图片
     * @param sku
     */
    bindSkuData(sku) {
      this.setData({
        previewImg: sku.img,
        title: sku.title,
        price: sku.price,
        discountPrice: sku.discount_price,
        stock: sku.stock,
      });
    },
    /**
     * 是否选中了完整的sku规格
     */
    bindTipData() {
      this.setData({
        isSkuIntact: this.data.judger.isSkuIntact(),
        currentValues: this.data.judger.getCurrentSpecValues(),
        missingKeys: this.data.judger.getMissingSpecKeys(),
      });
    },
    /**
     * 处理无规格的spu 只有一个sku
     * @param spu
     */
    processNoSpec(spu) {
      this.setData({
        // 无规格
        noSpec: true
      });
      // 无规格的情况，只有一个sku，且sku下面的specs是为空的
      this.bindSkuData(spu.sku_list[0]);
      // 缺货控制
      this.setStockStatus(spu.sku_list[0].stock, this.data.currentSkuCount);
      // 没有规格 不需要初始化矩阵 也没有规格矩阵
      // return;
    },
    /**
     * 处理有规格的spu
     * @param spu
     */
    processHasSpec(spu) {
      const fenceGroup = new FenceGroup(spu);
      fenceGroup.initFences();
      const judger = new Judger(fenceGroup);
      this.setData({
        judger
      });
      // 是否具有默认的sku
      const defaultSku = this.data.judger.fenceGroup.getDefaultSku();
      if (defaultSku) {
        this.bindSkuData(defaultSku);
        // 缺货控制
        this.setStockStatus(defaultSku.stock, this.data.currentSkuCount);
      } else {
        this.bindSpuData();
      }
      this.bindTipData();
      this.bindFenceGroupData(fenceGroup);
    },
    /**
     * 获取已选的数量 点击按钮增加或者减少购买数量触发该回调函数，并进行是否缺货的判断
     * @param event
     */
    onSelectCount(event) {
      this.data.currentSkuCount = event.detail.count;
      if (this.data.judger.isSkuIntact()) {
        this.setStockStatus(this.data.judger.getDeterminateSku().stock, event.detail.count);
      }
    },
    /**
     * 规格发生改变时，将改变的一些规格数据传递出去
     */
    triggerSpecEvent() {
      const noSpec = Spu.isNoSpec(this.properties.spu);
      if (noSpec) {
        this.triggerEvent("specChange", {
          noSpec,
        });
      } else {
        this.triggerEvent("specChange", {
          noSpec,
          isSkuIntact: this.data.judger.isSkuIntact(),
          currentValues: this.data.judger.getCurrentSpecValues(),
          missingKeys: this.data.judger.getMissingSpecKeys(),
        });
      }
    }
  }
})
