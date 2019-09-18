// 封装localStorage方法

// 读取localStorage的数据
function getItem(key) {
  const result = window.localStorage.getItem(key);
  return JSON.parse(result);
}

// 设置localStorage的数据
function setItem(key,value) {
  window.localStorage.setItem(key, JSON.stringify(value));
}

// 删除localStorage的数据
function removeItem(key) {
  window.localStorage.removeItem(key);
}

// 暴露出去
export {
  getItem,
  setItem,
  removeItem
}
