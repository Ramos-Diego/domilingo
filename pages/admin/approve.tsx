import Head from 'next/head'
import { GetStaticProps } from 'next'
import { getUnapprovedWords } from '../../utils/dbFunctions'
import NavBar from '../../components/NavBar'
import Center from '../../components/Center'
import WordCard from '../../components/WordCard'
import { useSession } from 'next-auth/client'
import { ExtendedUseSession, Word } from '../../lib/data-types'

export default function Approve({ words }: { words: Word[] }) {
  const [session, loading]: ExtendedUseSession = useSession()

  if (loading) return null

  if (!session || session.user.dominilingo?.role !== 'admin') {
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
          {words.map((word, idx) => {
            return <WordCard word={word} key={idx} />
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
