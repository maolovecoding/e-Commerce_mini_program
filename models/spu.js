/**
 * @FileName: spu.js
 * @Description: 获取Spu商品的数据
 * @author 毛毛
 * @date 2021-10-01 18:09
 */
import {Http} from "../utils/http";

class Spu {
  /**
   * 是否没有规格 只有一个规格的商品 也就是spu下只有一个sku，且sku没有specs
   * @param spu
   * @return {boolean}
   */
  static isNoSpec(spu) {
    if (spu.sku_list.length === 1 && spu.sku_list[0].specs.length === 0) {
      return true;
    }
    return false;
  }

  /**
   * 获取商品的数据
   * @param id 商品spu id
   * @return {Promise<*>}
   */
  static getDetail(id) {
    return Http.request({
      url: `spu/id/${id}/detail`,
    });
  }
}

export {Spu};