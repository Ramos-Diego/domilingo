import { useContext } from 'react'
import { GlobalContext } from '../context/GlobalState'
import { useRouter } from 'next/router'
import { deleteWordFetch } from '../utils/client'
import { trigger } from 'swr'

export default function DeleteModal() {
  const { state, dispatch } = useContext(GlobalContext)
  const router = useRouter()

  if (state.modal === '_DELETE_MODAL_') {
    return (
      <>
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="grid items-end justify-items-center sm:place-items-center min-h-screen pt-4 px-4 pb-20 sm:p-0">
            <div
              className="fixed inset-0 transition-opacity"
              aria-hidden="true"
            >
              <div
                onClick={() => dispatch({ type: 'MODAL', payload: '_OFF_' })}
                className="absolute inset-0 bg-gray-700 opacity-75"
              ></div>
            </div>
            <article
              className="max-w-sm sm:max-w-lg bg-white dark:bg-gray-900 select-none rounded-lg overflow-hidden shadow-xl transform transition-all"
              role="dialog"
              aria-modal="true"
              aria-labelledby="modal-headline"
            >
              <section className="px-4 py-5 sm:p-6 sm:pb-4">
                <div className="sm:grid sm:grid-flow-col sm:items-start">
                  <div className="mx-auto grid items-center justify-center h-12 w-12 rounded-full bg-red-100 dark:bg-red-800 sm:mx-0 sm:h-10 sm:w-10">
                    <svg
                      className="h-6 w-6 text-red-600 dark:text-red-100"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                      />
                    </svg>
                  </div>
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-gray-50">
                      Delete word
                    </h3>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Are you sure you want to delete this word? This action
                        cannot be undone.
                      </p>
                    </div>
                  </div>
                </div>
              </section>
              <section className="bg-gray-50 dark:bg-gray-800 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  onClick={async () => {
                    if (state.selectedWord) {
                      dispatch({ type: 'MODAL', payload: '_OFF_' })
                      await deleteWordFetch(state.selectedWord.slug)
                      // Trigger a revalidation/update the cache when the promise resolves
                      router.pathname === '/' && trigger('/api/db')
                      router.pathname === '/admin/approve' &&
                        trigger('/api/admin')
                    }
                  }}
                  className="px-4 py-2 w-full sm:w-auto sm:ml-3 rounded-md border-2 border-red-700 bg-white dark:bg-gray-900 hover:bg-red-100 dark:hover:bg-red-900 font-semibold focus:bg-red-200 dark:focus:bg-red-800 text-red-900 dark:text-red-50 transition focus:outline-none hover:shadow-md focus:shadow-md focus:ring-2 focus:ring-red-500 dark:focus:ring-red-200"
                >
                  Delete
                </button>
                <button
                  onClick={() => dispatch({ type: 'MODAL', payload: '_OFF_' })}
                  className="px-4 py-2 mt-3 w-full sm:w-auto sm:mt-0 rounded-md border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 hover:bg-gray-50 dark:hover:bg-gray-800 font-semibold text-gray-800 dark:text-gray-50 transition focus:outline-none hover:shadow-md focus:shadow-md focus:ring-2 focus:ring-gray-500 dark:focus:ring-gray-200"
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
