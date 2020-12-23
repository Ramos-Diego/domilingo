import { useContext } from 'react'
import { GlobalContext } from '../context/GlobalState'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { signin, signout, useSession } from 'next-auth/client'
import { ExtendedUseSession } from '../lib/data-types'
import ModalBackground from './ModalBackground'

export default function UserDropdown() {
  const router = useRouter()
  const { state, dispatch } = useContext(GlobalContext)
  const [session, loading]: ExtendedUseSession = useSession()
  const user = session?.user

  return (
    <>
      {session && (
        <>
          <ModalBackground component="USER_DROPDOWN" transparent />
          <div className="relative">
            <button
              onClick={() =>
                state.modal.id === 'USER_DROPDOWN'
                  ? dispatch({ type: 'MODAL', payload: { id: 'MODAL_OFF' } })
                  : dispatch({
                      type: 'MODAL',
                      payload: { id: 'USER_DROPDOWN' },
                    })
              }
              className="flex text-sm rounded-full shadow-sm font-medium transition focus:outline-none hover:shadow-md focus:shadow-md focus:ring-2 focus:ring-gray-500 dark:focus:ring-gray-200"
              id="user-menu"
              aria-haspopup="true"
            >
              <span className="sr-only">Open user menu</span>
              <img
                className="h-8 w-8 rounded-full"
                src={user?.image ? user.image : ''}
                alt={user?.name ? user.name : ''}
              />
            </button>

            {state.modal.id === 'USER_DROPDOWN' && (
              <article className="z-10 origin-top-right absolute right-0 mt-2 w-40 rounded-md border-2 dark:border-gray-500 bg-white dark:bg-gray-900 shadow-lg ring-1 ring-black ring-opacity-5">
                <section
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="options-menu"
                >
                  {router.asPath !== `/${user?.domilingo?.id}` && (
                    <Link href={`/${user?.domilingo?.id}`} passHref>
                      <a
                        onClick={() =>
                          dispatch({
                            type: 'MODAL',
                            payload: { id: 'MODAL_OFF' },
                          })
                        }
                        className="block px-4 py-2 rounded text-sm text-gray-800 dark:text-gray-50 bg-white dark:bg-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white focus:bg-gray-100 dark:focus:bg-gray-800 focus:text-gray-900 dark:focus:text-white transition focus:outline-none focus:ring-2 ring-inset focus:ring-gray-500 dark:focus:ring-gray-200"
                      >
                        Profile
                      </a>
                    </Link>
                  )}
                  {router.asPath !== '/admin/approve' &&
                    user?.domilingo?.role === 'admin' && (
                      <Link href={'/admin/approve'} passHref>
                        <a
                          onClick={() =>
                            dispatch({ type: 'MODAL', payload: 'OFF' })
                          }
                          className="block px-4 py-2 rounded text-sm text-gray-800 dark:text-gray-50 bg-white dark:bg-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white focus:bg-gray-100 dark:focus:bg-gray-800 focus:text-gray-900 dark:focus:text-white transition focus:outline-none focus:ring-2 ring-inset focus:ring-gray-500 dark:focus:ring-gray-200"
                        >
                          Admin
                        </a>
                      </Link>
                    )}
                  {router.pathname !== '/new' && (
                    <Link href="/new" passHref>
                      <a
                        onClick={() =>
                          dispatch({ type: 'MODAL', payload: 'OFF' })
                        }
                        className="block px-4 py-2 rounded text-sm text-gray-800 dark:text-gray-50 bg-white dark:bg-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white focus:bg-gray-100 dark:focus:bg-gray-800 focus:text-gray-900 dark:focus:text-white transition focus:outline-none focus:ring-2 ring-inset focus:ring-gray-500 dark:focus:ring-gray-200"
                      >
                        New
                      </a>
                    </Link>
                  )}
                  <hr className="my-1" />

                  <button
                    onClick={() => {
                      signout()
                      dispatch({ type: 'MODAL', payload: 'OFF' })
                    }}
                    className="w-full text-left px-4 rounded py-2 text-sm text-gray-800 dark:text-gray-50 bg-white dark:bg-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white focus:bg-gray-100 dark:focus:bg-gray-800 focus:text-gray-900 dark:focus:text-white transition focus:outline-none focus:ring-2 ring-inset focus:ring-gray-500 dark:focus:ring-gray-200"
                  >
                    Sign out
                  </button>
                </section>
              </article>
            )}
          </div>
        </>
      )}

      {/* Login button */}
      {!session && (
        <>
          <button
            onClick={() => signin('google')}
            className="block bg-blue-600 hover:bg-blue-700 focus:bg-blue-700 focus:outline-none text-white font-semibold px-2 py-1 rounded"
          >
            Sign in
          </button>
        </>
      )}
    </>
  )
}
