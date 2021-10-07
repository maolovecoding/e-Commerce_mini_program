/**
 * @FileName: joiner.js
 * @Description: 字符串拼接工具类
 * @author 毛毛
 * @date 2021-10-07 10:10
 */

export class Joiner {
  _str = "";
  /**
   * 字符串连接符
   * @type {string}
   * @private
   */
  _symbol;
  /**
   * 需要去除的连接符数量
   * @type {number}
   * @private
   */
  _cutCharNum;

  /**
   *
   * @param symbol
   * @param cutCharNum
   */
  constructor(symbol = "-", cutCharNum = 1) {
    this._symbol = symbol;
    this._cutCharNum = cutCharNum;
  }

  /**
   *  字符串的拼接
   * @param part
   */
  join(part) {
    part && (this._str += `${part}${this._symbol}`);
  }

  /**
   * 字符串的获取
   * @return {string}
   */
  getStr() {
    return this._str.substring(0, this._str.length - this._cutCharNum);
  }
}