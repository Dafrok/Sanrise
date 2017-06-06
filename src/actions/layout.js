import {store} from 'san-store'
import {builder} from 'san-update'
import {Layout} from '@/base/factory.js'

global.store = store

// 生成区块 ID
store.addAction('genId', (payload, {getState}) => builder().set('pc.data.info.idOrder', getState('pc.data.info.idOrder') + 1))

// 激活 / 取消激活区块
store.addAction('activeLayout', (payload, {getState}) => builder().set('pc.activeLayout', getState('pc.activeLayout') === payload ? null : payload))

// 强制激活区块
store.addAction('activeLayoutForce', (payload, {getState}) => builder().set('pc.activeLayout', payload))

// 在被激活区块下添加子区块
store.addAction('addLayout', (payload, {getState}) => {
  const activeLayout = getState('pc.activeLayout')
  return activeLayout && builder().push(`pc.data.${activeLayout}.children`, new Layout())
})

// 隐藏 / 显示被激活区块
store.addAction('toggleLayout', (payload, {getState}) => {
  const path = `pc.data.${getState('pc.activeLayout')}.hidden`
  const state = getState(path)
  return builder().set(path, !state)
})

// 删除被激活区块
store.addAction('removeLayout', (payload, {getState, dispatch}) => {
  const activeLayout = (getState('pc.activeLayout') || '').split('.')
  const children = activeLayout.splice(-1)
  const index = (children[0].match(/children\[(.+)\]/) || 0)[1]
  dispatch('activeLayout', null)
  return activeLayout.length > 0 && index !== undefined && builder().splice(`pc.data.${activeLayout.join('.')}.children`, +index, 1)
})

// 查空 / 查重后更改区块 ID
store.addAction('updateLayoutId', (payload, {getState}) => {
  const layout = getState('pc.data.layout')
  const walkLayout = (layout, callback) => {
    let res = callback(layout)
    !res && layout.children && layout.children.forEach(item => res = res || walkLayout(item, callback))
    return res
  }
  if (!payload.value) {
    // id 为空时执行
    return
  }
  if (walkLayout(layout, layout => layout.id === payload.value)) {
    // id 重复时执行
    return
  }
  return builder().set(`pc.data.${payload.path}.id`, payload.value)
})

// 更新区块样式
store.addAction('updateLayoutStyle', (payload, {getState}) => builder().set(`pc.data.${getState('pc.activeLayout')}.style.${payload.key}`, payload.value))

// 更新区块坐标轴
store.addAction('updateLayoutAxis', (payload, {getState}) => builder().set(`pc.data.${getState('pc.activeLayout')}.axis`, payload))

// 更新区块坐标轴
store.addAction('setLayoutAxis', (payload, {getState, dispatch}) => {
  dispatch('updateLayoutStyle', {key: 'top', value: ~payload.indexOf('t') ? '0px' : 'auto'})
  dispatch('updateLayoutStyle', {key: 'left', value: ~payload.indexOf('l') ? '0px' : 'auto'})
  dispatch('updateLayoutStyle', {key: 'bottom', value: ~payload.indexOf('b') ? '0px' : 'auto'})
  dispatch('updateLayoutStyle', {key: 'right', value: ~payload.indexOf('r') ? '0px' : 'auto'})
  dispatch('updateLayoutAxis', payload)
})

store.addAction('updateLayoutUnit', (payload, {getState}) => builder().set(`pc.data.${getState('pc.activeLayout')}.unit`, payload))

store.addAction('setLayoutUnit', (payload, {getState, dispatch}) => {
  dispatch('updateLayoutUnit', payload)
})