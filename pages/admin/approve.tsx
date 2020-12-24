import Head from 'next/head'
import { GetServerSideProps } from 'next'
import WordCard from '../../components/WordCard'
import { useSession } from 'next-auth/client'
import { ExtendedUseSession, Word } from '../../lib/data-types'
import useSWR from 'swr'
import NavBar from '../../components/NavBar'
import { connectToDatabase } from '../../utils/mongodb'
import Layout from '../../components/Layout'

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
  const [session, loading]: ExtendedUseSession = useSession()

  const { data: unapprovedWords } = useSWR('/api/admin', {
    initialData: words,
  })

  if (loading)
    return <div className="text-center font-bold text-xl pt-10">Loading...</div>

  // Protect admin route
  if (!session || session.user.domilingo?.role !== 'admin')
    return location.assign('/')

  return (
    <Layout>
      <Head>
        <title>Admin</title>
      </Head>
      {unapprovedWords?.length === 0 ? (
        <div className="text-center font-bold text-xl pt-10">
          There is nothing here.
        </div>
      ) : (
        <div className="max-w-lg mx-auto grid justify-items-center items-start gap-1 sm:gap-3 bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-gray-50">
          <div className="grid gap-3">
            {unapprovedWords?.map((word, idx) => {
              return <WordCard word={word} key={idx} />
            })}
          </div>
        </div>
      )}
    </Layout>
  )
}
