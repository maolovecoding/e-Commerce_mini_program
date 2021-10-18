/**
 * @FileName: search.js
 * @Description: TODO
 * @author 毛毛
 * @date 2021-10-18 08:44
 */

import {Paging} from "../utils/paging";

class Search{
  static search(q){
    return new Paging({
      url:`search?q=${q}`
    })
  }
}

export {
  Search
}