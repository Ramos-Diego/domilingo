import React, { createContext, useReducer } from 'react'
import { GlobalContextType, State } from '../lib/data-types'
import AppReducer from './AppReducer'

const initialState: State = {
  selectedWord: undefined,
  editing: false,
  words: [],
  hasMore: false,
  pageNumber: 1,
  searchQuery: '',
  modal: 'OFF',
}

// The global context becomes a single source of truth
// Any child element can grab states from it
export const GlobalContext = createContext<GlobalContextType>({
  state: initialState,
  dispatch: () => null,
})
// The global provider gives children elements access to
// the global context
export const GlobalProvider: React.FC = ({ children }) => {
  // A reducer function enables the consumption and modification of states
  const [state, dispatch] = useReducer(AppReducer, initialState)
  return (
    <GlobalContext.Provider value={{ state, dispatch }}>
      {children}
    </GlobalContext.Provider>
  )
}
