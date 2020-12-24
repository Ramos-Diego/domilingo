import { ExtendedUseSession, Word } from '../lib/data-types'
import Link from 'next/link'
import { useSession } from 'next-auth/client'
import { approveWordFetch } from '../utils/client'
import { trigger } from 'swr'
import { useRouter } from 'next/router'
import { useContext } from 'react'
import { GlobalContext } from '../context/GlobalState'
import ModalBackground from './ModalBackground'

export default function WordCard({ word }: { word: Word }) {
  const { state, dispatch } = useContext(GlobalContext)
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
      <ModalBackground component={word.slug} transparent />
      <article className="min-w-full px-3 py-2 sm:px-5 sm:py-3 rounded-md bg-gray-100 dark:bg-gray-900">
        <dl>
          <dt className="flex items-start gap-2">
            <h1 className="flex-auto mt-1 w-44 overflow-x-auto">
              <Link href={`/d/${word.slug}`}>
                <a className="cursor-pointer text-xl font-bold focus:outline-none hover:underline focus:underline">
                  {word.word}
                </a>
              </Link>
            </h1>
            <nav className="flex gap-1 items-center m-1">
              <a
                rel="noopener noreferrer"
                target="_blank"
                className="rounded-md p-1 hover:shadow-md focus:outline-none transition dark:hover:bg-gray-700 hover:bg-gray-300 dark:focus:bg-gray-700 focus:bg-gray-300"
                href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
                  `${word.definitions[0].examples[0]} @Domilingo domilingo.com/d/${word.slug}`
                )}`}
              >
                <svg className="w-6 h-6 fill-current" viewBox="0 0 512 512">
                  <title>Tweet</title>
                  <path d="M496 109.5a201.8 201.8 0 01-56.55 15.3 97.51 97.51 0 0043.33-53.6 197.74 197.74 0 01-62.56 23.5A99.14 99.14 0 00348.31 64c-54.42 0-98.46 43.4-98.46 96.9a93.21 93.21 0 002.54 22.1 280.7 280.7 0 01-203-101.3A95.69 95.69 0 0036 130.4c0 33.6 17.53 63.3 44 80.7A97.5 97.5 0 0135.22 199v1.2c0 47 34 86.1 79 95a100.76 100.76 0 01-25.94 3.4 94.38 94.38 0 01-18.51-1.8c12.51 38.5 48.92 66.5 92.05 67.3A199.59 199.59 0 0139.5 405.6a203 203 0 01-23.5-1.4A278.68 278.68 0 00166.74 448c181.36 0 280.44-147.7 280.44-275.8 0-4.2-.11-8.4-.31-12.5A198.48 198.48 0 00496 109.5z" />
                </svg>
              </a>
              {session && session.user.domilingo?.role === 'admin' && (
                <div className="select-none relative">
                  <button
                    onClick={() =>
                      state.modal === word.slug
                        ? dispatch({ type: 'MODAL', payload: '_OFF_' })
                        : dispatch({ type: 'MODAL', payload: word.slug })
                    }
                    className="rounded-md p-1 hover:shadow-md focus:outline-none transition dark:hover:bg-gray-700 hover:bg-gray-300 dark:focus:bg-gray-700 focus:bg-gray-300"
                  >
                    <svg className="w-6 h-6 fill-current" viewBox="0 0 512 512">
                      <title>Menu</title>
                      <circle cx="256" cy="256" r="48" />
                      <circle cx="256" cy="416" r="48" />
                      <circle cx="256" cy="96" r="48" />
                    </svg>
                  </button>
                  {state.modal === word.slug && (
                    <article className="z-10 absolute origin-top-right right-0 mt-2 rounded-md border-2 dark:border-gray-500 bg-white dark:bg-gray-900 shadow-lg ring-1 ring-black ring-opacity-5">
                      <section
                        role="menu"
                        aria-orientation="vertical"
                        aria-labelledby="options-menu"
                      >
                        <button
                          className="text-sm w-full text-left px-3 rounded py-2 text-gray-800 dark:text-gray-50 hover:shadow-md focus:outline-none transition dark:hover:bg-gray-700 hover:bg-gray-300 dark:focus:bg-gray-700 focus:bg-gray-300"
                          role="menuitem"
                          onClick={() => {
                            dispatch({ type: 'MODAL', payload: '_OFF_' })
                            dispatch({ type: 'EDIT', selectedWord: word })
                            console.log(word)
                            router.push('/edit')
                          }}
                        >
                          Edit
                        </button>
                        {!word.approved && (
                          <button
                            className="text-sm w-full text-left px-3 rounded py-2 text-gray-800 dark:text-gray-50 hover:shadow-md focus:outline-none transition dark:hover:bg-gray-700 hover:bg-gray-300 dark:focus:bg-gray-700 focus:bg-gray-300"
                            role="menuitem"
                            onClick={async () => {
                              await approveWordFetch(word.slug)
                              // Trigger a revalidation/update the cache when the promise resolves
                              trigger('/api/admin')
                            }}
                          >
                            Approve
                          </button>
                        )}
                        <button
                          onClick={() => {
                            dispatch({ type: 'SELECT', payload: word })
                            dispatch({
                              type: 'MODAL',
                              payload: '_DELETE_MODAL_',
                            })
                          }}
                          className="text-sm w-full text-left px-3 rounded py-2 text-gray-800 dark:text-gray-50 hover:shadow-md focus:outline-none transition dark:hover:bg-gray-700 hover:bg-gray-300 dark:focus:bg-gray-700 focus:bg-gray-300"
                          role="menuitem"
                        >
                          Delete
                        </button>
                      </section>
                    </article>
                  )}
                </div>
              )}
            </nav>
          </dt>
          <dd className="mt-2">
            {word.definitions.map((item, idx) => {
              return (
                <div key={idx} className="grid gap-2">
                  <p key={idx}>
                    {word.definitions.length > 1 && (
                      <span className="font-bold">{idx + 1}: </span>
                    )}
                    {item.definition}
                  </p>
                  {item.examples.map((example, idx) => {
                    return (
                      <figure key={idx}>
                        <blockquote className="italic mt-2 text-gray-600 dark:text-gray-400">
                          {example}
                        </blockquote>
                      </figure>
                    )
                  })}
                </div>
              )
            })}
          </dd>
        </dl>
        <footer className="mt-2 flex items-baseline gap-2">
          <p>{dateString}</p>

          {!word.approved && (
            <aside className="font-medium mt-1 rounded-md p-1 bg-opacity-25 text-yellow-900 dark:text-yellow-200 bg-yellow-400 dark:bg-yellow-300 select-none">
              Unapproved
            </aside>
          )}
        </footer>
      </article>
    </>
  )
}
