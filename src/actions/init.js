import {store} from 'san-store'
import {builder} from 'san-update'
import {Layout} from '@/base/factory.js'

// 初始化 pc 编辑器根布局
store.addAction('initLayout', payload => builder().set('pc.data.layout', new Layout({id: 'sr-root'})))

store.addAction('initInfo', payload => builder().set('pc.data.info', {
  id: 'sr_project',
  title: 'Sanrise Project',
  idOrder: 0
}))

store.addAction('initFragment', payload => builder().set('pc.data.fragment', []))

store.addAction('initVariable', payload => builder().set('pc.data.variable', {
  foo: 'This is a test message',
  bar: 233,
  baz: true,
  qux: true,
  ary: [1, 2, 3],
  obj: {
    a: 1
  }
}))

store.addAction('initEditorPanel', payload => builder().set('pc.panel', 'layout'))

store.addAction('init', (payload, {dispatch}) => {
  dispatch('initInfo')
  dispatch('initFragment')
  dispatch('initVariable')
  dispatch('initLayout')
  dispatch('initEditorPanel')
})
