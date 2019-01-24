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
  allowRewriteDialog: false,
  sum: 0
}

const reportReducer = (state = initialState, action) => {
  let items = []
  let sum = 0
  let targetId
  switch (action.type) {
    case ADD_PART_TO_REPORT:
      items = [...state.items, action.item]
      sum = sumHour(items)
      return { ...state, items: items, sum: sum }
    case CLEAR_REPORT:
      return {
        ...state,
        items: [],
        reportName: '',
        allowRewrite: false,
        allowRewriteDialog: false,
        sum: 0
      }
    case REMOVE_PART_FROM_REPORT:
      targetId = action.partId
      items = state.items.filter((item) => {
        return item.part.id !== targetId
      })
      sum = sumHour(items)
      return { ...state, items: items, sum: sum }
    case INCREMENT_PART_COUNT:
      targetId = action.partId
      items = state.items.map((item) => {
        if (item.part.id === targetId) {
          item.count++
        }
        return item
      })
      sum = sumHour(items)
      return { ...state, items: items, sum: sum }
    case DECREMENT_PART_COUNT:
      targetId = action.partId
      items = state.items.map((item) => {
        if (item.part.id === targetId) {
          item.count--
        }
        return item
      })
      sum = sumHour(items)
      return { ...state, items: items, sum: sum }
    case CHANGE_REPORT_NAME:
      return { ...state, reportName: action.reportName }
    case LOAD_REPORT_FROM_ARCHIVE:
      sum = sumHour(action.items)
      return {
        ...state,
        reportName: action.report.name,
        items: action.items,
        sum: sum
      }
    case ALLOW_REWRITE_DIALOG:
      return { ...state, allowRewriteDialog: action.open }
    default:
      return state
  }
}

function sumHour (items) {
  return items.reduce((sum, item) => {
    return parseFloat((sum + (item.count * item.part.hour)).toFixed(3))
  }, 0)
}

export default reportReducer
