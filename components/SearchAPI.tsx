import { useContext, useEffect } from 'react'
import { GlobalContext } from '../context/GlobalState'
import axios, { Canceler } from 'axios'

// This function appends data to an array based on "page number"
export default function SearchAPI(query: string) {
  const { state, dispatch } = useContext(GlobalContext)

  // Search
  useEffect(() => {
    if (query !== '') {
      let cancel: Canceler
      axios
        .get('/api/public', {
          params: { q: query },
          cancelToken: new axios.CancelToken((c) => (cancel = c)),
        })
        .then((res) => {
          dispatch({ type: 'LOAD', payload: res.data })
        })
        // Acknowledge cancellation errors
        // .catch((e) => axios.isCancel(e) && setError(true))
        .catch((_e) => null)
      // Cancel API request to avoid too many requests as user types
      return () => cancel()
    }
  }, [state.searchQuery])

  return
}
