/**
 * @FileName: paging.js
 * @Description: 进行数据的分页  封装对数据分页的细节
 * 放置重复发起不必要的请求，使用数据锁来进行防抖截流
 * @author 毛毛
 * @date 2021-09-28 09:00
 */
import {Http} from "./http";
import boolean from "../miniprogram_npm/lin-ui/common/async-validator/validator/boolean";

class Paging {
  /**
   * 属性：起始位置
   */
  start;
  /**
   * 数量
   */
  count;
  /**
   * 请求对象
   */
  req;
  /**
   * 锁对象 控制请求的发起与否，为true表示正在发起请求，不允许发起二次请求
   * @private
   */
  _locker = false;
  /**
   * 原始的url
   * @private
   */
  _url;
  /**
   * 是否还有更多数据
   * @private
   */
  moreData = true;
  /**
   * 记录所有请求的数据集合
   */
  accumulator = [];

  /**
   *
   * @param req 请求相关数据
   * @param count 数量
   * @param start 获取数据的起始位置
   */
  constructor(req, count = 10, start = 0) {
    this.start = start;
    this.count = count;
    this.req = req;
    this._url = req.url;
  }

  async getMoreData() {
    // 没有更多数据了
    if (!this.moreData) return;
    // 是否可以拿到锁
    if (!this._getLocker()) return;
    // 发起请求
    const data = await this._actualGetData();
    // 释放锁
    this._releaseLocker();
    return data;
  }

  /**
   * return {
      // 是否是空，没有一条数据
      empty: boolean,
      // 当前请求的数据
      items: [],
      // 是否有更多数据
      moreData:boolean,
      // 累加器，将每次请求到的数据放在一起后的数据
      accumulator: []
    }
   * @return {Promise<null|{moreData: boolean, accumulator: *[], items: *[], empty: boolean}>}
   * @private
   */
  async _actualGetData() {
    const req = this._getCurrentReq();
    let paging = await Http.request(req);
    if (!paging) return null;
    // 请求成功
    if (paging.total === 0) { // 一条数据都没有了
      return {
        empty: true,
        items: [],
        moreData: false,
        accumulator: []
      }
    }
    this.moreData = this._moreData(paging.total_page, paging.page);
    // 还有更多数据
    if (this.moreData) {
      this.start += this.count;
    }
    this._accumulator(paging.items);
    return {
      empty: false,
      items: paging.items,
      moreData: this.moreData,
      accumulator: this.accumulator
    }
  }

  /**
   * 合并每次的请求到的分页数据
   * @param items
   * @private
   */
  _accumulator(items) {
    this.accumulator = this.accumulator.concat(items);
  }

  /**
   * 是否还有更多分页，也就是更多数据
   * @param totalPage 总页数
   * @param pageNum 当前页
   * @private
   */
  _moreData(totalPage, pageNum) {
    return pageNum < totalPage - 1;
  }

  /**
   * 设置最新的请求内容并返回
   * @return {object}
   * @private
   */
  _getCurrentReq() {
    let url = this._url;
    const params = `start=${this.start}&count=&${this.count}`;
    if (url.includes("?")) {
      url += "&" + params;
    } else {
      url += "?" + params;
    }
    this.req.url = url;
    return this.req;
  }

  /**
   * 获取锁 是否可以发起请求
   * @return {boolean} false表示不允许发起请求
   * @private
   */
  _getLocker() {
    if (this._locker) return false;
    this._locker = true;
    return true;
  }

  /**
   * 释放锁
   * @private
   */
  _releaseLocker() {
    this._locker = false;
  }
}

export {
  Paging
}
