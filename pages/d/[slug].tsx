import Head from 'next/head'
import { GetStaticProps, GetStaticPaths } from 'next'
import { getWordData, getAllSlugs } from '../../utils/dbFunctions'
import NavBar from '../../components/NavBar'
import Center from '../../components/Center'
// import WordCard from '../../components/WordCard'
import { Word } from '../../lib/data-types'
import { InferGetStaticPropsType } from 'next'

export const getStaticPaths: GetStaticPaths<{ slug: string }> = async () => {
  // Get all the ids for all the public officials in the database
  const slugs: { slug: string }[] = JSON.parse(await getAllSlugs())

  // Convert result array into the appropiate type of array for
  // Next.js getStaticPaths function
  const paths = slugs.map(({ slug }) => ({
    params: { slug },
  }))

  return { paths, fallback: 'blocking' }
}

// getStaticProps generates an html file AT BUILD TIME using the props it returns
export const getStaticProps: GetStaticProps<{ word: Word }> = async ({
  params,
}) => {
  const word = JSON.parse(await getWordData(params?.slug))

  // Upon every request the following logic runs.
  // revalidate: Has it been 2 seconds since the last request to this page?
  // If yes, get the props again, otherwise serve the previously generated page
  return {
    props: { word }, // will be passed to the page component as props
    revalidate: 2,
  }
}

export default function Home({
  word,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <NavBar />
      <Center max="lg" styles="px-2 mb-4">
        <Head>
          <title>{word.word}</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        {/* <WordCard word={word} /> */}
      </Center>
    </>
  )
}
