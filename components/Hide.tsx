import { useContext } from 'react'
import { GlobalContext } from '../context/GlobalState'

export default function Hide({
  word,
  invert,
  children,
}: {
  word: string
  invert?: boolean
  children: React.ReactNode
}) {
  const { state } = useContext(GlobalContext)
  return invert ? (
    <div className={state.edit && state.word === word ? 'hidden' : ''}>
      {children}
    </div>
  ) : (
    <div className={state.edit && state.word === word ? '' : 'hidden'}>
      {children}
    </div>
  )
}
