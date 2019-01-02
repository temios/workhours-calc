export const ADD_PART_TO_DB = 'ADD_PART_TO_DB'
export const ADD_PART_TO_REPORT = 'ADD_PART_TO_REPORT'
export const RELOAD_PARTS = 'RELOAD_PARTS'
export const INITIAL_STORE = 'INITIAL_STORE'
export const EDIT_PART = 'EDIT'
export const UPDATE_PART = 'UPDATE_PART'

export const addPartToDB = part => ({
  type: ADD_PART_TO_DB,
  part,
})

export const updatePart = part => ({
  type: UPDATE_PART,
  part,
})

export const addPartToReport = item => ({
  type: ADD_PART_TO_REPORT,
  item,
})

export const reloadParts = categoryName => ({
  type: RELOAD_PARTS,
  categoryName,
})

export const initialStore = store => ({
  type: INITIAL_STORE,
  store,
})

export const editPart = editPart => ({
  type: EDIT_PART,
  editPart,
})