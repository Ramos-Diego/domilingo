import Head from 'next/head'
import { GetStaticProps, GetStaticPaths } from 'next'
import { getWordData, getAllSlugs } from '../../utils/dbFunctions'
import NavBar from '../../components/NavBar'
import Center from '../../components/Center'
import WordCard from '../../components/WordCard'

export default function Home({ word }) {
  return (
    <>
      <NavBar />
      <Center max="lg" styles="px-2 mb-4">
        <Head>
          <title>{word.word}</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <WordCard item={word} />
      </Center>
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  // Get all the ids for all the public officials in the database
  const slugs: { slug: string }[] = JSON.parse(await getAllSlugs())

  // Convert result array into the appropiate type of array for
  // Next.js getStaticPaths function
  const paths = slugs.map(({ slug }) => ({
    params: { slug },
  }))

  return { paths, fallback: false }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const word = JSON.parse(await getWordData(params?.slug))

  return { props: { word } }
}
