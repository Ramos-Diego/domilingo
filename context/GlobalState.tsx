import React, { createContext, useReducer } from 'react'
import AppReducer from './AppReducer'

const initialState: State = {
  word: '',
  deleted: [],
  edit: false,
}

// The global context becomes a single source of truth
// Any child element can grab states from it
export const GlobalContext = createContext<GlobalContext>({
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
