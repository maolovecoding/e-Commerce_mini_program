/**
 * @FileName: judger.js
 * @Description: 用来做出一些判断的类  TODO 沟通类
 * judger 法官 仲裁者
 * @author 毛毛
 * @date 2021-10-05 15:12
 */

import {SkuCode} from "./sku-code";
import {CellStatus} from "../../core/enum";
import {SkuPending} from "./sku-pending";
import {Joiner} from "../../utils/joiner";

class Judger {
  /**
   * 规格对象
   */
  fenceGroup;
  /**
   * 所有可能的路径
   */
  pathDict = [];
  /**
   * 已选的sku的规格
   */
  skuPending;

  constructor(fenceGroup) {
    this.fenceGroup = fenceGroup;
    // TODO 这里需要先初始化所有可能的规则路径 然后在初始化已选的skuPending
    this._initPathDict();
    this._initSkuPending();
  }

  _initSkuPending() {
    this.skuPending = new SkuPending(this.fenceGroup.fences.length);
    // 默认sku
    const defaultSku = this.fenceGroup.getDefaultSku();
    if (!defaultSku) return;
    this.skuPending.initDefaultSku(defaultSku);
    // 初始化已选中的cell状态（默认规格的选择）
    this._initDefaultSkuSelectedCellStatus();
    this.judge({isInit: true});
  }

  /**
   * 初始化默认规格的选中状态
   * @private
   */
  _initDefaultSkuSelectedCellStatus() {
    this.skuPending.pending.forEach(cell => {
      this.fenceGroup.setCellStatusById(cell.id, CellStatus.SELECTED);
    });
  }

  /**
   * 初始化 所有可能路径的字典
   */
  _initPathDict() {
    this.fenceGroup.skuList.forEach(s => {
      // 合并所有sku可能的路径
      this.pathDict.push(...new SkuCode(s.code).totalSeqments);
    });
  }

  /**
   * 是否选择了完整的sku规格
   * @return {boolean}
   */
  isSkuIntact() {
    return this.skuPending.isIntact();
  }

  /**
   * 获取确定的sku 需要是完整的sku
   */
  getDeterminateSku() {
    const code = this.skuPending.getSkuCode();
    // sku
    return this.fenceGroup.getSku(code);
  }

  /**
   * 获取缺失的sku的规格名称
   * @return {*[]}
   */
  getMissingSpecKeys() {
    const missingKeysIndex = this.skuPending.getMissingSpecKeysIndex();
    return missingKeysIndex.map(index => this.fenceGroup.getFenceTitleByIndex(index));
  }

  /**
   * 获取已选的规格值
   * @return {string[]|*}
   */
  getCurrentSpecValues() {
    return this.skuPending.getCurrentSpecValues();
  }

  /**
   *
   * @param cell
   * @param x
   * @param y
   * @param isInit {boolean} 是否是初始化（初始化就是内部调用）
   */
  judge({cell, x, y, isInit = false}) {
    !isInit && this._changeCurrentCellStatus(cell, x, y);
    // TODO 方式一 改变this指向
    this.fenceGroup.eachCell(this._changeOtherCellStatus.bind(this));
    // TODO 方式二： 使用箭头函数
    // this.fenceGroup.eachCell((cell, x, y) => {
    //   const potentialPath = this._findPotentialPath(cell, x, y);
    //   console.log(potentialPath);
    // });
  }

  /**
   * 潜在路径是否在所有可能的路径中
   * @param path 潜在路径
   * @return {boolean}
   * @private
   */
  _isInDict(path) {
    return this.pathDict.includes(path);
  }


  /**
   *  改变cell的状态 可选变选中
   * @param cell
   * @param x
   * @param y
   * @private
   */
  _changeCurrentCellStatus(cell, x, y) {
    // 可选 变 选中
    if (cell.status === CellStatus.WAITING) {
      // cell.status = CellStatus.SELECTED;
      this.fenceGroup.setCellStatusByXY(x, y, CellStatus.SELECTED);
      // 插入已选规格值
      this.skuPending.insertCell(cell, x);
    }
    // 选中 变 可选
    if (cell.status === CellStatus.SELECTED) {
      //  cell.status = CellStatus.WAITING;
      this.fenceGroup.setCellStatusByXY(x, y, CellStatus.WAITING);
      this.skuPending.removeCell(x);
    }

  }

  /**
   *  根据潜在路径 改变其他cell的状态 判断剩余未选的cell是否还可选 还是禁选
   * @param cell
   * @param x
   * @param y
   * @private
   */
  _changeOtherCellStatus(cell, x, y) {
    const potentialPath = this._findPotentialPath(cell, x, y);
    // console.log(potentialPath);
    // 潜在路径为空 不做任何处理 因为这时候说明这个路径是我们当前选中的路径
    if (!potentialPath) return;
    const isIn = this._isInDict(potentialPath);
    // 潜在路径存在
    isIn ?
        // 按钮可选状态
        this.fenceGroup.setCellStatusByXY(x, y, CellStatus.WAITING)
        :
        // 按钮禁用状态
        this.fenceGroup.setCellStatusByXY(x, y, CellStatus.FORBIDDEN);
  }

  /**
   * 寻找潜在的路径
   * @param cell {Cell}
   * @param x {number}
   * @param y {number}
   * @private
   * @return {string} 潜在路径字符串 code
   */
  _findPotentialPath(cell, x, y) {
    const joiner = new Joiner("#");
    for (let i = 0; i < this.fenceGroup.fences.length; i++) {
      // 每行被选中的cell
      const selectedCell = this.skuPending.findSelectedCellByX(i);
      // 遍历的cell是当前行
      if (x === i) {
        // 如果cell是已选的，直接跳过
        if (this.skuPending.isSelected(cell, x)) return;
        const cellCode = this._getCellCode(cell.spec);
        joiner.join(cellCode);
      } else {
        // 其他行  将其他行的已选cell（规格值）加入到潜在路径
        if (selectedCell) {
          const selectedCellCode = this._getCellCode(selectedCell.spec);
          joiner.join(selectedCellCode);
        }
      }
    }
    return joiner.getStr();
  }

  /**
   *  获取唯一标识 规格名 - 规格值  1-45
   * @param spec
   * @return {*}
   * @private
   */
  _getCellCode(spec) {
    return spec.key_id + "-" + spec.value_id;
  }
}

export {Judger};