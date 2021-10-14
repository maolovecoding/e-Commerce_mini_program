/**
 * @FileName: fence.js
 * @Description: 管理fence相关业务的  一个fence对象就是一种规格 规格名及其规格值
 * @author 毛毛
 * @date 2021-10-01 17:20
 */
import {Cell} from "./cell";

class Fence {
  /**
   * 一组的 规格值 比如颜色的可选的一组规格值
   * @type {[]}
   */
  cells = [];
  /**
   * 一组规格值
   */
  specs;
  /**
   * 规格名的名字
   */
  title;
  /**
   * 规格名的唯一标识
   */
  id;

  constructor(specs) {
    this.specs = specs;
    this.title = specs[0].key;
    this.id = specs[0].key_id;
  }

  init() {
    this._initCells();
  }

  _initCells() {
    this.specs.forEach(sp => {
      // 数组去重
      const existed = this.cells.some(cell => cell.id === sp.value_id);
      if (!existed) {
        const cell = new Cell(sp);
        this.cells.push(cell);
      }
    });
  }

  setFenceSketch(skuList) {
    this.cells.forEach(cell => {
      this._setCellSkuImg(cell, skuList);
    });
  }

  /**
   * 设置可视的sku的图片到cell上
   * TODO 其实cell的数量和sku的数量不是对应的，因为可能多个sku都是同一种颜色，或者是同一种图案啊等等
   * @param cell
   * @param skuList
   * @private
   */
  _setCellSkuImg(cell, skuList) {
    // 拿到规格的规格值 1-11#2-22#3-33
    const specCode = cell.getCellCode();
    // 找到匹配的sku
    const matchSku = skuList.find(sku => sku.code.includes(specCode));
    // 将sku的图片规格 放到cell的属性里面 当做可视规格
    cell.skuImg = matchSku?.img;
  }

  /**
   * 整理规格值
   * @param title
   */
  pushValueTitle(title) {
    this.cells.push(title);
  }
}

export {Fence};