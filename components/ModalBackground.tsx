import { useEffect } from 'react'
import { useContext } from 'react'
import { GlobalContext } from '../context/GlobalState'

export default function ModalBackground() {
  const { state, dispatch } = useContext(GlobalContext)

  // Press Esc to close the dropdown menu
  const downHandler = (e: KeyboardEvent) => {
    if (e.key === 'Esc' || e.key === 'Escape') {
      dispatch({ type: 'MODAL', payload: 'OFF' })
    }
  }

  // Add event listeners
  useEffect(() => {
    window.addEventListener('keydown', downHandler)
    // Remove event listeners on cleanup
    return () => {
      window.removeEventListener('keydown', downHandler)
    }
  }, []) // Empty array ensures that effect is only run on mount and unmount

  if (state.modal !== 'OFF') {
    return (
      <button
        // Makes this unable to focus using tab
        tabIndex={-1}
        onClick={() => dispatch({ type: 'MODAL', payload: 'OFF' })}
        // This button covers the entire screen.
        // It closes modal when clicked anywhere but the menu
        className="fixed w-full h-full inset-0 cursor-default bg-gray-800 opacity-75"
      ></button>
    )
  }
  return <></>
}
