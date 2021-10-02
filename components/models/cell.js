/**
 * @FileName: cell.js
 * @Description: TODO
 * @author 毛毛
 * @date 2021-10-02 21:26
 */
class Cell {
  /**
   * 每个规格值对象  包含所有的数据 是一个对象
   */
  title;
  constructor(spec) {
    this.title = spec.value;
  }
}

export {Cell}