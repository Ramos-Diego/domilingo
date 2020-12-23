import { useContext } from 'react'
import { GlobalContext } from '../context/GlobalState'
import { FaFont } from 'react-icons/fa'
import ModalBackground from './ModalBackground'

export default function LetterFilter() {
  const { state, dispatch } = useContext(GlobalContext)
  // prettier-ignore
  const letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 
  'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']

  return (
    <>
      <ModalBackground component="LETTER_FILTER" transparent />
      <button
        onClick={() =>
          state.modal.id === 'LETTER_FILTER'
            ? dispatch({ type: 'MODAL', payload: { id: 'MODAL_OFF' } })
            : dispatch({ type: 'MODAL', payload: { id: 'LETTER_FILTER' } })
        }
        className={`${
          state.modal.id === 'LETTER_FILTER' ? 'z-10 ' : ''
        }relative p-2 rounded bg-gray-900`}
      >
        <FaFont />
        {state.modal.id === 'LETTER_FILTER' && (
          <nav className="absolute -left-24 mt-5 inline-grid min-w-max rounded grid-cols-6 gap-x-4 gap-y-3 p-2 font-bold text-white bg-gray-800 text-center ring-2 ring-white">
            {letters.map((letter, idx) => (
              <button
                key={idx}
                className="bg-gray-900 px-1 rounded focus:outline-none focus:ring-2 focus:ring-white transform hover:-translate-y-1 hover:scale-125"
                onClick={() => {
                  // Clear the words to only append the search results
                  dispatch({ type: 'MODAL', payload: 'LETTER_FILTER' })
                  dispatch({ type: 'CLEAR' })
                  dispatch({ type: 'SEARCH', payload: letter })
                  dispatch({ type: 'PAGE_NUMBER', payload: 1 })
                }}
              >
                {letter.toUpperCase()}
              </button>
            ))}
          </nav>
        )}
      </button>
    </>
  )
}
