const { ipcRenderer } = window.require('electron')

let api = {}

api.getCategories = () => {
  return new Promise(resolve => {
    ipcRenderer.send('get-categories')
    ipcRenderer.on('categories-reply', (event, result) => {
      resolve(result)
    })
  })
}

api.savePart = (part) => {
  return new Promise(resolve => {
    ipcRenderer.send('save-part', part)
    ipcRenderer.on('save-part-reply', (event, result) => {
      resolve(result)
    })
  })
}

export default api
