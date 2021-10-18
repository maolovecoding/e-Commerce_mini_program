/**
 * @FileName: tag.js
 * @Description: 获取tag标签
 * @author 毛毛
 * @date 2021-10-18 08:44
 */

import {Http} from "../utils/http";

class Tag{
  static getSearchTags() {
    return Http.request({
      url:`tag/type/1`
    })
  }
}

export {
  Tag
}