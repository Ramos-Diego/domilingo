// The 'state' parameter for the useReducer function
// is the current state. The action is a function that gets
// called to update the state.
const AppReducer = (state: State, action: Actions) => {
  switch (action.type) {
    case 'EDIT':
      return {
        ...state,
        edit: !state.edit,
      }
    default:
      return state
  }
}

export default AppReducer
