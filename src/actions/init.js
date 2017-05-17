import {store} from 'san-store'
import {builder} from 'san-update'
import {Layout} from '@/base/factory.js'

store.addAction('initLayout', payload => builder().set('pc.data.layout', new Layout()))

store.addAction('initInfo', payload => builder().set('pc.data.info', {
  title: 'Sanrise Project',
  idOrder: 0
}))

store.addAction('initFragment', payload => builder().set('pc.data.fragment', []))

store.addAction('initVariable', payload => builder().set('pc.data.variable', {}))

store.addAction('init', (payload, {dispatch}) => {
  dispatch('initInfo')
  dispatch('initFragment')
  dispatch('initVariable')
  dispatch('initLayout')
})

store.addAction('genId', (payload, {getState}) => builder().set('pc.data.info.idOrder', getState('pc.data.info.idOrder') + 1))

store.addAction('activeLayout', (payload, {getState}) => builder().set('pc.activeLayout', getState('pc.activeLayout') === payload ? null : payload))
store.addAction('activeLayoutForce', (payload, {getState}) => builder().set('pc.activeLayout', payload))

store.addAction('addLayout', (payload, {getState}) => {
  const activeLayout = getState('pc.activeLayout')
  return activeLayout && builder().push(`pc.data.${activeLayout}.children`, new Layout())
})

store.addAction('toggleLayout', (payload, {getState}) => {
  const path = `pc.data.${getState('pc.activeLayout')}.hidden`
  const state = getState(path)
  return builder().set(path, !state)
})


store.addAction('removeLayout', (payload, {getState, dispatch}) => {
  const activeLayout = (getState('pc.activeLayout') || '').split('.')
  const children = activeLayout.splice(-1)
  const index = (children[0].match(/children\[(.+)\]/) || 0)[1]
  dispatch('activeLayout', null)
  return activeLayout.length > 0 && index !== undefined && builder().splice(`pc.data.${activeLayout.join('.')}.children`, +index, 1)
})

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