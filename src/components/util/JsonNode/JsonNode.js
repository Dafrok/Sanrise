import {checkType} from '@/base/util.js'
export default {
  // append (opts) {
  //   if (typeof opts === 'string') {
  //     this.fire('append', [this.data.get('path'), opts])
  //   } else if (typeof opts === 'undefined') {
  //     this.fire('append', [this.data.get('path')])
  //   } else {
  //     opts.unshift(this.data.get('path'))
  //     this.fire('append', opts)
  //   }
  // },
  // push (opts) {
  //   if (typeof opts === 'string') {
  //     this.fire('push', [this.data.get('path'), opts])
  //   } else if (typeof opts === 'undefined') {
  //     this.fire('push', [this.data.get('path')])
  //   } else {
  //     opts.unshift(this.data.get('path'))
  //     this.fire('push', opts)
  //   }
  // },
  // unshift (opts) {
  //   if (typeof opts === 'string') {
  //     this.fire('unshift', [this.data.get('path'), opts])
  //   } else if (typeof opts === 'undefined') {
  //     this.fire('unshift', [this.data.get('path')])
  //   } else {
  //     opts.unshift(this.data.get('path'))
  //     this.fire('unshift', opts)
  //   }
  // },
  // update (opts) {
  //   this.fire('update', opts)
  // },
  push (opts) {
    const path = this.data.get('data.key')
    this.data.get('root') && opts.unshift(path)
    this.fire('push', opts)
  },
  changeType (opts) {
    const path = this.data.get('data.key')
    this.data.get('root') && opts.unshift(path)
    this.fire('changetype', opts)
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