import {store} from 'san-store'
import {builder} from 'san-update'

store.addAction('updateVariable', (payload = {}) => builder().set(`pc.data.variable`, payload))