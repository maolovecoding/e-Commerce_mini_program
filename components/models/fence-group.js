/**
 * @FileName: fence-group.js
 * @Description: 管理一组fence的业务逻辑  提取每个规格的规格值
 * @author 毛毛
 * @date 2021-10-01 17:21
 */

import {Matrix} from "./matrix";
import {Fence} from "./fence";

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
   *
   * @param spu
   */
  constructor(spu) {
    this.spu = spu;
    this.skuList = spu?.sku_list;
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
    console.log(fences);
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
    AT.forEach(row => {
      const fence = new Fence(row);
      fence.init();
      fences.push(fence);
    });
    console.log(fences);
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