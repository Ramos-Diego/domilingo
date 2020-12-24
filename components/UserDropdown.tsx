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
          <ModalBackground component="_USER_DROPDOWN_" transparent />
          <div className="relative">
            <button
              onClick={() =>
                state.modal === '_USER_DROPDOWN_'
                  ? dispatch({ type: 'MODAL', payload: '_OFF_' })
                  : dispatch({
                      type: 'MODAL',
                      payload: '_USER_DROPDOWN_',
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
            {state.modal === '_USER_DROPDOWN_' && (
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
                            payload: '_OFF_',
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
                            dispatch({ type: 'MODAL', payload: '_OFF_' })
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
                          dispatch({ type: 'MODAL', payload: '_OFF_' })
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
                      dispatch({ type: 'MODAL', payload: '_OFF_' })
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
        <button
          className="block rounded hover:shadow-md focus:outline-none transition dark:hover:bg-gray-700 hover:bg-gray-300 dark:focus:bg-gray-700 focus:bg-gray-300"
          onClick={() => signin('google')}
        >
          <p className="hidden sm:block p-1 font-bold">Sign in</p>
          <svg
            className="sm:hidden text-blue-700 dark:text-blue-400 fill-current w-9 h-9 p-0.5"
            viewBox="0 0 512 512"
          >
            <title>Sign In</title>
            <path d="M392 80H232a56.06 56.06 0 00-56 56v104h153.37l-52.68-52.69a16 16 0 0122.62-22.62l80 80a16 16 0 010 22.62l-80 80a16 16 0 01-22.62-22.62L329.37 272H176v104c0 32.05 33.79 56 64 56h152a56.06 56.06 0 0056-56V136a56.06 56.06 0 00-56-56zM80 240a16 16 0 000 32h96v-32z" />
          </svg>
        </button>
      )}
    </>
  )
}
