import { Http } from "../utils/http.js"
// 主题业务对象
class Theme {
  /**
   * 发起请求 获取头部主题
   * 
   */
  static async getHomeLocationA() {
    return await Http.request({
      url: "theme/by/names",
      data: {
        names: 't-1',
      }
    });
  }
}

export {
  Theme
}