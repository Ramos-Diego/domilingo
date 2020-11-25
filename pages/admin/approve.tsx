import Head from 'next/head'
import { GetStaticProps } from 'next'
import { getUnapprovedWords } from '../../utils/dbFunctions'
import NavBar from '../../components/NavBar'
import Center from '../../components/Center'
import WordCard from '../../components/WordCard'
import { Session, useSession } from 'next-auth/client'
import { NewUser } from '../../typings/dominilingo'
type ExtendedSession = Session & { user: NewUser }

export default function Approve({ words }) {
  const [session, loading]: [ExtendedSession, boolean] = useSession()

  if (loading) return null

  if (!session || session.user.dominilingo.role !== 'admin') {
    return <div>Access denied.</div>
  }

  return (
    <>
      <NavBar />
      <Center max="lg" styles="px-2 mb-4">
        <Head>
          <title>Dominilingo</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        {words.length === 0 && <div>There is nothing here.</div>}
        <div className="grid justify-center sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {words.map((item, idx) => {
            return <WordCard item={item} key={idx} />
          })}
        </div>
      </Center>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const words = JSON.parse(await getUnapprovedWords())

  return { props: { words } }
}
