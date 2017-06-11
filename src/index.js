import '@/actions/index.js'
import {store} from 'san-store'
import {router} from 'san-router'
import App from '@/App.san'
// import App from '@/Debug.san'
import '@/../node_modules/font-awesome/css/font-awesome.min.css'
import '@/../node_modules/codemirror/lib/codemirror.css'
import '@/../node_modules/codemirror/mode/javascript/javascript.js'
// import '@/../node_modules/codemirror/addon/fold/brace-fold.js'
// import '@/../node_modules/codemirror/addon/fold/comment-fold.js'
// import '@/../node_modules/codemirror/addon/fold/foldcode.js'
// import '@/../node_modules/codemirror/addon/fold/foldgutter.js'
// import '@/../node_modules/codemirror/addon/fold/indent-fold.js'
// import '@/../node_modules/codemirror/addon/fold/markdown-fold.js'
// import '@/../node_modules/codemirror/addon/fold/xml-fold.js'

store.dispatch('init')

router.setMode('hash')

router.add({
  rule: '/',
  Component: App,
  target: 'body'
})

router.start()
