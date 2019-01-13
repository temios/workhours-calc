import { combineReducers } from 'redux'
import reportReducer from './reportReducer'
import catalogReducer from './catalogReducer'
import archiveReducer from './archiveReducer'

export default combineReducers({
  reportReducer,
  catalogReducer,
  archiveReducer
})
