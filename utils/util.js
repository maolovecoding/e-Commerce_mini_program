// 将非promise返回值函数的返回结果转为promise
const promisic = fn => {
  return (params = {}) => {
    // 代理模式
    return new Promise((resolve, reject) => {
      // 将源对象合并到目标对象 target source
      const args = Object.assign(params, {
        success: res => {
          resolve(res);
        },
        fail: res => {
          reject(res);
        }
      });
      fn(args);
    });
  };
};

/**
 * 实现 组合
 * @param arr 待选数组
 * @param size 从数组里面要抽几个元素进行组合
 */
function combination(arr, size) { // ["1-45","3-9","4-14"] 1
  const r = [];

  /**
   *
   * @param target 生成的组合
   * @param sourceArr 源数组
   * @param n 求的组合中剩余的抽取的数量
   * @private
   */
  function _(target, sourceArr, n) { // [] ["1-45","3-9","4-14"] 1
    if (n === 0) {
      r[r.length] = target; // [["1-45"]]
      return;
    }
    // l = 2
    for (let i = 0, l = sourceArr.length - n; i <= l; i++) {
      let b = target.slice(); // []
      b.push(sourceArr[i]);// ["1-45"]
      _(b, sourceArr.slice(i + 1), n - 1); // ["1-45"] ["3-9","4-14"] 0
    }
  }

  _([], arr, size); // [] ["1-45","3-9","4-14"] 1
  return r;
}

export {
  promisic,
  combination
}