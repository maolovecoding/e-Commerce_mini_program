/**
 * @FileName: fence-group.js
 * @Description: 管理一组fence的业务逻辑  提取每个规格的规格值  本职类
 * @author 毛毛
 * @date 2021-10-01 17:21
 */

import {Matrix} from "./matrix";
import {Fence} from "./fence";
import {CellStatus} from "../../core/enum";

class FenceGroup {
  /**
   * 商品
   */
  spu;
  /**
   * sku列表
   */
  skuList = [];
  /**
   * 商品数组
   * @type {Fence[]}
   */
  fences = [];

  /**
   *
   * @param spu
   */
  constructor(spu) {
    this.spu = spu;
    this.skuList = spu?.sku_list;
    // console.log(this.skuList)
  }

  /**
   * 初始化 提取规格值 也实现的转置
   */
  initFences_old() {
    // 封装了二维的所有规格的集合
    const matrix = this._createMatrix(this.skuList);
    // 遍历 转置
    const fences = [];
    let currentColumn = -1;
    matrix.each((element, row, col) => {
      if (currentColumn !== col) {
        currentColumn = col;
        // 进入了下一列 也就是需要整理新的规格了 创建新的规格对象
        fences[col] = this._createFence();
      }
      // 取到具体的规格（比如尺码）值
      fences[currentColumn].pushValueTitle(element.value);
    });
    // console.log(fences);
  }

  /**
   * TODO 优化
   * 内部也实现了转置 规格值的提取
   */
  initFences() {
    const matrix = this._createMatrix(this.skuList);
    const fences = [];
    // 转置后的矩阵
    const AT = matrix.transpose();
    /*

    [
        [{1}, {2}, {3}],
        [{4}, {5}, {6}],
        [{7}, {8}, {9}],
        [{10}, {11}, {12}],
     ]
     [
        [{1}, {4}, {7}, {10}]
        [{2}, {5}, {8}, {11}]
        [{3}, {6}, {9}, {12}]
     ]
    * */
    AT.forEach(row => {
      // [{1}, {4}, {7}, {10}]
      const fence = new Fence(row);
      fence.init();
      // 是否有可视规格
      if (this._hasSketchFence() && this._isSketchFence(fence.id)) {
        // 记录可视规格的img到cell里面
        fence.setFenceSketch(this.skuList);
      }
      fences.push(fence);
    });
    console.log(fences);
    this.fences = fences;
  }

  /**
   * 获取默认的sku规格
   * @return {*}
   */
  getDefaultSku() {
    const defaultSkuId = this.spu.default_sku_id;
    if (!defaultSkuId) return;
    return this.skuList.find(s => s.id === defaultSkuId);
  }

  getSku(skuCode) {
    // spu.id + "$" + sku.id
    const fullSkuCode = `${this.spu.id}$${skuCode}`;
    const sku = this.skuList.find(s => s.code === fullSkuCode);
    return sku ?? "";
  }

  /**
   * 根据索引找sku规格的规格名称
   * @param index
   * @return {*}
   */
  getFenceTitleByIndex(index) {
    return this.fences[index].title;
  }

  /**
   * 根据cell的id，改变这个cell的状态
   * @param cellId {number}
   * @param status {CellStatus}
   */
  setCellStatusById(cellId, status) {
    this.eachCell((cell) => {
      if (cell.id === cellId) {
        cell.status = status;
      }
    });
  }

  /**
   * 更改cell的状态 选中是非选中
   * @param x {number}
   * @param y {number}
   * @param status {CellStatus}
   */
  setCellStatusByXY(x, y, status) {
    this.fences[x].cells[y].status = status;
  }

  /**
   * 遍历cells
   * @param callback {Function} 回调函数
   */
  eachCell(callback) {
    for (let i = 0; i < this.fences.length; i++) {
      for (let j = 0; j < this.fences[i].cells.length; j++) {
        callback(this.fences[i].cells[j], i, j);
      }
    }
  }

  /**
   * 确定可视规格 确定是可视规格的那个规格是那个
   * @param fenceId 规格名的唯一标识
   * @private
   * @return {boolean}
   */
  _isSketchFence(fenceId) {
    return this.spu.sketch_spec_id === fenceId;
  }

  /**
   * 是否有可视规格  根据服务器返回的数据确定
   * @private
   * @return {boolean}
   */
  _hasSketchFence() {
    // return this.spu.sketch_spec_id ? true :false;
    return !!this.spu.sketch_spec_id;
  }


  /**
   * 创建规格对象
   * @return {Fence}
   * @private
   */
  _createFence() {
    return new Fence();
  }

  /**
   * 将规格值提取为矩阵
   * @param skuList sku集合 里面有规格等参数
   * @return {Matrix}
   * @private
   */
  _createMatrix(skuList = []) {
    const matrix = [];
    skuList.forEach(sku => {
      matrix.push(sku.specs);
    });
    // 返回矩阵
    return new Matrix(matrix);
  }
}

export {FenceGroup};