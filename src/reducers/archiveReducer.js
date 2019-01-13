import { ADD_REPORT_TO_ARCHIVE, LOAD_ARCHIVE } from '../actions'

let initState = {
  reports: []
}

const archiveReducer = (state = initState, action) => {
  switch (action.type) {
    case ADD_REPORT_TO_ARCHIVE:
      let report = action.report
      return { ...state, reports: [...state.reports, report] }
    case LOAD_ARCHIVE:
      return {...state, reports: action.reports}
    default:
      return state
  }
}

export default archiveReducer
