import { Session, useSession } from 'next-auth/client'
import WordCardWithForm from '../components/WordCardWithForm'
import HideIfDeleted from '../components/HideIfDeleted'
import { NewUser } from '../typings/dominilingo'
import Link from 'next/link'

type ExtendedSession = Session & { user: NewUser }

export default function WordCard({
  item,
}: {
  // Todo: Remove any type
  item: any
}) {
  const [session]: [ExtendedSession, boolean] = useSession()

  // This component returns two different types of word cards.
  // If the user logged in is an admin or author of the word
  // It will return a card containing a form to edit the word and a delete button
  // In any other case, this will return a simple card with no actions
  return (
    <HideIfDeleted word={item.word}>
      <div className="grid grid-rows-1fr-auto gap-2 rounded bg-gray-800 p-3">
        {session && session.user.dominilingo.uid === item.uid ? (
          <WordCardWithForm word={item} />
        ) : (
          <>
            <div className="text-lg font-extrabold overflow-x-auto">
              <Link href={`/d/${item.slug}`}>
                <a className="hover:text-blue-400">{item.word}</a>
              </Link>
            </div>
            <div>
              {item.definitions.map((item, idx) => {
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
        {/* <div className="grid gap-x-2 grid-flow-col">
      <div className="bg-purple-900 px-2 text-center rounded">Synonyms</div>
      <div className="bg-purple-900 px-2 text-center rounded">Antonyms</div>
    </div> */}
      </div>
    </HideIfDeleted>
  )
}
