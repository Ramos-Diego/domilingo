import Head from 'next/head'
import { GetStaticProps, InferGetStaticPropsType } from 'next'
import { getUnapprovedWords } from '../../utils/dbFunctions'
import NavBar from '../../components/NavBar'
import Center from '../../components/Center'
import WordCard from '../../components/WordCard'
import { useSession } from 'next-auth/client'
import { ExtendedUseSession, Word } from '../../lib/data-types'
import useSWR from 'swr'

export const getStaticProps: GetStaticProps<{
  staticProps: Word[]
}> = async () => {
  const staticProps = JSON.parse(await getUnapprovedWords(true))

  return { props: { staticProps }, revalidate: 2 }
}

export default function Approve({
  staticProps,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const [session]: ExtendedUseSession = useSession()

  const { data: unapprovedWords } = useSWR('/api/admin', {
    initialData: staticProps,
  })

  // Protect admin route
  if (!session || session.user.dominilingo?.role !== 'admin')
    return <div>Access denied.</div>

  return (
    <>
      <NavBar />
      <Center max="lg" styles="px-2 mb-4">
        <Head>
          <title>Dominilingo</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        {unapprovedWords?.length === 0 && <div>There is nothing here.</div>}
        <div className="grid justify-center sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {unapprovedWords?.map((word, idx) => {
            return <WordCard word={word} key={idx} />
          })}
        </div>
      </Center>
    </>
  )
}
