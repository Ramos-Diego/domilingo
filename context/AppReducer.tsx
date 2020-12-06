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
    case 'LOAD_AND_SHUFFLE':
      return {
        ...state,
        loadedWords: action.loadedWords,
        shuffledWords: action.loadedWords.sort(() => Math.random() - 0.5),
      }
    case 'EDIT':
      return {
        ...state,
        wordToEdit: action.wordToEdit ? action.wordToEdit : undefined,
        editing: action.wordToEdit ? true : false,
      }
    default:
      return state
  }
}
export default AppReducer
