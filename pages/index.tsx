import Head from 'next/head'
import { GetStaticProps } from 'next'
import { getWords } from '../utils/dbFunctions'
import NavBar from '../components/NavBar'
import Center from '../components/Center'
import WordCard from '../components/WordCard'

export default function Home({ words }) {
  return (
    <>
      <NavBar />
      <Center max="lg" styles="px-2 mb-4">
        <Head>
          <title>Dominilingo</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <div className="grid justify-center sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {words.map((item, idx) => {
            return <WordCard item={item} key={idx} />
          })}
        </div>
      </Center>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const words = JSON.parse(await getWords())

  return { props: { words } }
}
