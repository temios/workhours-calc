import { ADD_PART } from '../actions'

const choiceReducer = (state = [], action) => {
  switch (action.type) {
    case ADD_PART:
      console.log(action)
      return state
    default:
      return state
  }
}

export default choiceReducer