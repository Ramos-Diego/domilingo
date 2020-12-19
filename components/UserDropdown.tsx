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
        <div className="relative">
          <ModalBackground component="USER_DROPDOWN" />
          <button
            onClick={() =>
              state.modal === 'USER_DROPDOWN'
                ? dispatch({ type: 'MODAL', payload: 'OFF' })
                : dispatch({ type: 'MODAL', payload: 'USER_DROPDOWN' })
            }
            className={`${
              state.modal === 'USER_DROPDOWN' ? 'z-10 ' : ''
            } w-9 h-9 rounded-full overflow-hidden ring-2 ring-gray-600 focus:outline-none focus:ring-white`}
          >
            <img
              src={user?.image ? user.image : ''}
              alt={user?.name ? user.name : ''}
              width="96"
              height="96"
              // Object cover overflows the image instead of distorting
              className="z-10 w-full h-full object-cover"
            />
          </button>
          {state.modal === 'USER_DROPDOWN' && (
            <div className="absolute grid overflow-hidden right-4 mt-2 w-40 rounded-md shadow-lg bg-gray-700 text-left ring-2 ring-gray-500">
              {router.asPath !== `/${user?.domilingo?.id}` && (
                <Link href={`/${user?.domilingo?.id}`} passHref>
                  <a
                    onClick={() => dispatch({ type: 'MODAL', payload: 'OFF' })}
                    className="px-4 py-2 text-gray-100 hover:bg-gray-900 hover:text-gray-100"
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
                      className="px-4 py-2 text-gray-100 hover:bg-gray-900 hover:text-gray-100"
                    >
                      Admin
                    </a>
                  </Link>
                )}
              {router.pathname !== '/new' && (
                <Link href="/new" passHref>
                  <a
                    onClick={() => dispatch({ type: 'MODAL', payload: 'OFF' })}
                    className="px-4 py-2 text-gray-100 hover:bg-gray-900 hover:text-gray-100"
                  >
                    New
                  </a>
                </Link>
              )}
              <button
                className="px-4 py-2 text-left text-gray-100 hover:bg-gray-900 hover:text-gray-100 focus:outline-none"
                onClick={() => {
                  signout()
                  dispatch({ type: 'MODAL', payload: 'OFF' })
                }}
              >
                Sign out
              </button>
            </div>
          )}
        </div>
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
