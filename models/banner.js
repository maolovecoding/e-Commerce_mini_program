/**
 * @FileName: banner.js
 * @Description: 广告类数据的请求
 * @author 毛毛
 * @date 2021-09-20 11:13
 */


import {Http} from "../utils/http";

/**
 * 横幅，广告类 发起相关请求
 */
class Banner {
  static _locationB = "b-1";
  // 热卖榜单
  static _locationG = "b-2";

  /**
   * 获取横幅轮播图 广告
   * @return {Promise<*>}
   */
  static async getHomeLocationB() {
    return await Http.request({
      url: `banner/name/${Banner._locationB}`,
    });
  }

  /**
   * 获取热卖榜单的数据 G
   * @return {Promise<*>}
   */
  static async getHomeLocationG() {
    return await Http.request({
      url: `banner/name/${Banner._locationG}`,
    });
  }
}

export {
  Banner
}