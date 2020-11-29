import Head from 'next/head'
import { GetServerSideProps } from 'next'
import WordCard from '../../components/WordCard'
import { useSession } from 'next-auth/client'
import { ExtendedUseSession, Word } from '../../lib/data-types'
import useSWR from 'swr'
import NavBar from '../../components/NavBar'
import { connectToDatabase } from '../../utils/mongodb'

export const getServerSideProps: GetServerSideProps<{
  words: Word[]
}> = async () => {
  const { db } = await connectToDatabase()

  const words = await db
    .collection('words')
    // Get an array of all the unnaproved words
    .find({ approved: false }, { projection: { _id: 0 } })
    // Collation allows for case insentive sorting
    .collation({ locale: 'en' })
    .sort({ word: 1 })
    .toArray()

  return { props: { words } }
}

export default function Approve({ words }: { words: Word[] }) {
  const [session]: ExtendedUseSession = useSession()

  const { data: unapprovedWords } = useSWR('/api/admin', {
    initialData: words,
  })

  // Protect admin route
  if (!session || session.user.dominilingo?.role !== 'admin')
    return <div>Access denied.</div>

  return (
    <>
      <NavBar />
      <div className="mx-auto max-w-lg mt-4">
        <Head>
          <title>Dominilingo</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        {unapprovedWords?.length === 0 ? (
          <div>There is nothing here.</div>
        ) : (
          <div className="grid gap-3">
            {unapprovedWords?.map((word, idx) => {
              return <WordCard word={word} key={idx} />
            })}
          </div>
        )}
      </div>
    </>
  )
}
