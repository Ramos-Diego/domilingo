import { signIn, signOut, useSession } from 'next-auth/client'
import Button from '../components/Button'
import A from '../components/A'
import { useRouter } from 'next/router'
import Search from './Search'

export default function NavBar() {
  const router = useRouter()
  const [session] = useSession()

  return (
    <div className="flex gap-3 bg-gray-800 place-items-center py-2 px-3 mb-4">
      <div className="flex-auto">DOMINILINGO</div>
      {router.pathname === '/' && <Search/>}
      {!session && (
        <div>
          {/* If the sign in function has no parameters it will show a login */}
          {/* page with all the providers that have been setup */}
          <Button onClick={() => signIn('github')}>Sign in with Github</Button>
        </div>
      )}
      {session && (
        <>
          <img
            src={session.user.image}
            alt={session.user.name}
            className="w-8 h-8 rounded-full"
          />
          <div>{session.user.name}</div>
          {/* <code>
        <pre className="mb-5">{JSON.stringify(session, null, 2)}</pre>
      </code> */}
          <Button onClick={() => signOut()}>Sign out</Button>
        </>
      )}
      {router.pathname === '/' ? <A href="/new">New</A> : <A href="/">Home</A>}
    </div>
  )
}
