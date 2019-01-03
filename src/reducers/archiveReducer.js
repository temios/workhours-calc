import { ADD_REPORT_TO_ARCHIVE } from '../actions'

const archiveReducer = (state = [], action) => {
  switch (action.type) {
    case ADD_REPORT_TO_ARCHIVE:
      console.log(action)
      return state
    default:
      return state
  }
}

export default archiveReducer