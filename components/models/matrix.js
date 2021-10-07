/**
 * @FileName: matrix.js
 * @Description: 对矩阵的转置
 * @author 毛毛
 * @date 2021-10-01 20:28
 */


class Matrix {
  /**
   * 封装了二维的所有规格的集合
   */
  matrix;

  constructor(matrix) {
    this.matrix = matrix;
  }

  /**
   * 获取行数
   * @return {number}
   */
  get rowNum() {
    return this.matrix.length;
  }

  /**
   * 获取列数
   * @return {number}
   */
  get colNum() {
    // return this.matrix[0]?.length ?? 0;
    return this.matrix[0]?.length;
  }

  /**
   * 遍历二维数组 取出每项规格值
   * @param callback {function} 回调函数
   */
  each(callback) {
    // 先遍历列 为外循环
    for (let col = 0; col < this.colNum; col++) {
      for (let row = 0; row < this.rowNum; row++) {
        callback(this.matrix[row][col], row, col);
      }
    }
  }

  /**
   * 实现矩阵转置
   * @return {*[]}
   */
  transpose() {
    const desArr = [];
    // 先对列进行转换 转换后变为行
    for (let col = 0; col < this.colNum; col++) {
      desArr[col] = [];
      // 拿到每个具体的元素了
      for (let row = 0; row < this.rowNum; row++) {
        desArr[col][row] = this.matrix[row][col];
      }
    }
    /*
     [
        [{1}, {2}, {3}],
        [{4}, {5}, {6}],
        [{7}, {8}, {9}],
        [{10}, {11}, {12}],
     ]
     [
        [{1}, {4}, {7}, {10}]
        [{2}, {5}, {8}, {11}]
        [{3}, {6}, {9}, {12}]
     ]

    * */
    return desArr;
  }

}

export {Matrix}