import {checkType} from '@/base/util.js'
export default {
  append (opts) {
    opts && opts.path.unshift(this.data.get('path'))
    this.fire('append', opts || {
      path: [`${this.data.get('path')}` ,'newData'],
      value: ''
    })
  },
  remove (opts) {
    if (typeof opts === 'string') {
      const path = opts.unshift ? opts : [opts]
      this.fire('remove', [this.data.get('path'), path])
    } else {
      opts.unshift(this.data.get('path'))
      this.fire('remove', opts)
    }
  },
  update (opts) {
    this.fire('update', opts)
  },
  computed: {
    sub () {
      const data = this.data.get('data')
      const type = checkType(data)
      switch (type) {
        case 'Array':
        case 'Object':
          const result = []
          for (const key in data) {
            result.push({key, value: data[key], leaf: typeof data[key] !== 'object', type: checkType(data[key])})
          }
          return result
        default:
          return null
      }
    }
  }
}