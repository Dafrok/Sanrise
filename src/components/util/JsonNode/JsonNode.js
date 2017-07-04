import {checkType} from '@/base/util.js'
export default {
  unshift (opts) {
    const path = this.data.get('data.key')
    this.data.get('root') && opts.unshift(path)
    this.fire('unshift', opts)
  },
  push (opts) {
    const path = this.data.get('data.key')
    this.data.get('root') && opts.unshift(path)
    this.fire('push', opts)
  },
  update (opts) {
    const path = this.data.get('data.key')
    this.data.get('root') && opts.unshift(path)
    this.fire('update', opts)
  },
  changeType (opts) {
    const path = this.data.get('data.key')
    this.data.get('root') && opts.unshift(path)
    this.fire('changetype', opts)
  },
  changeKey (opts) {
    const path = this.data.get('data.key')
    this.data.get('root') && opts.unshift(path)
    this.fire('changekey', opts)
  },
  add (opts) {
    const path = this.data.get('data.key')
    this.data.get('root') && opts.unshift(path)
    this.fire('add', opts)
  },
  remove (opts) {
    const path = this.data.get('data.key')
    this.data.get('root') && opts.unshift(path)
    this.fire('remove', opts)
  },
  expand (opts) {
    const path = this.data.get('data.key')
    this.data.get('root') && opts.unshift(path)
    this.fire('expand', opts)
  }
}