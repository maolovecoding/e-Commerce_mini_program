/**
 * @FileName: category.js
 * @Description: 发送请求 获取宫格区域的数据
 * @author 毛毛
 * @date 2021-09-20 16:38
 */
import {Http} from "../utils/http";

class Category {
  /**
   * 获取宫格区域的数据
   * @return {Promise<void>}
   */
  static async getHomeLocationC() {
    return await Http.request({
      url: "category/grid/all",
    })
  }
}

export {
  Category
}