/**
 * @FileName: ui.js
 * @Description: TODO
 * @author 毛毛
 * @date 2021-10-18 08:45
 */

const showToast = function (title) {
  wx.showToast({
    icon: "none",
    duration: 2000,
    title
  })
}

export {
  showToast
}