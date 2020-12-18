import { useContext } from 'react'
import { GlobalContext } from '../context/GlobalState'

export default function LetterFilter() {
  const { state, dispatch } = useContext(GlobalContext)
  // prettier-ignore
  const letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 
  'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']

  return (
    <nav className="hidden lg:grid absolute left-5 gap-3 rounded p-3 font-bold text-white bg-gray-900 text-center">
      {letters.map((letter, idx) => (
        <button
          key={idx}
          className="bg-gray-800 px-1 rounded focus:outline-none focus:ring-2 focus:ring-white transform hover:-translate-y-1 hover:scale-125"
          onClick={() => {
            // Clear the words to only append the search results
            dispatch({ type: 'CLEAR' })
            dispatch({ type: 'SEARCH', payload: letter })
            dispatch({ type: 'PAGE_NUMBER', payload: 1 })
          }}
        >
          {letter.toUpperCase()}
        </button>
      ))}
    </nav>
  )
}
