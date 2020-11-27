import Head from 'next/head'
import { GetStaticProps, InferGetStaticPropsType } from 'next'
import { getApprovedWords } from '../utils/dbFunctions'
import NavBar from '../components/NavBar'
import Center from '../components/Center'
import WordCard from '../components/WordCard'
import { Word } from '../lib/data-types'
import useSWR from 'swr'

export const getStaticProps: GetStaticProps<{
  staticProps: Word[]
}> = async () => {
  const staticProps = JSON.parse(await getApprovedWords(true))

  return { props: { staticProps }, revalidate: 5 }
}

export default function Home({
  staticProps,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const { data: words } = useSWR('/api/db', {
    initialData: staticProps,
  })

  return (
    <>
      <NavBar />
      <Center max="lg" styles="px-2 mb-4">
        <Head>
          <title>Dominilingo</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <div className="grid justify-center sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {words?.map((word, idx) => {
            return <WordCard word={word} key={idx} />
          })}
        </div>
      </Center>
    </>
  )
}
