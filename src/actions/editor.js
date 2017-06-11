import {store} from 'san-store'
import {builder} from 'san-update'

store.addAction('switchEditorPanel', payload => builder().set('pc.panel', payload))