/**
 * @FileName: system.js
 * @Description: 获取当前系统（手机端）的尺寸等
 * @author 毛毛
 * @date 2021-10-17 15:08
 */

import {promisic} from "./util";
import {px2rpx} from "../miniprogram_npm/lin-ui/utils/util";


const getSystemSize = async function () {
  const res = await promisic(wx.getSystemInfo)();
  return {
    windowHeight: res.windowHeight,
    windowWidth:res.windowWidth,
    screenWidth: res.screenWidth,
    screenHeight: res.screenHeight,
  }
}

const getWindowHeightRpx = async function() {
  const  res = await getSystemSize();
  return px2rpx(res.windowHeight);
}

export {
  getSystemSize,
  getWindowHeightRpx
}