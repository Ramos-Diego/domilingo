import { signIn, signOut, useSession } from 'next-auth/client'
import { ExtendedUseSession } from '../lib/data-types'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import Button from './Button'
import Search from './Search'

export default function NavBar() {
  const router = useRouter()
  const [session]: ExtendedUseSession = useSession()
  const [menu, setMenu] = useState(false)
  const user = session?.user

  // Press Esc to close the dropdown menu
  const downHandler = (e: KeyboardEvent) => {
    if (e.key === 'Esc' || e.key === 'Escape') {
      setMenu(false)
    }
  }

  // Add event listeners
  useEffect(() => {
    window.addEventListener('keydown', downHandler)
    // Remove event listeners on cleanup
    return () => {
      window.removeEventListener('keydown', downHandler)
    }
  }, []) // Empty array ensures that effect is only run on mount and unmount

  return (
    <div className="grid grid-flow-col justify-between place-items-center bg-gray-800 py-2 px-3">
      <Link href="/" passHref>
        <a tabIndex={-1}>DOMINILINGO</a>
      </Link>
      <>
        {(router.asPath === '/' || router.asPath === '/#') && <Search />}
        {menu && (
          <button
            // Makes this unable to focus using tab
            tabIndex={-1}
            onClick={() => setMenu(false)}
            // This button covers the entire screen.
            // It closes menu when clicked anywhere but the menu
            className="fixed w-full h-full inset-0 cursor-default"
          />
        )}
        {session ? (
          <div className="relative">
            <button
              // Using relative and z-index to raise the img avobe the ESC button
              className="relative z-10 block w-9 h-9 rounded-full overflow-hidden ring-2 ring-gray-600 focus:outline-none focus:ring-white"
              onClick={() => setMenu(!menu)}
            >
              <img
                src={user?.image ? user.image : ''}
                alt={user?.name ? user.name : ''}
                // Object cover overflows the image instead of distorting
                className="w-full h-full object-cover"
              />
            </button>
            <div className={menu ? '' : 'hidden'}>
              <div className="grid overflow-hidden origin-top-right absolute right-0 mt-2 w-40 rounded-md shadow-lg bg-gray-700 ring-2 ring-gray-500">
                {router.asPath !== `/${user?.dominilingo?.id}` && (
                  <Link href={`/${user?.dominilingo?.id}`} passHref>
                    <a className="px-4 py-2 text-gray-100 hover:bg-gray-900 hover:text-gray-100">
                      Profile
                    </a>
                  </Link>
                )}
                {router.asPath !== '/admin/approve' &&
                  user?.dominilingo?.role === 'admin' && (
                    <Link href={'/admin/approve'} passHref>
                      <a className="px-4 py-2 text-gray-100 hover:bg-gray-900 hover:text-gray-100">
                        Admin
                      </a>
                    </Link>
                  )}
                {router.pathname !== '/new' && (
                  <Link href="/new" passHref>
                    <a className="px-4 py-2 text-gray-100 hover:bg-gray-900 hover:text-gray-100">
                      New
                    </a>
                  </Link>
                )}
                <button
                  className="px-4 py-2 text-left text-gray-100 hover:bg-gray-900 hover:text-gray-100 focus:outline-none"
                  onClick={() => signOut({ callbackUrl: '/' })}
                >
                  Sign out
                </button>
              </div>
            </div>
          </div>
        ) : (
          <Button onClick={() => signIn('google')}>Sign In With Google</Button>
        )}
      </>
    </div>
  )
}
