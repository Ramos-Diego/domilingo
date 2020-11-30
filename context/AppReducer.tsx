// The 'state' parameter for the useReducer function
// is the current state. The action is a function that gets
// called to update the state.
import { State } from '../lib/data-types'
const AppReducer = (state: State, action: any) => {
  switch (action.type) {
    case 'SEARCHING':
      return {
        ...state,
        searching:
          action.searching && action.searching.length > 0 ? true : false,
      }
    case 'SEARCH':
      return {
        ...state,
        searchResults: action.filteredWords,
      }
    case 'LOAD':
      return {
        ...state,
        loadedWords: action.loadedWords,
      }
    default:
      return state
  }
}
export default AppReducer
