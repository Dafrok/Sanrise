import {store} from 'san-store'
import {builder} from 'san-update'
import {Layout} from '@/base/factory.js'

// 初始化 pc 编辑器根布局
store.addAction('initLayout', payload => builder().set('pc.data.layout', new Layout({id: 'sr-root'})))

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
