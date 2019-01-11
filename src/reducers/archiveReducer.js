import { ADD_REPORT_TO_ARCHIVE } from '../actions'

let initState = {
  reports: []
}

const archiveReducer = (state = initState, action) => {
  switch (action.type) {
    case ADD_REPORT_TO_ARCHIVE:
      let id = state.reports[state.reports.length - 1].id
      let report = action.report
      report.id = ++id
      return { ...state, reports: [...state.reports, report] }
    default:
      return state
  }
}

export default archiveReducer
