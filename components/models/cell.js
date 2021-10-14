/**
 * @FileName: cell.js
 * @Description: 规格值对象(title 保存的规格值) 目前保存的只有规格的值 后期还有规格的id
 * @author 毛毛
 * @date 2021-10-02 21:26
 */
import {CellStatus} from "../../core/enum";

class Cell {
  /**
   * 规格值
   */
  title;
  /**
   * 这个规格值对应的唯一标识
   */
  id;
  /**
   * 默认当前状态 待选
   * @type {string}
   */
  status = CellStatus.WAITING;
  /**
   * spec就是原服务器的规格值对象
   */
  spec;
  /**
   * 可视规格 图片地址
   * @type {string}
   */
  skuImg = "";

  // specification
  constructor(spec) {
    this.title = spec.value;
    this.id = spec.value_id;
    this.spec = spec;
  }

  /**
   * 获取当前规格值的唯一标识组成  规格的唯一标识 - 规格值的唯一标识
   * @return {string}
   */
  getCellCode() {
    return this.spec.key_id + "-" + this.spec.value_id;
  }
}

export {Cell}