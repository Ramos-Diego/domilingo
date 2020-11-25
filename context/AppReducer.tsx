import { State, Actions } from '../lib/data-types'
// The 'state' parameter for the useReducer function
// is the current state. The action is a function that gets
// called to update the state.
const AppReducer = (state: State, action: Actions) => {
  switch (action.type) {
    case 'EDIT':
      if (state.edit && action._id !== state.wordId) {
        return {
          ...state,
          wordId: action._id,
        }
      } else {
        return {
          ...state,
          edit: !state.edit,
          wordId: action._id,
        }
      }
    case 'USE_EFFECT':
      return {
        ...state,
        edit: false,
      }
    case 'DELETE':
      if (action._id) {
        return {
          ...state,
          delete: state.deleted.push(action._id),
        }
      } else {
        return state
      }
    case 'DROPDOWN':
      return {
        ...state,
        dropdownMenu: !state.dropdownMenu,
      }
    default:
      return state
  }
}

export default AppReducer
