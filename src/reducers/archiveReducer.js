import { ADD_REPORT_TO_ARCHIVE, LOAD_ARCHIVE } from '../actions'

let initState = {
  reports: []
}

const archiveReducer = (state = initState, action) => {
  let newReports = []
  switch (action.type) {
    case ADD_REPORT_TO_ARCHIVE:
      let newReport = action.report
      let oldReports = state.reports
      newReports = oldReports.filter(report => {
        return report.id !== newReport.id
      })
      newReports.push(newReport)
      newReports = sortArchive(newReports)
      console.log(newReports)
      return { ...state, reports: newReports }
    case LOAD_ARCHIVE:
      newReports = sortArchive(action.reports)
      return { ...state, reports: newReports }
    default:
      return state
  }
}

function sortArchive (archive) {
  return archive.sort((a, b) => {
    return a.name > b.name
  })
}

export default archiveReducer
