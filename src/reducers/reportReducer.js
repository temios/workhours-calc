import { ADD_PART_TO_REPORT } from '../actions'

let initialState = {
  items: []
}

const reportReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_PART_TO_REPORT:
      return {...state, items: state.items.push(action.item)}
    default:
      return state;
  }
}

export default reportReducer;