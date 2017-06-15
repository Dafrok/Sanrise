import {store} from 'san-store'
import {builder} from 'san-update'

// mock project list
const getProjectList = keyword => new Promise(resolve => setTimeout(() => {
  resolve((new Array(100)).fill(0).map((item, index) => ({id: `zt${index}`, name: `专题 - ${index}`})))
}, 0))

const updateProjectList = res => store.dispatch('updateProjectList', res)

store.addAction('loadProjectList', payload => getProjectList().then(updateProjectList))

store.addAction('updateProjectList', payload => builder().set('pc.projectList', payload))

