import { ExtendedUseSession, Word } from '../lib/data-types'
import Button from './Button'
import Link from 'next/link'
import { useSession } from 'next-auth/client'
import { approveWordFetch, deleteWordFetch } from '../utils/client'
import { trigger } from 'swr'
import { useRouter } from 'next/router'

export default function WordCard({ word }: { word: Word }) {
  const router = useRouter()
  const [session]: ExtendedUseSession = useSession()

  // This component returns two different types of word cards.
  // If the user logged in is an admin or author of the word
  // It will return a card containing a form to edit the word and a delete button
  // In any other case, this will return a simple card with no actions
  return (
    <div className="grid grid-rows-1fr-auto gap-2 rounded bg-gray-800 p-3">
      <div className="text-lg font-extrabold overflow-x-auto">
        <Link href={`/d/${word.slug}`}>
          <a className="hover:text-blue-400">{word.word}</a>
        </Link>
      </div>
      <div>
        {word.definitions.map((item, idx) => {
          return (
            <div key={idx} className="mt-2">
              <div className="ml-2 overflow-x-auto">{item.definition}</div>
              {item.examples.map((example, idx) => {
                return (
                  <div key={idx} className="italic overflow-x-auto">
                    "{example}"
                  </div>
                )
              })}
            </div>
          )
        })}
      </div>
      {session && session.user.dominilingo?._id === word.createdBy && (
        <div className="grid grid-flow-col gap-2">
          <Button
            onClick={() => console.log('edit funciton does not exist, yet.')}
          >
            Edit
          </Button>
          <Button
            onClick={async () => {
              await deleteWordFetch(word._id)
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
                await approveWordFetch(word._id)
                // Trigger a revalidation/update the cache when the promise resolves
                trigger('/api/admin')
              }}
            >
              Approve
            </Button>
          )}
        </div>
      )}
    </div>
  )
}
