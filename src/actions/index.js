import api from '../services/ipc'

export const ADD_PART_TO_DB = 'ADD_PART_TO_DB'
export const ADD_PART_TO_REPORT = 'ADD_PART_TO_REPORT'
export const REMOVE_PART_FROM_REPORT = 'REMOVE_PART_FROM_REPORT'
export const CLEAR_REPORT = 'CLEAR_REPORT'
export const RELOAD_PARTS = 'RELOAD_PARTS'
export const INITIAL_STORE = 'INITIAL_STORE'
export const EDIT_PART = 'EDIT'
export const UPDATE_PART = 'UPDATE_PART'
export const ADD_REPORT_TO_ARCHIVE = 'ADD_REPORT_TO_ARCHIVE'
export const INCREMENT_PART_COUNT = 'INCREMENT_PART_COUNT'
export const DECREMENT_PART_COUNT = 'DECREMENT_PART_COUNT'
export const CHANGE_REPORT_NAME = 'CHANGE_REPORT_NAME'
export const LOAD_REPORT_FROM_ARCHIVE = 'LOAD_REPORT_FROM_ARCHIVE'

export const addPartToDB = function (part) {
  api.savePart(part).then(data => {
    console.log(data)
    return { type: ADD_PART_TO_DB, data }
  })
}

export const updatePart = part => ({
  type: UPDATE_PART,
  part
})

export const addPartToReport = item => ({
  type: ADD_PART_TO_REPORT,
  item
})

export const reloadParts = categoryName => ({
  type: RELOAD_PARTS,
  categoryName
})

export const initialStore = function (store) {
  api.getCategories().then(data => {
    console.log(data)
  })
  return {
    type: INITIAL_STORE,
    store
  }
}

export const editPart = editPart => ({
  type: EDIT_PART,
  editPart
})

export const clearReport = () => ({
  type: CLEAR_REPORT
})

export const removePartFromReport = partId => ({
  type: REMOVE_PART_FROM_REPORT,
  partId
})

export const addReportToArchive = report => ({
  type: ADD_REPORT_TO_ARCHIVE,
  report
})

export const incrementPartCount = partId => ({
  type: INCREMENT_PART_COUNT,
  partId
})

export const decrementPartCount = partId => ({
  type: DECREMENT_PART_COUNT,
  partId
})

export const changeReportName = reportName => ({
  type: CHANGE_REPORT_NAME,
  reportName
})

export const loadReportFromArchive = report => ({
  type: LOAD_REPORT_FROM_ARCHIVE,
  report
})
