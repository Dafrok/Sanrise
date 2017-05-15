import {store} from 'san-store'
import {builder} from 'san-update'
import {Layout} from '@/base/factory.js'

store.addAction('initLayout', payload => builder().set('pc.data.layout', new Layout()))

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
