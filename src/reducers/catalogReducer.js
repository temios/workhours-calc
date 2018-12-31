import { ADD_PART_TO_DB, INITIAL_STORE, RELOAD_PARTS } from '../actions'

let id = 0
const initState = {
  currentCategory: null,
  categories: [],
  parts: [],
  currentParts: [],
}

const catalogReducer = (state = initState, action) => {
  switch (action.type) {
    case ADD_PART_TO_DB:
      action.part.id = id++
      let newState = {
        ...state,
        parts: [...state.parts, action.part],
      }
      console.log(newState)
      return newState
    case INITIAL_STORE: {
      let currentCategory = action.store.categories[0].name
      return {
        ...state,
        ...action.store,
        currentCategory: currentCategory,
        currentParts: action.store.parts.filter((part) => {
          return part.category === currentCategory
        }),
      }
    }
    case RELOAD_PARTS: {
      console.log(action)
      return newState = {
        ...state,
        currentCategory: action.categoryName,
        currentParts: state.parts.filter((part) => {
          return part.category === action.categoryName
        }),
      }
    }
    default:
      return state
  }
}

export default catalogReducer