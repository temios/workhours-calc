import {
  ADD_PART_TO_DB,
  EDIT_PART,
  INITIAL_STORE,
  RELOAD_PARTS, UPDATE_PART
} from '../actions'

const initState = {
  currentCategory: null,
  categories: [],
  parts: [],
  currentParts: [],
  editPart: {}
}

const catalogReducer = (state = initState, action) => {
  switch (action.type) {
    case ADD_PART_TO_DB:
      return {
        ...state,
        parts: [...state.parts, action.part]
      }
    case UPDATE_PART:
      let parts = state.parts.map((part) => {
        return part.id === action.part.id ? action.part : part
      })
      console.log(parts)
      return {
        ...state,
        parts: parts
      }
    case INITIAL_STORE: {
      let currentCategory = action.store.categories[0].name
      return {
        ...state,
        ...action.store,
        currentCategory: currentCategory,
        currentParts: action.store.parts.filter((part) => {
          return part.category === currentCategory
        })
      }
    }
    case RELOAD_PARTS: {
      console.log(action)
      return {
        ...state,
        currentCategory: action.categoryName,
        currentParts: state.parts.filter((part) => {
          return part.category === action.categoryName
        })
      }
    }
    case EDIT_PART: {
      return {
        ...state,
        editPart: action.editPart
      }
    }
    default:
      return state
  }
}

export default catalogReducer
