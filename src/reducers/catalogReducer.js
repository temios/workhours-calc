import {
  EDIT_PART,
  RELOAD_PARTS,
  UPDATE_PART,
  LOAD_CATEGORIES, ADD_CATEGORY
} from '../actions'

const initState = {
  currentCategory: '',
  categories: [],
  parts: [],
  currentParts: [],
  editPart: {}
}

const catalogReducer = (state = initState, action) => {
  switch (action.type) {
    case LOAD_CATEGORIES:
      return { ...state, categories: action.categories }
    case ADD_CATEGORY:
      return { ...state, categories: [...state.categories, action.category] }
    case UPDATE_PART:
      let parts = state.parts.map(part => {
        return part.id === action.part.id ? action.part : part
      })
      console.log(parts)
      return {
        ...state,
        parts: parts
      }
    case RELOAD_PARTS: {
      return {
        ...state,
        currentCategory: action.categoryId,
        currentParts: action.parts
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
