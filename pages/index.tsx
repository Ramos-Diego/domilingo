import Head from 'next/head'
import WordCard from '../components/WordCard'
import { Word } from '../lib/data-types'
import Layout from '../components/Layout'
import SearchAPI from '../components/SearchAPI'
import { GetStaticProps } from 'next'
import { connectToDatabase } from '../utils/mongodb'
import { useContext } from 'react'
import { GlobalContext } from '../context/GlobalState'

export default function Home({
  wordsFirstHalf,
  wordsSecondHalf,
}: {
  wordsFirstHalf: Word[]
  wordsSecondHalf: Word[]
}) {
  const { state } = useContext(GlobalContext)
  SearchAPI(state.searchQuery)

  return (
    <Layout>
      <Head>
        <title>Domilingo</title>
      </Head>
      <div className="mx-auto grid lg:flex justify-center gap-1 lg:gap-5 md:px-3 bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-gray-50">
        {state.searchQuery === '' ? (
          <>
            {/* INDEX PAGE */}
            <div className="flex flex-col gap-1 lg:gap-5 max-w-lg">
              {wordsFirstHalf.map((word, idx) => {
                return <WordCard word={word} key={idx} />
              })}
            </div>
            <div className="flex flex-col gap-1 lg:gap-5 max-w-lg">
              {wordsSecondHalf.map((word, idx) => {
                return <WordCard word={word} key={idx} />
              })}
            </div>
          </>
        ) : (
          <>
            {/* SEARCH */}
            <div className="flex flex-col gap-1 lg:gap-5 max-w-lg">
              {state.wordsFirstHalf.map((word, idx) => {
                return <WordCard word={word} key={idx} />
              })}
            </div>
            <div className="flex flex-col gap-1 lg:gap-5 max-w-lg">
              {state.wordsSecondHalf.map((word, idx) => {
                return <WordCard word={word} key={idx} />
              })}
            </div>
          </>
        )}
      </div>
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const { db } = await connectToDatabase()

  // Load the first 30 words
  const arr = await db
    .collection('words')
    .find({ approved: true }, { projection: { _id: 0 } })
    .limit(30)
    .toArray()

  // Shuffle words
  const words = arr.sort(() => Math.random() - 0.5)

  // Split array in half for CSS purposes
  const wordsFirstHalf = words.slice(0, words.length / 2)
  const wordsSecondHalf = words.slice(words.length / 2)

  return { props: { wordsFirstHalf, wordsSecondHalf }, revalidate: 30 }
}
