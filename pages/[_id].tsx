import Head from 'next/head'
import WordCard from '../components/WordCard'
import { GetStaticProps, GetStaticPaths, InferGetStaticPropsType } from 'next'
import { getUserWords, getUserIds } from '../utils/dbFunctions'
import { Word } from '../lib/data-types'
import NavBar from '../components/NavBar'

export const getStaticPaths: GetStaticPaths<{ _id: string }> = async () => {
  // Get all the ids for all the public officials in the database
  const _ids: { _id: string }[] = JSON.parse(await getUserIds())

  // Convert result array into the appropiate type of array for
  // Next.js getStaticPaths function
  const paths = _ids.map(({ _id }) => ({
    params: { _id },
  }))

  return { paths, fallback: false }
}

export const getStaticProps: GetStaticProps<{ staticProps: Word[] }> = async ({
  params,
}) => {
  const staticProps = JSON.parse(await getUserWords(params?._id as string))

  return { props: { staticProps }, revalidate: 3 }
}

export default function uid({
  staticProps,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <Head>
        <title>Add new word</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NavBar />
      <div className="mx-auto max-w-lg mt-4">
        <div className="grid gap-3">
          {staticProps.map((item, idx) => {
            return <WordCard word={item} key={idx} />
          })}
        </div>
      </div>
    </>
  )
}
