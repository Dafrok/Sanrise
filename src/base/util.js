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