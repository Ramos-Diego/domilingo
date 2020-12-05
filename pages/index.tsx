import Head from 'next/head'
import { GetStaticProps } from 'next'
import WordCard from '../components/WordCard'
import { Word } from '../lib/data-types'
import Layout from '../components/Layout'
import { connectToDatabase } from '../utils/mongodb'
import { useContext, useEffect } from 'react'
import { GlobalContext } from '../context/GlobalState'

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
  const { state, dispatch } = useContext(GlobalContext)
  useEffect(() => {
    // Load and shuffle the words from getStaticProps on componentDidMount
    dispatch({ type: 'LOAD_AND_SHUFFLE', loadedWords: words })
  }, [])
  return (
    <Layout>
      <Head>
        <title>Domilingo</title>
      </Head>
      <div className="grid gap-3">
        {state.searching ? (
          <>
            {state.searchResults?.map((word, idx) => {
              return <WordCard word={word} key={idx} />
            })}
          </>
        ) : (
          <>
            {state.shuffledWords?.map((word, idx) => {
              return <WordCard word={word} key={idx} />
            })}
          </>
        )}
      </div>
    </Layout>
  )
}
