import Head from 'next/head'
import { GetStaticProps, GetStaticPaths } from 'next'
import { Word } from '../../lib/data-types'
import WordCard from '../../components/WordCard'
import { connectToDatabase } from '../../utils/mongodb'
import Layout from '../../components/Layout'

export const getStaticPaths: GetStaticPaths<{ slug: string }> = async () => {
  const { db } = await connectToDatabase()

  const slugs: Word[] = await db
    .collection('words')
    .find({}, { slug: 1 })
    .limit(10) // Only pre-render 10 pages
    .toArray()

  const paths = slugs.map(({ slug }) => ({
    params: { slug },
  }))

  // IF FALLBACK IS BLOCKING THERE WILL BE NO LOADING SCREEN, BUT PAGE WILL LOAD
  return { paths, fallback: 'blocking' }
  // IF FALLBACK IS TRUE YOU MUST CREATE A LOADING SCREEN AND PAGE LOADS
  // IF FALLBACK IS FALSE NO PAGES WILL BE PRE-RENDERED AFTER BUILD
}

// This function gets called at build time on server-side.
// It may be called again, on a serverless function, if
// revalidation is enabled and a new request comes in
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
  // revalidate: Has it been x seconds since the last request to this page?
  // If yes, get the props again, otherwise serve the previously generated page
  return { props: { word }, revalidate: 10 }
}

export default function Slug({ word }: { word: Word }) {
  return (
    <Layout>
      <Head>
        <title>{word.word}</title>
      </Head>
      <WordCard word={word} />
    </Layout>
  )
}
