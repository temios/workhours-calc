import {
  ADD_PART_TO_DB,
  EDIT_PART,
  RELOAD_PARTS,
  UPDATE_PART,
  LOAD_CATEGORIES
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
    case LOAD_CATEGORIES:
      console.log(action.categories)
      return { ...state, categories: action.categories }
    case ADD_PART_TO_DB:
      return {
        ...state,
        parts: [...state.parts, action.part]
      }
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
        currentCategory: action.categoryName,
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
