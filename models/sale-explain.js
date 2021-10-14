/**
 * @FileName: sale-explain.js
 * @Description: 获取商品描述信息
 * @author 毛毛
 * @date 2021-10-14 08:36
 */
import {Http} from "../utils/http";

export class SaleExplain {
  /**
   * 获取商品描述
   * @return {Promise<*>}
   */
  static async getFixed() {
    const explains = await Http.request({
      url: `sale_explain/fixed`,
    });
    // 只需要商品的补充说明的数组
    return explains.map(e => e.text);
  }
}