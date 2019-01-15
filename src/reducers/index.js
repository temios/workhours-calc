import { combineReducers } from 'redux'
import reportReducer from './reportReducer'
import catalogReducer from './catalogReducer'
import archiveReducer from './archiveReducer'
import alertReducer from './alertReducer'
import partReducer from './partReducer'

export default combineReducers({
  reportReducer,
  catalogReducer,
  archiveReducer,
  alertReducer,
  partReducer
})
