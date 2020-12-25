import { useContext } from 'react'
import { GlobalContext } from '../context/GlobalState'

export default function Search() {
  const { state, dispatch } = useContext(GlobalContext)

  return (
    <input
      type="search"
      name="search"
      aria-label="search"
      placeholder="Search"
      autoComplete="off"
      value={state.searchQuery}
      onChange={(e: any) => {
        // Clear the words to only append the search results
        dispatch({ type: 'CLEAR' })
        dispatch({ type: 'SEARCH', payload: e.target.value })
      }}
      className="w-full rounded-md font-semibold px-3 py-1 border-2 dark:border-gray-600 dark:bg-gray-900 transition hover:shadow-md dark:hover:border-gray-400 focus:shadow-md focus:outline-none focus:ring-1 focus:border-blue-700 dark:focus:border-blue-400 focus:ring-blue-700 dark:focus:ring-blue-400"
    />
  )
}
