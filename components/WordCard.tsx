import { useSession } from 'next-auth/client'
import Button from './Button'

export default function WordCard({
  item,
}: {
  // Todo: Remove any type
  item: any
}) {
  // Todo: Remove any type
  const [session]: any = useSession()

  return (
    <div className="grid grid-rows-hamburger rounded bg-purple-800 p-3">
      <div className="text-lg font-extrabold overflow-x-auto">{item.word}</div>
      {item.definitions.map((item, idx) => {
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
      {/* ADMIN TOOLS */}
      {session && session.user.dominilingo.uid === item.uid && (
        <Button>Edit</Button>
      )}
      {/* <div className="grid gap-x-2 grid-flow-col">
      <div className="bg-purple-900 px-2 text-center rounded">Synonyms</div>
      <div className="bg-purple-900 px-2 text-center rounded">Antonyms</div>
    </div> */}
    </div>
  )
}
