import {checkType} from '@/base/util.js'
export default {
  append (opts) {
    if (typeof opts === 'string') {
      this.fire('append', [this.data.get('path'), opts])
    } else if (typeof opts === 'undefined') {
      this.fire('append', [this.data.get('path')])
    } else {
      opts.unshift(this.data.get('path'))
      this.fire('append', opts)
    }
  },
  push (opts) {
    if (typeof opts === 'string') {
      this.fire('push', [this.data.get('path'), opts])
    } else if (typeof opts === 'undefined') {
      this.fire('push', [this.data.get('path')])
    } else {
      opts.unshift(this.data.get('path'))
      this.fire('push', opts)
    }
  },
  unshift (opts) {
    if (typeof opts === 'string') {
      this.fire('unshift', [this.data.get('path'), opts])
    } else if (typeof opts === 'undefined') {
      this.fire('unshift', [this.data.get('path')])
    } else {
      opts.unshift(this.data.get('path'))
      this.fire('unshift', opts)
    }
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
            console.log(typeof data[key])
            result.push({key, value: data[key], leaf: checkType(data[key]) !== 'Object' && checkType(data[key]) !== 'Array', type: checkType(data[key])})
          }
          return result
        default:
          return null
      }
    }
  }
}