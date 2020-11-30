import Head from 'next/head'
import { GetStaticProps, GetStaticPaths } from 'next'
import NavBar from '../../components/NavBar'
import { Word } from '../../lib/data-types'
import WordCard from '../../components/WordCard'
import { connectToDatabase } from '../../utils/mongodb'

export const getStaticPaths: GetStaticPaths<{ slug: string }> = async () => {
  const { db } = await connectToDatabase()

  const slugs: Word[] = await db
    .collection('words')
    .find({}, { slug: 1 })
    .toArray()

  const paths = slugs.map(({ slug }) => ({
    params: { slug },
  }))

  // IF FALLBACK IS BLOCKING THERE WILL BE NO LOADING SCREEN, BUT PAGE WILL LOAD
  return { paths, fallback: 'blocking' }
  // IF FALLBACK IS TRUE YOU MUST CREATE A LOADING SCREEN AND PAGE LOADS
  // IF FALLBACK IS FALSE NO PAGES WILL BE PRE-RENDERED AFTER BUILD
}

// getStaticProps generates an html file AT BUILD TIME using the props it returns
export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { db } = await connectToDatabase()
  const word = await db
    .collection('words')
    .findOne({ slug: params?.slug }, { projection: { _id: 0 } })

  if (!word) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }

  // Upon every request the following logic runs.
  // revalidate: Has it been 2 seconds since the last request to this page?
  // If yes, get the props again, otherwise serve the previously generated page
  return {
    props: { word }, // will be passed to the page component as props
    revalidate: 1,
  }
}

export default function Slug({ word }: { word: Word }) {
  return (
    <>
      <NavBar />
      <Head>
        <title>{word.word}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="mx-auto max-w-lg mt-4">
        <WordCard word={word} />
      </div>
    </>
  )
}
