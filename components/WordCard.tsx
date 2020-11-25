import { useSession } from 'next-auth/client'
import WordCardWithForm from '../components/WordCardWithForm'
import HideIfDeleted from '../components/HideIfDeleted'
import { ExtendedUseSession, Word } from '../lib/data-types'
import Link from 'next/link'
import { useRouter } from 'next/router'

export default function WordCard({ word }: { word: Word }) {
  const router = useRouter()
  const [session]: ExtendedUseSession = useSession()

  // This component returns two different types of word cards.
  // If the user logged in is an admin or author of the word
  // It will return a card containing a form to edit the word and a delete button
  // In any other case, this will return a simple card with no actions
  return (
    <HideIfDeleted _id={word._id}>
      <div className="grid grid-rows-1fr-auto gap-2 rounded bg-gray-800 p-3">
        {session && session.user.dominilingo?._id === word.createdBy ? (
          <WordCardWithForm word={word} />
        ) : (
          <>
            <div className="text-lg font-extrabold overflow-x-auto">
              {router.asPath !== `/d/${word.slug}` ? (
                <Link href={`/d/${word.slug}`}>
                  <a className="hover:text-blue-400">{word.word}</a>
                </Link>
              ) : (
                <>{word.word}</>
              )}
            </div>
            <div>
              {word.definitions.map((item, idx) => {
                return (
                  <div key={idx} className="mt-2">
                    <div className="ml-2 overflow-x-auto">
                      {item.definition}
                    </div>
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
          </>
        )}
      </div>
    </HideIfDeleted>
  )
}
