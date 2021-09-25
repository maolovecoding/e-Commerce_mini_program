/**
 * @FileName: theme.js
 * @Description: 主题专题
 * @author 毛毛
 * @date 2021-09-22 15:27
 */
import {Http} from "../utils/http.js"

// 主题业务对象
class Theme {
  /**
   * 用来保存当前主题的变量
   * @type {[]}
   */
  _themes = [];

  /**
   * 主题编号 也就是spu商品的编号
   * @type {string}
   * @private
   */
  static _locationA = "t-1";
  static _locationE = "t-2";
  static _locationF = "t-3";
  static _locationH = "t-4";

  /**
   * 发起请求 获取头部主题
   * @return {Promise<object>}
   */
  async getHomeLocationA() {
    return this._themes.find(item => item.name === Theme._locationA);
  }


  /**
   * 获取每周上新主题的数据
   * @return {Promise<object>}
   */
  async getHomeLocationE() {
    return this._themes.find(item => item.name === Theme._locationE);

  }

  /**
   * 一次请求，获取所有的主题数据
   * @return {Promise<void>}
   */
  async getThemes() {
    // 所有的主题名称
    const names = `${Theme._locationA},${Theme._locationE},${Theme._locationF},${Theme._locationH}`;
    this._themes = await Http.request({
      url: "theme/by/names",
      data: {
        names
      }
    });
  }

  /**
   * 获取带有spu（商品详细信息）的数据
   * @param name
   * @return {Promise<Object>}
   */
  static _getThemeSpuByName(name) {
    return Http.request({
      url: `theme/name/${name}/with_spu`
    });
  }

  /**
   * 获取主题E的spu
   * @return {Promise<Object>}
   */
  static getHomeLocationESpu() {
    return Theme._getThemeSpuByName(Theme._locationE);
  }
}

export {
  Theme
}