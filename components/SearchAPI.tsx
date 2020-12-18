import { useContext, useEffect, useState } from 'react'
import { GlobalContext } from '../context/GlobalState'
import axios, { Canceler } from 'axios'

// This function appends data to an array based on "page number"
export default function useWordsearch(query: string, pageNumber: number) {
  const { state, dispatch } = useContext(GlobalContext)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  // Search
  useEffect(() => {
    setLoading(true)
    setError(false)
    let cancel: Canceler
    axios
      .get('/api/public', {
        params: { q: query, page: pageNumber },
        cancelToken: new axios.CancelToken((c) => (cancel = c)),
      })
      .then((res) => {
        dispatch({ type: 'LOAD', payload: res.data })
        console.log(res.data)
        dispatch({ type: 'HAS_MORE', payload: res.data.length > 0 })
        setLoading(false)
      })
      // Acknowledge cancellation errors
      // .catch((e) => axios.isCancel(e) && setError(true))
      .catch((_e) => null)
    // Cancel API request to avoid too many requests as user types
    return () => cancel()
  }, [state.searchQuery, state.pageNumber])

  return { loading, error }
}
