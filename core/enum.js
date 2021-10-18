/**
 * @FileName: enum.js
 * @Description: sku的三种状态 可选 禁用 已选
 * @author 毛毛
 * @date 2021-10-06 10:25
 */
const CellStatus = {
  FORBIDDEN: 'forbidden',
  SELECTED: "selected",
  WAITING: "waiting",
}
/**
 * 立即购买，加入购物车
 * @type {{BUY: string, CART: string}}
 */
const ShoppingWay = {
  CART: "cart",
  BUY: "buy"
}
// 商品
const SpuListType = {
  THEME: 'theme',
  ROOT_CATEGORY: 'root_category',
  SUB_CATEGORY: 'sub_category',
  LATEST: 'latest'
}

export {CellStatus, ShoppingWay, SpuListType};