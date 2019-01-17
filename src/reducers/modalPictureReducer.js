import { CLOSE_PICTURE, SHOW_PICTURE } from '../actions'

const initState = { isOpen: false, picture: '' }

const modalPictureReducer = (state = initState, action) => {
  switch (action.type) {
    case CLOSE_PICTURE:
      return { ...state, isOpen: false }
    case SHOW_PICTURE:
      return { ...state, isOpen: true, picture: action.picture }
    default:
      return state
  }
}

export default modalPictureReducer
