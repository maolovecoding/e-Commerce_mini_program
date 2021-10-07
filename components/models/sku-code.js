/**
 * @FileName: sku-code.js
 * @Description: 拆解服务器返回的 每个单品sku的code码， code: "2$1-45#3-9#4-14"
 * 每个单品sku的码code都可以唯一确定当前单品
 * 第一个数字2 表示的是spu视频的唯一标识
 * $ 标识符 后面的都是当前spu视频的规格
 * 1-45 1 是规格的唯一标识， 45 是规格值的唯一标识
 * 每个不同规格都是通过 # 分割
 * @author 毛毛
 * @date 2021-10-05 15:25
 */
import {combination} from "../../utils/util";

export class SkuCode {
  /**
   * sku状态码 决定唯一单品
   */
  code;
  /**
   * spu的唯一标识
   */
  spuId;
  /**
   * 当前sku单品的的所有规格值组合
   */
  totalSeqments = [];

  constructor(code) {
    this.code = code;
    this._splitToSeqments();
  }

  /**
   *  code: "2$1-45#3-9#4-14"
   *  拆解状态码
   * @private
   */
  _splitToSeqments() {
    const spuAndSpec = this.code.split("$");
    this.spuId = spuAndSpec[0];
    // 1-45#3-9#4-14 ["1-45","3-9","4-14"]
    const specCodeArray = spuAndSpec[1].split("#");
    // 调用次数
    const count = specCodeArray.length;
    for (let i = 1; i <= count; i++) {
      const seqments = combination(specCodeArray, i);
      // 二维数组 转 一维
      const newSeqments = seqments.map(segs => segs.join("#"));
      this.totalSeqments.push(...newSeqments);
    }
    console.log(this.totalSeqments);
  }
}
