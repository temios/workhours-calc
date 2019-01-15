import { REDIRECT_FROM_PART } from '../actions'

const partReducer = (state = [{ redirect: false }], action) => {
  switch (action.type) {
    case REDIRECT_FROM_PART:
      return { ...state, redirect: action.flag }
    default:
      return state
  }
}

export default partReducer
