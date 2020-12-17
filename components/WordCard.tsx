import { ExtendedUseSession, Word } from '../lib/data-types'
import Button from './Button'
import Link from 'next/link'
import { useSession } from 'next-auth/client'
import { approveWordFetch, deleteWordFetch } from '../utils/client'
import { trigger } from 'swr'
import { useRouter } from 'next/router'
import { FaTwitter } from 'react-icons/fa'
import { useContext } from 'react'
import { GlobalContext } from '../context/GlobalState'
import DeleteModal from './DeleteModal'

export default function WordCard({ word }: { word: Word }) {
  const { dispatch } = useContext(GlobalContext)
  const router = useRouter()
  const [session]: ExtendedUseSession = useSession()
  const date = new Date(word.created)
  const dateString = date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })

  return (
    <>
      <DeleteModal />
      <article className="grid gap-2 rounded bg-gray-900 p-3">
        <section className="flex gap-2 justify-between items-center">
          <header className="text-lg font-extrabold overflow-x-auto">
            <Link href={`/d/${word.slug}`}>
              <a className="hover:text-blue-400">{word.word}</a>
            </Link>
          </header>
          {!word.approved && (
            <p className="ring-2 ring-yellow-500 rounded font-bold p-1">
              Unapproved
            </p>
          )}
          <a
            rel="noopener noreferrer"
            target="_blank"
            className="flex items-center gap-2 bg-blue-600 rounded px-2 p-1"
            href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
              `${word.definitions[0].examples[0]} @Domilingo domilingo.com/d/${word.slug}`
            )}`}
          >
            Tweet
            <FaTwitter className="text-blue-50" />
          </a>
        </section>
        <section>
          {word.definitions.map((item, idx) => {
            return (
              <div key={idx} className="grid gap-2">
                <div>{item.definition}</div>
                {item.examples.map((example, idx) => {
                  return (
                    <div key={idx} className="italic">
                      "{example}"
                    </div>
                  )
                })}
              </div>
            )
          })}
        </section>
        <footer>{dateString}</footer>
        {session && (
          <>
            {session.user.domilingo?.role === 'admin' && (
              <section className="flex justify-start gap-2">
                <Button
                  onClick={() =>
                    dispatch({
                      type: 'DELETE',
                      deleteState: true,
                      selectedWord: word,
                    })
                  }
                >
                  Delete
                </Button>
                {!word.approved && (
                  <Button
                    onClick={async () => {
                      await approveWordFetch(word.slug)
                      // Trigger a revalidation/update the cache when the promise resolves
                      trigger('/api/admin')
                    }}
                  >
                    Approve
                  </Button>
                )}
                <Button
                  onClick={() => {
                    dispatch({ type: 'EDIT', selectedWord: word })
                    console.log(word)
                    router.push('/edit')
                  }}
                >
                  Edit
                </Button>
              </section>
            )}
          </>
        )}
      </article>
    </>
  )
}
