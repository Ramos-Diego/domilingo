import Head from 'next/head'
import { GetStaticProps } from 'next'
import { getWords } from '../utils/dbFunctions'
import NavBar from '../components/NavBar'

export default function Home({ words }) {
  return (
    <>
      <NavBar />
      <div className="container mx-auto grid place-content-center">
        <Head>
          <title>Dominilingo</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <div className="grid gap-x-3 md:grid-cols-2 md:gap-x-9 md:gap-5 xl:grid-cols-3">
          {words.map((word, idx) => {
            return (
              <div className="rounded bg-purple-800 py-2 px-3" key={idx}>
                <div>{word.word}</div>
              </div>
            )
          })}
        </div>
      </div>
    </>
  )
}

export const getStaticProps: GetStaticProps = async (context) => {
  const words = JSON.parse(await getWords())

  return { props: { words } }
}
