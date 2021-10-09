/**
 * @FileName: sku-pending.js
 * @Description: 记录已选的cell 也就是已经选中的规格值
 * @author 毛毛
 * @date 2021-10-06 21:25
 */
import {Cell} from "./cell";

export class SkuPending {
  /**
   * 记录已选的cell 也就是已经选中的规格值
   * @type {[]}
   */
  pending = [];
  /**
   * 完整的sku应该有多少种规格
   */
  size;

  constructor(size) {
    this.size = size;
  }

  /**
   * 初始化插入默认的sku，在外界调用
   * @param sku
   */
  initDefaultSku(sku) {
    // this.size = sku.specs.length;
    for (let i = 0; i < sku.specs.length; i++) {
      const cell = new Cell(sku.specs[i]);
      this.insertCell(cell, i);
    }
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

  /**
   * 确定用户是否选择了完整的sku
   * @return {boolean}
   */
  isIntact() {
    // [undefined,] pending 已选规格我们不是push进去的，所以可能出现undefined的情况
    for (let i = 0; i < this.size; i++) {
      if(this._isEmptyPart(i)) return false;
    }
    // 不需要判断长度了，上面的循环其实已经判断长度是否相等了
    // return this.size === this.pending.length;
    return true;
  }

  /**
   * 元素是否为空
   * @param index
   * @return {boolean}
   * @private
   */
  _isEmptyPart(index) {
    return !this.pending[index];
  }
}
