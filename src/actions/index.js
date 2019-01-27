export const LOAD_CATEGORIES = 'LOAD_CATEGORIES'
export const ADD_CATEGORY = 'ADD_CATEGORY'
export const ADD_PART_TO_REPORT = 'ADD_PART_TO_REPORT'
export const REMOVE_PART_FROM_REPORT = 'REMOVE_PART_FROM_REPORT'
export const CLEAR_REPORT = 'CLEAR_REPORT'
export const RELOAD_PARTS = 'RELOAD_PARTS'
export const EDIT_PART = 'EDIT'
export const ADD_REPORT_TO_ARCHIVE = 'ADD_REPORT_TO_ARCHIVE'
export const INCREMENT_PART_COUNT = 'INCREMENT_PART_COUNT'
export const DECREMENT_PART_COUNT = 'DECREMENT_PART_COUNT'
export const CHANGE_REPORT_NAME = 'CHANGE_REPORT_NAME'
export const LOAD_REPORT_FROM_ARCHIVE = 'LOAD_REPORT_FROM_ARCHIVE'
export const LOAD_ARCHIVE = 'LOAD_ARCHIVE'
export const ALLOW_REWRITE_DIALOG = 'ALLOW_REWRITE_DIALOG'
export const SHOW_ALERT = 'SHOW_ALERT'
export const CLOSE_ALERT = 'CLOSE_ALERT'
export const REDIRECT_FROM_PART = 'REDIRECT_FROM_PART'
export const SHOW_PICTURE = 'SHOW_PICTURE'
export const CLOSE_PICTURE = 'CLOSE_PICTURE'
export const SAVE_REPORT_PICTURE = 'SAVE_REPORT_PICTURE'

export const loadCategories = categories => ({
  type: LOAD_CATEGORIES,
  categories
})

export const addCategory = category => ({
  type: ADD_CATEGORY,
  category
})

export const addPartToReport = item => ({
  type: ADD_PART_TO_REPORT,
  item
})

export const reloadParts = (categoryId, parts) => ({
  type: RELOAD_PARTS,
  categoryId,
  parts
})

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

export const saveReportPicture = src => ({
  type: SAVE_REPORT_PICTURE,
  src
})

export const loadReportFromArchive = (report, items) => ({
  type: LOAD_REPORT_FROM_ARCHIVE,
  report,
  items
})

export const loadArchive = reports => ({
  type: LOAD_ARCHIVE,
  reports
})

export const allowRewriteDialog = (open) => ({
  type: ALLOW_REWRITE_DIALOG,
  open
})

export const showAlert = (alert) => ({
  type: SHOW_ALERT,
  text: alert.text,
  color: alert.color
})

export const closeAlert = () => ({
  type: CLOSE_ALERT
})

export const redirectFromPart = (flag) => ({
  type: REDIRECT_FROM_PART,
  flag
})

export const showPicture = (picture) => ({
  type: SHOW_PICTURE,
  picture
})

export const closePicture = () => ({
  type: CLOSE_PICTURE
})
