import {
  ADD_PART_TO_REPORT,
  CHANGE_REPORT_NAME,
  CLEAR_REPORT,
  DECREMENT_PART_COUNT,
  INCREMENT_PART_COUNT,
  LOAD_REPORT_FROM_ARCHIVE,
  REMOVE_PART_FROM_REPORT
} from '../actions'

let initialState = {
  items: [],
  reportName: ''
}

const reportReducer = (state = initialState, action) => {
  let items = []
  let targetId
  switch (action.type) {
    case ADD_PART_TO_REPORT:
      items = [...state.items, action.item]
      return { ...state, items: items }
    case CLEAR_REPORT:
      return { ...state, items: [], reportName: '' }
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
      items = []
      window.fetch('/mock.json').then((response) => { // TODO: remove from reducer
        return response.json()
      }).then((data) => {
        data.parts.forEach((part) => {
          action.report.items.forEach((item) => {
            if (item.partId === part.id) {
              items.push({ part: part, count: item.count })
            }
          })
        })
      })

      return { ...state, reportName: action.report.name, items: items }
    default:
      return state
  }
}

export default reportReducer
