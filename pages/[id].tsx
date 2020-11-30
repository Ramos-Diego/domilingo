import Head from 'next/head'
import WordCard from '../components/WordCard'
import { GetStaticProps, GetStaticPaths } from 'next'
import { Word } from '../lib/data-types'
import NavBar from '../components/NavBar'
import { connectToDatabase } from '../utils/mongodb'

export const getStaticPaths: GetStaticPaths<{ id: string }> = async () => {
  const { db } = await connectToDatabase()
  const ids: { id: string }[] = await db
    .collection('users')
    .find({}, { id: 1 })
    .toArray()

  const paths = ids.map(({ id }) => ({
    params: { id },
  }))

  return { paths, fallback: 'blocking' }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { db } = await connectToDatabase()

  // Check if user exists
  const exists = await db
    .collection('users')
    .findOne({ id: params?.id as string })
  // Redirect if user exists
  if (!exists) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }

  // Find user sumissions
  const words: Word[] = await db
    .collection('words')
    .find({ createdBy: params?.id as string }, { projection: { _id: 0 } })
    .toArray()

  return { props: { words }, revalidate: 1 }
}

export default function uid({ words }: { words: Word[] }) {
  return (
    <>
      <NavBar />
      <Head>
        <title>Add new word</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="mx-auto max-w-lg mt-4">
        <div className="grid gap-3">
          {words.map((item, idx) => {
            return <WordCard word={item} key={idx} />
          })}
        </div>
      </div>
    </>
  )
}
