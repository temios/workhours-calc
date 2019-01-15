import api from './services/ipc'
import {
  addCategory,
  loadArchive,
  loadCategories,
  reloadParts,
  showAlert
} from './actions'
const { ipcRenderer } = window.require('electron')

export const onLoad = store => {
  api.getCategories().then((data) => {
    store.dispatch(loadCategories(data))
    return data
  }).then(categories => {
    if (categories !== undefined && categories.length > 0) {
      let currentCat = categories[0]
      api.getParts(currentCat.id).then((parts) => {
        store.dispatch(reloadParts(currentCat.id, parts))
      })
    }
  })

  api.getReports().then(data => {
    store.dispatch(loadArchive(data))
  })

  ipcRenderer.on('add-category-reply', (event, category) => {
    store.dispatch(addCategory(category))
    api.getParts(category.id).then(parts => {
      store.dispatch(reloadParts(category.id, parts))
    })
  })

  ipcRenderer.on('error', (event, result) => {
    store.dispatch(showAlert({ text: result, color: 'danger' }))
  })
}
