import { CLOSE_ALERT, SHOW_ALERT } from '../actions'

const initialState = {text: '', color: '', isOpen: false}


const alertReducer = (state = initialState, action) => {
  switch (action.type) {
    case SHOW_ALERT:
      return {...state, text: action.text, color: action.color, isOpen: true}
    case CLOSE_ALERT:
      return {...state, text: '', color: '', isOpen: false}
    default:
      return state
  }
}

export default alertReducer