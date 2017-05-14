import {store} from 'san-store'
import {builder} from 'san-update'
import {Layout} from '@/base/factory.js'

store.addAction('initLayout', payload => builder().set('layout', new Layout()))

store.addAction('initInfo', payload => builder().set('info', {
  title: 'Sanrise Project',
  idOrder: 0
}))

store.addAction('initFragment', payload => builder().set('fragment', []))

store.addAction('initVariable', payload => builder().set('variable', {}))


store.addAction('init', (payload, {dispatch}) => {
  dispatch('initInfo')
  dispatch('initFragment')
  dispatch('initVariable')
  dispatch('initLayout')
})

store.addAction('genId', (payload, {getState}) => builder().set('info.idOrder', getState('info.idOrder') + 1))