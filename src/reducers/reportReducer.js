import {
  ADD_PART_TO_REPORT, ALLOW_REWRITE_DIALOG,
  CHANGE_REPORT_NAME,
  CLEAR_REPORT,
  DECREMENT_PART_COUNT,
  INCREMENT_PART_COUNT,
  LOAD_REPORT_FROM_ARCHIVE,
  REMOVE_PART_FROM_REPORT
} from '../actions'

let initialState = {
  items: [],
  reportName: '',
  allowRewriteDialog: false
}

const reportReducer = (state = initialState, action) => {
  let items = []
  let targetId
  switch (action.type) {
    case ADD_PART_TO_REPORT:
      items = [...state.items, action.item]
      return { ...state, items: items }
    case CLEAR_REPORT:
      return {
        ...state,
        items: [],
        reportName: '',
        allowRewrite: false,
        allowRewriteDialog: false
      }
    case REMOVE_PART_FROM_REPORT:
      targetId = action.partId
      items = state.items.filter((item) => {
        return item.part.id !== targetId
      })
      return { ...state, items: items }
    case INCREMENT_PART_COUNT:
      targetId = action.partId
      items = state.items.map((item) => {
        if (item.part.id === targetId) {
          item.count++
        }
        return item
      })
      return { ...state, items: items }
    case DECREMENT_PART_COUNT:
      targetId = action.partId
      items = state.items.map((item) => {
        if (item.part.id === targetId) {
          item.count--
        }
        return item
      })
      return { ...state, items: items }
    case CHANGE_REPORT_NAME:
      return { ...state, reportName: action.reportName }
    case LOAD_REPORT_FROM_ARCHIVE:
      return { ...state, reportName: action.report.name, items: action.items }
    case ALLOW_REWRITE_DIALOG:
      return { ...state, allowRewriteDialog: action.open }
    default:
      return state
  }
}

export default reportReducer
