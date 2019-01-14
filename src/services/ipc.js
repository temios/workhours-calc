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
  })
}

api.editPart = (part) => {
  return new Promise((resolve, reject) => {
    ipcRenderer.send('edit-part', part)
    ipcRenderer.on('edit-part-reply', (event, result) => {
      resolve(result)
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

api.getReportParts = (report) => {
  return new Promise(resolve => {
    ipcRenderer.send('get-report-parts', report)
    ipcRenderer.on('get-report-parts-reply', (event, result) => {
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
  })
}

api.checkReportName = (reportName) => {
  return new Promise(resolve => {
    ipcRenderer.send('check-report-name', reportName)
    ipcRenderer.on('check-report-name-reply', (event, result) => {
      resolve(result)
    })
  })
}

api.savePdf = (report) => {
  return new Promise(resolve => {
    ipcRenderer.send('generate-pdf', report)
    ipcRenderer.on('generate-pdf-reply', (event, result) => {
      resolve(result)
    })
  })
}

export default api
