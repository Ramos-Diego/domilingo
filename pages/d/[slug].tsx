import Head from 'next/head'
import { GetStaticProps, GetStaticPaths } from 'next'
import { getWordData, getAllSlugs } from '../../utils/dbFunctions'
import NavBar from '../../components/NavBar'
import { Word } from '../../lib/data-types'
import { InferGetStaticPropsType } from 'next'
import WordCard from '../../components/WordCard'

export const getStaticPaths: GetStaticPaths<{ slug: string }> = async () => {
  // Get all the ids for all the public officials in the database
  const slugs: { slug: string }[] = JSON.parse(await getAllSlugs())

  // Convert result array into the appropiate type of array for
  // Next.js getStaticPaths function
  const paths = slugs.map(({ slug }) => ({
    params: { slug },
  }))

  // IF FALLBACK IS BLOCKING THERE WILL BE NO LOADING SCREEN, BUT PAGE WILL LOAD
  return { paths, fallback: 'blocking' }
  // IF FALLBACK IS TRUE YOU MUST CREATE A LOADING SCREEN AND PAGE LOADS
  // IF FALLBACK IS FALSE NO PAGES WILL BE PRE-RENDERED AFTER BUILD
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
    revalidate: 1,
  }
}

export default function Home({
  word,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <NavBar />
      <div className="mx-auto max-w-lg mt-4">
        {word ? (
          <>
            <Head>
              <title>{word.word}</title>
              <link rel="icon" href="/favicon.ico" />
            </Head>
            <WordCard word={word} />
          </>
        ) : (
          <>
            {/* IF THE WORD GETS DELETED (API RETURNS NULL) THE SITE MUST BE REGENERATED WITH A 404 */}
            {/* FROM THAT POINT ON THAT 404 PAGE WILL BE ADDED TO THE LIST OF PRE-RENDERED PAGES */}
            {/* THERE COULD BE MANY PATHS WITH THIS CUSTOM 404 MESSAGE */}
            {/* ALL THESE REPEATED PAGES WILL ONLY BE DELETED AFTER ANOTHER BUILD */}
            <Head>
              <title>404</title>
              <link rel="icon" href="/favicon.ico" />
            </Head>
            <div>404</div>
          </>
        )}
      </div>
    </>
  )
}
