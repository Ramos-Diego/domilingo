import Head from 'next/head'
import { GetStaticProps } from 'next'
import WordCard from '../components/WordCard'
import { Word } from '../lib/data-types'
import NavBar from '../components/NavBar'
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
    // Load the words on componentDidMount
    dispatch({ type: 'LOAD', loadedWords: words })
  }, [])
  return (
    <>
      <NavBar />
      <Head>
        <title>Domilingo</title>
      </Head>
      <main className="mx-auto max-w-lg my-4 ">
        <div className="grid gap-3">
          {state.searching ? (
            <>
              {state.searchResults?.map((word, idx) => {
                return <WordCard word={word} key={idx} />
              })}
            </>
          ) : (
            <>
              {words?.map((word, idx) => {
                return <WordCard word={word} key={idx} />
              })}
            </>
          )}
        </div>
      </main>
    </>
  )
}
