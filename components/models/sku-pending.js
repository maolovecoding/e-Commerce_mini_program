/**
 * @FileName: sku-pending.js
 * @Description: 记录已选的cell 也就是已经选中的规格值
 * @author 毛毛
 * @date 2021-10-06 21:25
 */
export class SkuPending {
  /**
   * 记录已选的cell 也就是已经选中的规格值
   * @type {[]}
   */
  pending = [];

  constructor() {
  }

  /**
   * 插入已选的规格值 规格值虽然用户的选择是无序的，但是我们是按照一定的规律插入的
   * 是从第一个规格开始的，最后的规格放在最后
   * 这样可以避免排序
   * @param cell  规格值对象
   * @param x  行号
   */
  insertCell(cell, x) {
    this.pending[x] = cell;
  }

  /**
   * 移出某个已选中的规格  因为这个规格取消选中了
   * @param x 行号
   */
  removeCell(x) {
    this.pending[x] = null;
  }

  /**
   * 找到指定行 已选的cell
   * @param x 行号
   * @return {*}
   */
  findSelectedCellByX(x) {
    return this.pending[x];
  }

  isSelected(cell, x) {
    const pendingCell = this.pending[x];
    if (!pendingCell) {
      return false;
    }
    return cell.id === pendingCell.id;
  }
}
