import Head from 'next/head'
import { GetStaticProps, InferGetStaticPropsType } from 'next'
import WordCard from '../components/WordCard'
import { Word } from '../lib/data-types'
import NavBar from '../components/NavBar'
import { connectToDatabase } from '../utils/mongodb'

export const getStaticProps: GetStaticProps<{
  words: Word[]
}> = async () => {
  const { db } = await connectToDatabase()

  const words = await db
    .collection('words')
    .find({ approved: true }, { projection: { _id: 0 } })
    // Collation allows for case insentive sorting
    .collation({ locale: 'en' })
    .sort({ word: 1 })
    .toArray()

  return { props: { words }, revalidate: 30 }
}

export default function Home({ words }: { words: Word[] }) {
  return (
    <>
      <NavBar />
      <div className="mx-auto max-w-lg my-4 ">
        <Head>
          <title>Dominilingo</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <div className="grid gap-3">
          {words?.map((word, idx) => {
            return <WordCard word={word} key={idx} />
          })}
        </div>
      </div>
    </>
  )
}
