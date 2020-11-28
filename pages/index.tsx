import Head from 'next/head'
import { GetStaticProps, InferGetStaticPropsType } from 'next'
import { getApprovedWords } from '../utils/dbFunctions'
import WordCard from '../components/WordCard'
import { Word } from '../lib/data-types'
import NavBar from '../components/NavBar'

export const getStaticProps: GetStaticProps<{
  staticProps: Word[]
}> = async () => {
  const staticProps = JSON.parse(await getApprovedWords(true))

  return { props: { staticProps }, revalidate: 3 }
}

export default function Home({
  staticProps,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <NavBar />
      <div className="mx-auto max-w-lg my-4 ">
        <Head>
          <title>Dominilingo</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <div className="grid gap-3">
          {staticProps?.map((word, idx) => {
            return <WordCard word={word} key={idx} />
          })}
        </div>
      </div>
    </>
  )
}
