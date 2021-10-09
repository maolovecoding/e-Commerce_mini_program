// components/realm/index.js
import {FenceGroup} from "../models/fence-group";
import {Judger} from "../models/judger";
import {Spu} from "../../models/spu";

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
      if (Spu.isNoSpec(spu)) {
        this.setData({
          // 无规格
          noSpec: true
        });
        // 无规格的情况，只有一个sku，且sku下面的specs是为空的
        this.bindSkuData(spu.sku_list[0]);
        // 没有规格 不需要初始化矩阵 也没有规格矩阵
        return;
      }
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
      this.bindInitData(fenceGroup);
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
  },

  /**
   * 组件的方法列表
   */
  methods: {
    /**
     * 初始化 数据
     * @param fenceGroup
     */
    bindInitData(fenceGroup) {
      this.setData({
        fences: fenceGroup.fences,
        isSkuIntact: this.data.judger.isSkuIntact(),
      });
    },
    onCellTap(event) {
      this.data.judger.judge(event.detail);
      this.setData({
        fences: this.data.judger.fenceGroup.fences
      });
      // console.log(event);
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
      console.log(sku.stock);
    },
  }
})
