import { Session, signIn, signOut, useSession } from 'next-auth/client'
import Button from '../components/Button'
import { useRouter } from 'next/router'
import Search from './Search'
import { FaBookOpen } from 'react-icons/fa'
import UserMenu from '../components/UserMenu'
import Link from 'next/link'
import { NewUser } from '../typings/dominilingo'

type ExtendedSession = Session & { user: NewUser }

export default function NavBar() {
  const router = useRouter()
  const [session]: [ExtendedSession, boolean] = useSession()

  return (
    <div className="flex gap-3 place-items-center bg-gray-800  py-2 px-3 mb-4">
      <div className="flex-auto">
        <FaBookOpen className="text-red-500 inline" />
        <Link href="/">
          <a>DOMINILINGO</a>
        </Link>
      </div>
      {router.pathname === '/' && <Search />}
      {session ? (
        <UserMenu />
      ) : (
        <div>
          {/* If the sign in function has no parameters it will show a login */}
          {/* page with all the providers that have been setup */}
          <Button onClick={() => signIn('github')}>Sign in with Github</Button>
        </div>
      )}
    </div>
  )
}
