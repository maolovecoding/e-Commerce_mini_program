// components/realm/index.js
import {FenceGroup} from "../models/fence-group";
import {Judger} from "../models/judger";

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
      const fenceGroup = new FenceGroup(spu);
      fenceGroup.initFences();
      const judger = new Judger(fenceGroup);
      this.setData({
        judger
      })
      this.bindInitData(fenceGroup);
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    // 控制规格的选择对象
    judger: Object
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
        fences: fenceGroup.fences
      });
    },
    onCellTap(event) {
      this.data.judger.judge(event.detail);
      this.setData({
        fences: this.data.judger.fenceGroup.fences
      });
      // console.log(event);
    },

  }
})
