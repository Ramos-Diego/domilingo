import Head from 'next/head'
import WordCard from '../components/WordCard'
import { Word } from '../lib/data-types'
import Layout from '../components/Layout'
import { useContext, useRef, useCallback, useEffect } from 'react'
import { GlobalContext } from '../context/GlobalState'
import searchAPI from '../components/SearchAPI'
// import { GetStaticProps } from 'next'
// import { connectToDatabase } from '../utils/mongodb'

export default function Home({ words }: { words: Word[] }) {
  const { state, dispatch } = useContext(GlobalContext)

  // Load the initial words
  // useEffect(() => {
  //   dispatch({ type: 'LOAD', payload: words })
  // }, [])

  const { loading } = searchAPI(state.searchQuery, state.pageNumber)

  const observer: any = useRef(undefined)
  // This is the intersection oberver to know when the last
  // element is visible
  const lastBookElementRef = useCallback(
    (node) => {
      if (loading) return //Don't call API when loading
      // Remove the observer from the previous last element
      if (observer.current) observer.current.disconnect()
      // Assing the observer to the new last element
      observer.current = new IntersectionObserver((entries) => {
        // If the last element is visible and there's more data to load
        if (entries[0].isIntersecting && state.hasMore) {
          dispatch({ type: 'PAGE_NUMBER' })
        }
      })
      if (node) observer.current.observe(node)
    },
    [loading, state.hasMore]
  )

  return (
    <Layout>
      <Head>
        <title>Domilingo</title>
      </Head>
      <div className="max-w-lg mx-auto grid justify-items-center items-start gap-1 sm:gap-3 md:max-w-screen-lg md:px-3 md:grid-cols-2 bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-gray-50">
        <>
          {state.words.map((word, idx) => {
            if (state.words.length === idx + 1) {
              return (
                <div ref={lastBookElementRef} key={idx}>
                  <WordCard word={word} />
                </div>
              )
            } else {
              return <WordCard word={word} key={idx} />
            }
          })}
        </>
        {loading && <div>Loading...</div>}
      </div>
    </Layout>
  )
}

// export const getStaticProps: GetStaticProps<{
//   words: Word[]
// }> = async () => {
//   const { db } = await connectToDatabase()

//   // Load the first 25 words and to enable SSG
//   const arr = await db
//     .collection('words')
//     .find({ approved: true }, { projection: { _id: 0 } })
//     .limit(25)
//     .toArray()

//   // Shuffle words
//   const words = arr.sort(() => Math.random() - 0.5)

//   return { props: { words }, revalidate: 30 }
// }
