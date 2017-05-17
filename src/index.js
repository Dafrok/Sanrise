import '@/actions/init.js'
import {store} from 'san-store'
import {router} from 'san-router'
import App from '@/App.san'
import '@/../node_modules/font-awesome/css/font-awesome.min.css'

store.dispatch('init')

router.setMode('hash')

router.add({
  rule: '/',
  Component: App,
  target: 'body'
})

router.start()
