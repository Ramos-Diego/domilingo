import Head from 'next/head'
import WordCard from '../components/WordCard'
import { GetStaticProps, GetStaticPaths } from 'next'
import { Word } from '../lib/data-types'
import { connectToDatabase } from '../utils/mongodb'
import Layout from '../components/Layout'
import Link from 'next/link'

export const getStaticPaths: GetStaticPaths<{ id: string }> = async () => {
  const { db } = await connectToDatabase()
  const ids: { id: string }[] = await db
    .collection('users')
    .find({}, { id: 1 })
    .limit(10) // Only pre-render 10 profiles
    .toArray()

  const paths = ids.map(({ id }) => ({
    params: { id },
  }))

  return { paths, fallback: 'blocking' }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { db } = await connectToDatabase()

  // Check if user exists
  const user = await db
    .collection('users')
    .findOne({ id: params?.id as string }, { projection: { _id: 0, name: 1 } })
  // Redirect if user doesn't exists
  if (!user) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }
  const name = user.name
  // Find user sumissions
  const words: Word[] = await db
    .collection('words')
    .find({ createdBy: params?.id as string }, { projection: { _id: 0 } })
    .toArray()

  return { props: { words, name }, revalidate: 1 }
}

export default function uid({ words, name }: { words: Word[]; name: string }) {
  return (
    <Layout>
      <Head>
        <title>Add new word</title>
      </Head>

      <div className="max-w-lg mx-auto grid justify-items-center items-start gap-1 sm:gap-3 bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-gray-50">
        <h1 className="my-3 text-center font-bold text-xl">{name}</h1>
        {words.length === 0 ? (
          <div className="grid gap-3 justify-items-center">
            <div>You have not submitted any words.</div>
            <Link href="/new">
              <a className="bg-gray-900 p-2 rounded font-semibold">
                Submit a word now!
              </a>
            </Link>
          </div>
        ) : (
          <div className="grid gap-3">
            {words.map((item, idx) => {
              return <WordCard word={item} key={idx} />
            })}
          </div>
        )}
      </div>
    </Layout>
  )
}
