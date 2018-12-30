import { combineReducers } from 'redux'
import reportReducer from './reportReducer'
import partReducer from './partReducer'

export default combineReducers({
  reportReducer,
  partReducer
});