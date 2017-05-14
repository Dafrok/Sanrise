import {store} from 'san-store'

export class Widget {
  constructor (options = {}) {
    this.isLayout = false
  }
}

export class Layout {
  constructor (options = {}) {
    store.dispatch('genId')
    this.isLayout = true
    this.id = `sr-${store.getState('info.idOrder')}`
    this.children = options.children || []
    this.style = options.style || {}
  }
}