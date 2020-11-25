import { useContext } from 'react'
import { GlobalContext } from '../context/GlobalState'
import { Session, signOut, useSession } from 'next-auth/client'
import { NewUser } from '../typings/dominilingo'
type ExtendedSession = Session & { user: NewUser }
import { useRouter } from 'next/router'
import Link from 'next/link'

export default function DropdownMenu() {
  const router = useRouter()
  const [session]: [ExtendedSession, boolean] = useSession()
  const { state, dispatch } = useContext(GlobalContext)
  return (
    <div className="relative inline-block text-left">
      <img
        src={session.user.image}
        alt={session.user.name}
        className="w-8 h-8 rounded-full"
        onClick={() =>
          dispatch({
            type: 'DROPDOWN',
          })
        }
      />
      <div className={state.dropdownMenu ? '' : 'hidden'}>
        <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-gray-700 ring-1 ring-white ring-opacity-5">
          <div
            className="py-1"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="options-menu"
          >
            {router.asPath !== `/${session.user.dominilingo.uid}` && (
              <Link href={`/${session.user.dominilingo.uid}`}>
                <a className="block px-4 py-2 text-sm text-gray-100 hover:bg-gray-900 hover:text-gray-100">
                  Profile
                </a>
              </Link>
            )}
            {router.asPath !== '/admin/approve' &&
              session.user.dominilingo.role === 'admin' && (
                <Link href={'/admin/approve'}>
                  <a className="block px-4 py-2 text-sm text-gray-100 hover:bg-gray-900 hover:text-gray-100">
                    Admin
                  </a>
                </Link>
              )}
            {router.pathname !== '/new' && (
              <Link href="/new">
                <a className="block px-4 py-2 text-sm text-gray-100 hover:bg-gray-900 hover:text-gray-100">
                  New
                </a>
              </Link>
            )}
            <button
              className="block px-4 py-2 text-sm text-gray-100 hover:bg-gray-900 hover:text-gray-100"
              onClick={() => signOut()}
            >
              Sign out
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
