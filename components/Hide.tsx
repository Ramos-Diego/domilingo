import { useContext } from 'react'
import { GlobalContext } from '../context/GlobalState'

export default function Hide({
  _id,
  invert,
  children,
}: {
  _id: string
  invert?: boolean
  children: React.ReactNode
}) {
  const { state } = useContext(GlobalContext)
  return invert ? (
    <div className={state.edit && state.wordId === _id ? 'hidden' : ''}>
      {children}
    </div>
  ) : (
    <div className={state.edit && state.wordId === _id ? '' : 'hidden'}>
      {children}
    </div>
  )
}
