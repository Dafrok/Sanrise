import {store} from 'san-store'

export class Widget {
  constructor (options = {}) {
    this.type = 1
  }
}

export class Layout {
  constructor (options = {}) {
    store.dispatch('genId')
    this.type = 0
    this.id = `sr-${store.getState('pc.data.info.idOrder')}`
    this.children = options.children || []
    this.style = options.style || {height: '100px'}
  }
}