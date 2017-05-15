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

store.addAction('addLayout', (payload, {getState}) => {
  const activeLayout = getState('pc.activeLayout')
  return activeLayout && builder().push(`pc.data.${activeLayout}.children`, new Layout())
})

store.addAction('removeLayout', (payload, {getState, dispatch}) => {
  const activeLayout = (getState('pc.activeLayout') || '').split('.')
  const children = activeLayout.splice(-1)
  const index = (children[0].match(/children\[(.+)\]/) || 0)[1]
  dispatch('activeLayout', null)
  return activeLayout.length > 0 && index !== undefined && builder().splice(`pc.data.${activeLayout.join('.')}.children`, +index, 1)
})