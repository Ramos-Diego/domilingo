import { useContext } from 'react'
import { GlobalContext } from '../context/GlobalState'

export default function Hide({
  word,
  children,
}: {
  word: string
  children: React.ReactNode
}) {
  const { state } = useContext(GlobalContext)

  return (
    <div className={state.deleted.includes(word) ? 'hidden' : ''}>
      {children}
    </div>
  )
}
