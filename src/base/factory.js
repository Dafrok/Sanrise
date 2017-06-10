import {store} from 'san-store'

// 构造组件
export class Widget {
  constructor (options = {}) {
    this.type = 1
  }
}

// 构造布局块
export class Layout {
  constructor (options = {}) {
    this.type = 0
    this.id = options.id || store.dispatch('genId') || `sr-${store.getState('pc.data.info.idOrder')}`
    this.children = options.children || []
    this.events = []
    this.unit = {
      pos: 'px',
      size: 'px'
    }
    this.axis = 'lt'
    this.style = options.style || {height: '100px', position: 'absolute', width: '100px'}
  }
}