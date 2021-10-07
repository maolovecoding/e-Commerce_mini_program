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

  /**
   * 整理规格值
   * @param title
   */
  pushValueTitle(title) {
    this.cells.push(title);
  }
}

export {Fence};