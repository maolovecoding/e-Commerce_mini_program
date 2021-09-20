
import { config } from "../config/config.js"
import { promisic } from "./util.js"
class Http {
  /**
   * 发送http请求
   * @param {string} url 地址
   * @param {*} data 数据
   * @param {*} method 请求方式
   */
  static async request({ url, data, method = "GET" }) {
    const res = await promisic(wx.request)({
      url: config.apiBaseUrl + url,
      data,
      header: {
        appkey: config.appkey
      },
      method,
    });
    return res.data;
  }
}

export {
  Http
}