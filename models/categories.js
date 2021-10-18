/**
 * @FileName: categories.js
 * @Description: 向服务器请求数据 菜单数据
 * @author 毛毛
 * @date 2021-10-17 21:33
 */
import {Http} from "../utils/http";

export class Categories {
  /**
   * 一级分类
   * @type {[]}
   */
  _roots = [];
  /**
   * 二级分类
   * @type {[]}
   */
  _subs = [];

  async getAll() {
    const {roots, subs} = await Http.request({
      url: `category/all`,
    });
    this._roots = roots;
    this._subs = subs;
  }

  get roots() {
    return this._roots;
  }

  /**
   * 根据一级菜单 获取一级菜单的子菜单
   * @param parentId {number}
   * @return {[]}
   */
  getSubs(parentId) {
    // 拿到所有的符合要求的二级菜单
    // TODO 那边给的数据必须是数字类型
    return this._subs.filter(sub => sub.parent_id === parentId);
  }

  getRoot(rootId) {
    return this._roots.find(r => r.id === rootId);
  }
}