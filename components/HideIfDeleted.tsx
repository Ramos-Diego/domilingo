import { useContext } from 'react'
import { GlobalContext } from '../context/GlobalState'

export default function Hide({
  _id,
  children,
}: {
  _id: string
  children: React.ReactNode
}) {
  const { state } = useContext(GlobalContext)

  return (
    <div className={state.deleted.includes(_id) ? 'hidden' : ''}>
      {children}
    </div>
  )
}
