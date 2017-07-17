import {store} from 'san-store'
import {builder} from 'san-update'
import {Layout} from '@/base/factory.js'

// global.store = store

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

store.addAction('updateLayout', (payload, {getState}) => {
  const targetPath = payload.path || getState('pc.activeLayout')
  const path = `pc.data${targetPath ? '.' + targetPath : ''}`
  return builder().set(path, payload.value)
})

// 隐藏 / 显示被激活区块
store.addAction('toggleLayout', (payload, {getState}) => {
  const path = `pc.data.${payload || getState('pc.activeLayout')}.hidden`
  return builder().set(path, !getState(path))
})

// 删除被激活区块
store.addAction('removeLayout', (payload, {getState, dispatch}) => {
  const activeLayout = (payload || getState('pc.activeLayout') || '').split('.')
  const children = activeLayout.splice(-1)
  const index = (children[0].match(/children\[(.+)\]/) || 0)[1]
  dispatch('activeLayout', null)
  return activeLayout.length > 0 && index !== undefined && builder().splice(`pc.data.${activeLayout.join('.')}.children`, +index, 1)
})

// 查空 / 查重后更改区块 ID
store.addAction('updateLayoutId', (payload, {getState}) => {
  const layout = getState('pc.data.layout')
  const target = getState(`pc.data.${payload.path}`)
  const walkLayout = (layout, callback, target) => {
    let res = layout !== target && callback(layout)
    !res && layout.children && layout.children.forEach(item => res = (res || walkLayout(item, callback, target)))
    return res
  }
  if (!payload.value) {
    // id 为空时重置 id
    return
  }
  if (walkLayout(layout, layout => layout.id === payload.value, target)) {
    // id 重复时，为 id 插入 '-copy' 后缀
    return builder().set(`pc.data.${payload.path}.id`, `${payload.value}-copy`)
  }
  return builder().set(`pc.data.${payload.path}.id`, payload.value)
})

// 更新区块样式
store.addAction('updateLayoutStyle', (payload, {getState}) => builder().set(`pc.data.${getState('pc.activeLayout')}.style.${payload.key}`, payload.value))

// 更新区块坐标轴
store.addAction('updateLayoutAxis', (payload, {getState}) => builder().set(`pc.data.${getState('pc.activeLayout')}.axis`, payload))

// 更新区块坐标轴
store.addAction('setLayoutAxis', (payload, {getState, dispatch}) => {
  ['left', 'right', 'top', 'bottom'].forEach(key => dispatch('updateLayoutStyle', {key, value: ~payload.indexOf(key[0]) ? '0px' : 'auto'}))
  dispatch('updateLayoutAxis', payload)
})

store.addAction('updateLayoutPosUnit', (payload, {getState}) => builder().set(`pc.data.${getState('pc.activeLayout')}.unit.pos`, payload))

store.addAction('setLayoutPosUnit', (payload, {getState, dispatch}) => {
  dispatch('updateLayoutPosUnit', payload)
})

store.addAction('updateLayoutSizeUnit', (payload, {getState}) => builder().set(`pc.data.${getState('pc.activeLayout')}.unit.size`, payload))

store.addAction('setLayoutSizeUnit', (payload, {getState, dispatch}) => {
  dispatch('updateLayoutSizeUnit', payload)
})

store.addAction('setLayoutLink', (payload = {}, {getState}) => {
  const {href, target} = payload
  const path = `pc.data.${getState('pc.activeLayout')}.link`
  return builder().set(path, {
    href: getState(path + '.href') || href,
    target: target ? target : '_blank'
  })
})

store.addAction('setLayoutText', (payload = {}, {getState}) => builder().set(`pc.data.${getState('pc.activeLayout')}.text`, payload))
store.addAction('setLayoutLive', (payload = {}, {getState}) => builder().set(`pc.data.${getState('pc.activeLayout')}.isLive`, payload))
