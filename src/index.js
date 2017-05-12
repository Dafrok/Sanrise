import {store} from 'san-store'
import {builder} from 'san-update'

store.addAction('initLayout', name => builder().set('layout', {
  id: null,
  style: {},
  children: [
    {
      id: null,
      type: 0,
      style: {},
      children: []
    },
    {
      id: null,
      type: 1,
      style: {},
      children: []
    }
  ]
}))

store.addAction('initInfo', name => builder().set('info', {
  title: 'Sanshine',
}))

store.addAction('initFragment', name => builder().set('fragments', [{
  name: 'fragment-1',
  style: {},
  children: []
}]))