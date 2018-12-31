import { combineReducers } from 'redux'
import reportReducer from './reportReducer'
import catalogReducer from './catalogReducer'

export default combineReducers({
  reportReducer,
  catalogReducer
});