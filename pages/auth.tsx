import { signin, signout, useSession } from 'next-auth/client'

export default function auth() {
  const [session, loading] = useSession()
  if (loading) {
    return null
  }
  return (
    <nav>
      {!session && <button onClick={() => signin('google')}>Sign in</button>}
      {session && (
        <>
          <p>{session.user.name}</p>
          <button onClick={() => signout()}>Sign out</button>
        </>
      )}
    </nav>
  )
}
