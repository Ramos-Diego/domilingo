import Head from 'next/head'
import Alert from '../components/Alert'
import { useForm } from 'react-hook-form'
import { useSession } from 'next-auth/client'
import { NewWordForm } from '../lib/data-types'
import { updateWordFetch } from '../utils/client'
import { useState } from 'react'
import { useContext } from 'react'
import { GlobalContext } from '../context/GlobalState'
import Layout from '../components/Layout'

export default function New() {
  const { state, dispatch } = useContext(GlobalContext)
  const { register, handleSubmit, errors } = useForm()
  const [session, loading] = useSession()
  const [duplicateError, setDuplicateError] = useState(false)

  if (loading) return null

  if (!session) {
    return <div>You must be logged in to submit a new word.</div>
  }

  return (
    <Layout>
      <Head>
        <title>Edit</title>
      </Head>
      <div className="grid justify-items-center items-start gap-5 min-h-screen bg-gray-100 dark:bg-gray-800 dark:text-gray-100">
        <form
          onSubmit={handleSubmit(async (data: NewWordForm, e) => {
            if (state?.selectedWord?.slug) {
              dispatch({ type: 'EDIT' })
              const response = await updateWordFetch(
                data,
                state.selectedWord.slug
              )
              if (response.ok) {
                e?.target.reset()
                // updateWordFetch returns the slug correspoding to the edited word
                const { slug } = await response.json()
                // Redirect user to slug page using Window.location
                location.assign(`/d/${slug}`)
              } else {
                location.assign('/')
              }
            }
          })}
          className="max-w-screen-sm w-full bg-gray-50 shadow-lg dark:bg-gray-900 rounded-md overflow-hidden select-none"
        >
          <section>
            <h1 className="mt-4 text-center text-xl font-bold">Edit</h1>
          </section>
          <section className="grid grid-cols-6 gap-3 px-3 sm:px-5 mb-5">
            <label className="font-medium col-span-full sm:col-span-3">
              Word
              <input
                name="word"
                ref={register({ required: true })}
                defaultValue={
                  state.editing ? state.selectedWord?.word : undefined
                }
                placeholder="Enter word"
                className="mt-1 w-full rounded-md px-3 py-1 border-2 dark:border-gray-600 dark:bg-gray-900 transition hover:shadow-md dark:hover:border-gray-400 focus:shadow-md focus:outline-none focus:ring-1 focus:border-blue-700 dark:focus:border-blue-400 focus:ring-blue-700 dark:focus:ring-blue-400"
              />
              {duplicateError && <Alert>This word already exists.</Alert>}
              {errors.word && <Alert>This field is required.</Alert>}
            </label>

            <label className="block font-medium col-span-full">
              Definition
              <textarea
                name="definition"
                rows={4}
                defaultValue={
                  state.editing
                    ? state.selectedWord?.definitions[0].definition
                    : undefined
                }
                ref={register({ required: true })}
                placeholder="Enter definition"
                className="mt-1 w-full rounded-md px-3 py-1 border-2 dark:border-gray-600 dark:bg-gray-900 transition hover:shadow-md dark:hover:border-gray-400 focus:shadow-md focus:outline-none focus:ring-1 focus:border-blue-700 dark:focus:border-blue-400 focus:ring-blue-700 dark:focus:ring-blue-400"
              ></textarea>
              {errors.definition && <Alert>This field is required.</Alert>}
            </label>
            <label className="font-medium col-span-full ">
              Sentence
              <input
                name="example"
                ref={register({ required: true })}
                placeholder="Enter sentence"
                defaultValue={
                  state.editing
                    ? state.selectedWord?.definitions[0].examples[0]
                    : undefined
                }
                className="mt-1 w-full rounded-md px-3 py-1 border-2 dark:border-gray-600 dark:bg-gray-900 transition hover:shadow-md dark:hover:border-gray-400 focus:shadow-md focus:outline-none focus:ring-1 focus:border-blue-700 dark:focus:border-blue-400 focus:ring-blue-700 dark:focus:ring-blue-400"
              />
              {errors.example && <Alert>This field is required.</Alert>}
            </label>
            <label className="font-medium col-span-full sm:col-span-3">
              Tags (Comma separated)
              <input
                name="tags"
                ref={register({ required: false })}
                defaultValue={
                  state.editing ? state.selectedWord?.tags?.join() : undefined
                }
                placeholder="Enter tags"
                className="mt-1 w-full rounded-md px-3 py-1 border-2 dark:border-gray-600 dark:bg-gray-900 transition hover:shadow-md dark:hover:border-gray-400 focus:shadow-md focus:outline-none focus:ring-1 focus:border-blue-700 dark:focus:border-blue-400 focus:ring-blue-700 dark:focus:ring-blue-400"
              />
            </label>
          </section>
          <section className="flex justify-end px-5 py-3 bg-gray-100 border-t-2 dark:bg-gray-900 dark:border-gray-600">
            <button
              // Disable button so that user can't submit twice by accident
              className="px-3 py-1 w-auto rounded font-bold bg-blue-600 text-white dark:bg-blue-600 transition focus:outline-none transform hover:scale-x-105 focus:scale-x-100 hover:bg-blue-700 focus:bg-blue-700 hover:shadow-md focus:shadow-md focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-200"
            >
              Edit
            </button>
          </section>
        </form>
      </div>
    </Layout>
  )
}
