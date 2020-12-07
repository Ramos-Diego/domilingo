import { useContext } from 'react'
import { GlobalContext } from '../context/GlobalState'
import { useRouter } from 'next/router'
import { deleteWordFetch } from '../utils/client'
import { trigger } from 'swr'

export default function DeleteModal() {
  const { state, dispatch } = useContext(GlobalContext)
  const router = useRouter()
  return (
    <>
      {state.deleting && (
        <>
          <div className="fixed z-10 inset-0 overflow-y-auto">
            <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
              {/* <!-- This element is to trick the browser into centering the modal contents. --> */}
              <span className="hidden sm:inline-block sm:align-middle sm:h-screen">
                &#8203;
              </span>
              {/* <!--Modal panel, show/hide based on modal state.--> */}
              <div className="inline-block align-bottom bg-gray-900 rounded-lg text-left overflow-hidden ring-2 ring-red-800 transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                <div className="px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                      <h3 className="text-xl leading-6 font-medium text-gray-200">
                        Delete word
                      </h3>
                      <div className="mt-2">
                        <p className="text-gray-300">
                          Are you sure you want to delete this word?.
                        </p>
                        <p className="text-gray-300">
                          This action cannot be undone.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                  <button
                    onClick={async () => {
                      if (state.selectedWord) {
                        dispatch({ type: 'DELETE', deleteState: false })
                        await deleteWordFetch(state.selectedWord.slug)
                        // Trigger a revalidation/update the cache when the promise resolves
                        router.pathname === '/' && trigger('/api/db')
                        router.pathname === '/admin/approve' &&
                          trigger('/api/admin')
                      }
                    }}
                    className="w-full inline-flex justify-center rounded-md px-4 py-2 text-white bg-red-800 text-base font-medium hover:bg-red-700 focus:outline-none sm:ml-3 sm:w-auto sm:text-sm"
                  >
                    Delete
                  </button>
                  <button
                    onClick={() =>
                      dispatch({ type: 'DELETE', deleteState: false })
                    }
                    className="mt-3 w-full inline-flex justify-center rounded-md shadow-sm px-4 py-2 bg-gray-200 text-gray-900 text-base font-medium hover:bg-gray-50 focus:outline-none sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  )
}
