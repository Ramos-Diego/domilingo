import { useContext } from 'react'
import { GlobalContext } from '../context/GlobalState'
import { ObjectId } from 'mongodb'

export default function Hide({
  _id,
  children,
}: {
  _id: ObjectId
  children: React.ReactNode
}) {
  const { state } = useContext(GlobalContext)

  return (
    <div
      className={
        state.deleted.includes(new ObjectId(_id).toString()) ? 'hidden' : ''
      }
    >
      {children}
    </div>
  )
}
