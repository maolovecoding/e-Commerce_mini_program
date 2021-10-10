// components/realm/index.js
import {FenceGroup} from "../models/fence-group";
import {Judger} from "../models/judger";
import {Spu} from "../../models/spu";
import {Cell} from "../models/cell";

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    spu: Object
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
    currentValues:Array,
    // 未选规格名
    missingKeys:Array,
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
      }
      // 是否选中完整sku
      this.bindTipData();
      this.bindFenceGroupData(judger.fenceGroup);
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
      } else {
        this.bindSpuData();
      }
      this.bindTipData();
      this.bindFenceGroupData(fenceGroup);
    },
  }
})
