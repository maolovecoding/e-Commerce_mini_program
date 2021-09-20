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

export {
  promisic
}