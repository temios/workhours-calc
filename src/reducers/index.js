import { combineReducers } from 'redux'
import reportReducer from './reportReducer'
import catalogReducer from './catalogReducer'
import archiveReducer from './archiveReducer'
import alertReducer from './alertReducer'

export default combineReducers({
  reportReducer,
  catalogReducer,
  archiveReducer,
  alertReducer
})
