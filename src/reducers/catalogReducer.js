import {
  EDIT_PART,
  RELOAD_PARTS,
  LOAD_CATEGORIES,
  ADD_CATEGORY
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
    case RELOAD_PARTS: {
      return {
        ...state,
        currentCategory: Number.parseInt(action.categoryId),
        currentParts: action.parts
      }
    }
    case EDIT_PART: {
      console.log(state)
      const category = state.categories.filter(cat => {
        return cat.id === state.currentCategory
      })[0]
      let editPart = action.editPart
      editPart.category = category.name
      console.log(editPart)
      return {
        ...state,
        editPart: editPart
      }
    }
    default:
      return state
  }
}

export default catalogReducer
