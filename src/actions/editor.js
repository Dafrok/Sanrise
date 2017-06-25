import {store} from 'san-store'
import {builder} from 'san-update'

store.addAction('switchEditorPanel', payload => builder().set('pc.panel', payload))

store.addAction('loadProject', payload => builder().set('pc.data', JSON.parse(localStorage.getItem('project'))))
store.addAction('saveProject', (payload, {getState}) => localStorage.setItem('project', JSON.stringify(getState('pc.data'))))