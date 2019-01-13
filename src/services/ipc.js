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
  return new Promise((resolve, reject) => {
    ipcRenderer.send('save-part', part)
    ipcRenderer.on('save-part-reply', (event, result) => {
      resolve(result)
    })
    ipcRenderer.on('error', (event, result) => {
      reject(new Error(result))
    })
  })
}

api.getParts = (idCategory) => {
  return new Promise(resolve => {
    ipcRenderer.send('get-parts', idCategory)
    ipcRenderer.on('get-parts-reply', (event, result) => {
      resolve(result)
    })
  })
}

api.getReports = () => {
  return new Promise(resolve => {
    ipcRenderer.send('get-reports')
    ipcRenderer.on('get-reports-reply', (event, result) => {
      resolve(result)
    })
  })
}

api.saveReport = (report) => {
  return new Promise((resolve, reject) => {
    ipcRenderer.send('save-report', report)
    ipcRenderer.on('save-report-reply', (event, result) => {
      resolve(result)
    })
    ipcRenderer.on('error', (event, result) => {
      reject(new Error(result))
    })
  })
}

export default api
