import Head from 'next/head'
import { GetStaticProps } from 'next'
import { getUnapprovedWords } from '../../utils/dbFunctions'
import NavBar from '../../components/NavBar'
import Center from '../../components/Center'
import WordCard from '../../components/WordCard'
import { useSession } from 'next-auth/client'
import { ExtendedUseSession, Word } from '../../lib/data-types'
import useSWR from 'swr'

export default function Approve() {
  const [session]: ExtendedUseSession = useSession()

  // Protect admin route
  if (!session || session.user.dominilingo?.role !== 'admin')
    return <div>Access denied.</div>

  const { data }: { data?: Word[] } = useSWR('/api/db')

  if (!data) return <div>loading...</div>

  return (
    <>
      <NavBar />
      <Center max="lg" styles="px-2 mb-4">
        <Head>
          <title>Dominilingo</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        {data?.length === 0 && <div>There is nothing here.</div>}
        <div className="grid justify-center sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {data?.map((word, idx) => {
            return <WordCard word={word} key={idx} />
          })}
        </div>
      </Center>
    </>
  )
}

// export const getStaticProps: GetStaticProps = async () => {
//   const words = JSON.parse(await getUnapprovedWords())

//   return { props: { words } }
// }
