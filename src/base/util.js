import {store} from 'san-store'

export const getCurrentLayout = (layout, activeLayoutPath) => {
  const path = (activeLayoutPath || '')
    .split('.')
    .map(item => item.replace(/^children\[(.+?)\]$/g, '$1'))
  return path.reduce((obj, item, index) => {
    if (index === 0) {
      return obj
    } else {
      return obj.children[item]
    }
  }, layout)
}

export const checkType = str => Object.prototype.toString.call(str).slice(8, -1)

export const isEmpty = val => !(val === 0 || !!val)

export const toArray = (key, value) => {
  const ret = {
    key,
    type: checkType(value)
  }
  switch (ret.type) {
    case 'Array':
      ret.children = []
      for (const key in value) {
        if (Number(key) === (key | 0)) {
          ret.children.push(toArray(null, value[key]))
        } else {
          ret[key] = value[key]
        }
      }
      break
    case 'Object':
      ret.children = []
      for (const key in value) {
        ret.children.push(toArray(key, value[key]))
      }
      break
    default:
      ret.value = value
      break
  }
  return ret
}