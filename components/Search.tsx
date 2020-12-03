import Input from './Input'
import { useForm } from 'react-hook-form'
import { useEffect } from 'react'
import { useContext } from 'react'
import { GlobalContext } from '../context/GlobalState'

export default function Search() {
  const { state, dispatch } = useContext(GlobalContext)
  const { register, watch, handleSubmit } = useForm()
  const searchValue: string = watch('search')

  useEffect(() => {
    // If the search value length is greater than 0, set SEARCHING state to true
    dispatch({ type: 'SEARCHING', searching: searchValue })
    // Filter the loaded words
    if (searchValue) {
      const filter = state.loadedWords.filter((word) =>
        word.word.toLowerCase().startsWith(searchValue.toLowerCase())
      )
      // Set the search results to the filtered output
      dispatch({ type: 'SEARCH', filteredWords: filter })
    }
  }, [searchValue])

  return (
    <>
      <form onSubmit={handleSubmit((_) => null)}>
        <label htmlFor="search" className="absolute">
          Search
        </label>
        <input
          id="search"
          type="text"
          name="search"
          placeholder="Search"
          ref={register({ required: true })}
          className="relative shadow appearance-none rounded w-full py-2 px-3 bg-gray-900 text-white leading-tight focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
        />
      </form>
    </>
  )
}
