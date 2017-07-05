export const types = {
  Object: '无序列表',
  Array: '有序列表',
  Number: '数字',
  String: '字符串',
  Boolean: '布尔值',
  Null: '空'
}
export const typesList = Object.keys(types).map(key => ({name: types[key], value: key}))
