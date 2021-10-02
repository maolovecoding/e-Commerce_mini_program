/**
 * @FileName: spu.js
 * @Description: 获取Spu商品的数据
 * @author 毛毛
 * @date 2021-10-01 18:09
 */
import {Http} from "../utils/http";

class Spu {
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