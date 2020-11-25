import Head from 'next/head'
import Center from '../components/Center'
import WordCard from '../components/WordCard'
import NavBar from '../components/NavBar'
import { GetStaticProps, GetStaticPaths } from 'next'
import { getUserWords, getUserIds } from '../utils/dbFunctions'
import { Word } from '../lib/data-types'

export default function uid({ words }: { words: Word[] }) {
  return (
    <>
      <Head>
        <title>Add new word</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NavBar />
      <Center max="sm" styles="px-2">
        <div className="grid justify-center sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {words.map((item, idx) => {
            return <WordCard word={item} key={idx} />
          })}
        </div>
      </Center>
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  // Get all the ids for all the public officials in the database
  const _ids: { _id: string }[] = JSON.parse(await getUserIds())

  // Convert result array into the appropiate type of array for
  // Next.js getStaticPaths function
  const paths = _ids.map(({ _id }) => ({
    params: { _id },
  }))

  return { paths, fallback: false }
}

export const getStaticProps: GetStaticProps = async ({
  params: { _id },
}: {
  params: { _id: string }
}) => {
  const words = JSON.parse(await getUserWords(_id))

  return { props: { words } }
}
