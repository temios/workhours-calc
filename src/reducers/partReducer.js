import { ADD_PART } from '../actions'

let id = 1;
const initialState = {
  parts: {}
};
const partReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_PART:
      action.part.id = id++;
      let newState = {
        ...state,
        parts: { ...state.parts, [action.part.id]: action.part }
      }
      console.log(newState)
      return newState
    default:
      return state
  }
}

export default partReducer