/**
 * @FileName: fence.js
 * @Description: 管理fence相关业务的
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

  constructor(specs) {
    this.specs = specs;
  }

  init() {
    this.specs.forEach(sp => {
      const cell = new Cell(sp);
      this.cells.push(cell);
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