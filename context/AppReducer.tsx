// The 'state' parameter for the useReducer function
// is the current state. The action is a function that gets
// called to update the state.
import { State } from '../lib/data-types'
const AppReducer = (state: State, action: any) => {
  switch (action.type) {
    case 'CLEAR':
      return { ...state, words: [] }
    case 'SEARCH':
      return {
        ...state,
        searchQuery: action.payload,
      }
    case 'LOAD':
      return {
        ...state,
        words: [...state.words, ...action.payload],
      }
    case 'HAS_MORE':
      return {
        ...state,
        hasMore: action.payload,
      }
    case 'PAGE_NUMBER':
      return {
        ...state,
        pageNumber: action.payload ? action.payload : state.pageNumber + 1,
      }
    case 'EDIT':
      return {
        ...state,
        selectedWord: action.selectedWord ? action.selectedWord : undefined,
        editing: action.selectedWord ? true : false,
      }
    case 'DELETE':
      return {
        ...state,
        selectedWord: action.selectedWord ? action.selectedWord : undefined,
        deleting: action.deleteState,
      }
    default:
      return state
  }
}
export default AppReducer
