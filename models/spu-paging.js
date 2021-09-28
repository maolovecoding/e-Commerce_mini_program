/**
 * @FileName: spu-paging.js
 * @Description: spu请求，可以理解为获取商品
 * @author 毛毛
 * @date 2021-09-28 08:48
 */
import {Paging} from "../utils/paging";

class SpuPaging {
  /**
   * 获取最新的瀑布流数据
   * @return {Paging}
   */
  static getLatestPaging() {
    return new Paging({
      url: `spu/latest`
    }, 3, 0);
  }
}

export {
  SpuPaging
}
