import { useContext } from 'react'
import { GlobalContext } from '../context/GlobalState'

export default function Search() {
  const { state, dispatch } = useContext(GlobalContext)

  return (
    <form className="w-36">
      <label htmlFor="search" className="absolute">
        Search
      </label>
      <input
        type="text"
        name="search"
        placeholder="Search"
        value={state.searchQuery}
        onChange={(e: any) => {
          // Clear the words to only append the search results
          dispatch({ type: 'CLEAR' })
          dispatch({ type: 'SEARCH', payload: e.target.value })
          dispatch({ type: 'PAGE_NUMBER', payload: 1 })
        }}
        className="relative shadow appearance-none rounded w-full py-2 px-3 bg-gray-900 text-white leading-tight focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
      />
    </form>
  )
}
