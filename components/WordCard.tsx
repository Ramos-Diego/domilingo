import { ExtendedUseSession, Word } from '../lib/data-types'
import Button from './Button'
import Link from 'next/link'
import { useSession } from 'next-auth/client'
import { approveWordFetch, deleteWordFetch } from '../utils/client'
import { trigger } from 'swr'
import { useRouter } from 'next/router'
import { FaTwitter } from 'react-icons/fa'

export default function WordCard({ word }: { word: Word }) {
  const router = useRouter()
  const [session]: ExtendedUseSession = useSession()
  const date = new Date(word.created)
  const dateString = date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })

  return (
    <div className="grid gap-2 rounded bg-gray-800 p-3">
      <div className="flex gap-2 justify-between">
        <div className="text-lg font-extrabold overflow-x-auto">
          <Link href={`/d/${word.slug}`}>
            <a className="hover:text-blue-400">{word.word}</a>
          </Link>
        </div>
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
      </div>
      <div>
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
      </div>
      <div>{dateString}</div>
      {session && (
        <>
          {session.user.domilingo?.role === 'admin' && (
            <div className="flex justify-start gap-2">
              <Button
                onClick={async () => {
                  await deleteWordFetch(word.slug)
                  // Trigger a revalidation/update the cache when the promise resolves
                  router.pathname === '/' && trigger('/api/db')
                  router.pathname === '/admin/approve' && trigger('/api/admin')
                }}
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
                onClick={() =>
                  console.log('edit funciton does not exist, yet.')
                }
              >
                Edit
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  )
}
