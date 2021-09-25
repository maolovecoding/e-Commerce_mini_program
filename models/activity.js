/**
 * @FileName: activity.js
 * @Description: 活动模型 获取优惠券等活动的数据
 * @author 毛毛
 * @date 2021-09-25 15:27
 */

import {Http} from "../utils/http";

/**
 * @class: 活动类
 */
class Activity {
  static _locationD = "a-2";

  /**
   * 获取优惠券数据
   * @return {Promise<*>}
   */
  static async getHomeLocationD() {
    return await Http.request({
      url: `activity/name/${Activity._locationD}`
    });
  }
}

export {Activity};