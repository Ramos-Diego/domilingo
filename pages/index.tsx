import Head from 'next/head'
import { signIn, signOut, useSession } from 'next-auth/client'
import Button from '../components/Button'
import Body from '../components/Body'

export default function Home() {
  const [session] = useSession()

  return (
    <Body>
      <Head>
        <title>Dominilingo</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex justify-center">
        {!session && (
          <div>
            {/* If the sign in function has no parameters it will show a login */}
            {/* page with all the providers that have been setup */}
            <Button onClick={() => signIn('github')}>
              Sign in with Github
            </Button>
          </div>
        )}
        {session && (
          <div>
            <code>
              <pre className="mb-5">{JSON.stringify(session, null, 2)}</pre>
            </code>
            <Button onClick={() => signOut()}>Sign out</Button>
          </div>
        )}
      </div>
    </Body>
  )
}
