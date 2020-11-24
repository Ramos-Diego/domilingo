// The 'state' parameter for the useReducer function
// is the current state. The action is a function that gets
// called to update the state.
const AppReducer = (state: State, action: Actions) => {
  switch (action.type) {
    case 'EDIT':
      if (state.edit && action.word !== state.word) {
        return {
          ...state,
          word: action.word,
        }
      } else {
        return {
          ...state,
          edit: !state.edit,
          word: action.word,
        }
      }
    case 'USE_EFFECT':
      return {
        ...state,
        edit: false,
      }
    case 'DELETE':
      return {
        ...state,
        delete: state.deleted.push(action.word),
      }
    default:
      return state
  }
}

export default AppReducer
