import { useContext } from 'react'
import { GlobalContext } from '../context/GlobalState'
import { useRouter } from 'next/router'
import { deleteWordFetch } from '../utils/client'
import { trigger } from 'swr'
import ModalBackground from './ModalBackground'

export default function DeleteModal() {
  const { state, dispatch } = useContext(GlobalContext)
  const router = useRouter()

  if (state.modal === 'DELETE_MODAL') {
    return (
      <>
        <div className="z-10 fixed inset-0 overflow-y-auto ">
          <ModalBackground component="DELETE_MODAL" />
          <div className="grid items-end justify-center h-full pt-4 px-4 pb-20 sm:items-center">
            <article className="bg-gray-900 rounded-lg overflow-hidden ring-2 ring-red-800 transform transition-all">
              <section className="px-6 py-4 sm:p-6 sm:flex sm:items-start">
                <div className="sm:mt-0 sm:ml-4">
                  <h3 className="text-xl leading-6 font-medium text-gray-200 pb-4 pt-2 text-center sm:text-left">
                    Delete word
                  </h3>
                  <p className="text-gray-300">
                    Are you sure you want to delete this word?
                  </p>
                  <p className="text-gray-300">This action cannot be undone.</p>
                </div>
              </section>
              <section className="bg-gray-800 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse sm:gap-3">
                <button
                  onClick={async () => {
                    if (state.selectedWord) {
                      dispatch({ type: 'MODAL', payload: 'OFF' })
                      await deleteWordFetch(state.selectedWord.slug)
                      // Trigger a revalidation/update the cache when the promise resolves
                      router.pathname === '/' && trigger('/api/db')
                      router.pathname === '/admin/approve' &&
                        trigger('/api/admin')
                    }
                  }}
                  className="w-full rounded-md px-4 py-2 text-white bg-red-800 text-base font-medium hover:bg-red-700 focus:outline-none sm:w-auto sm:text-sm"
                >
                  Delete
                </button>
                <button
                  onClick={() => dispatch({ type: 'MODAL', payload: 'OFF' })}
                  className="mt-3 w-full rounded-md shadow-sm px-4 py-2 bg-gray-200 text-gray-900 text-base font-medium hover:bg-gray-50 focus:outline-none sm:mt-0 sm:w-auto sm:text-sm"
                >
                  Cancel
                </button>
              </section>
            </article>
          </div>
        </div>
      </>
    )
  }
  return <></>
}
