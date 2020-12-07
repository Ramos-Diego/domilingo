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
      <p className="font-sans text-xl font-bold text-center mb-4 uppercase">
        Edit
      </p>
      <form
        className="grid gap-3 bg-gray-800 shadow-md rounded px-8 pt-6 pb-8 mb-4"
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
      >
        <label className="font-bold">
          Word
          <input
            className="shadow appearance-none rounded w-full py-2 px-3 bg-gray-900 text-white leading-tight focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
            name="word"
            ref={register({ required: true })}
            defaultValue={state.editing ? state.selectedWord?.word : undefined}
          />
        </label>
        {duplicateError && <Alert message="This word already exists." />}
        {errors.word && <Alert message="The word is required" />}
        <label className="font-bold">
          Definition
          <textarea
            className="shadow appearance-none rounded w-full py-2 px-3 text-white bg-gray-900 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
            name="definition"
            rows={4}
            ref={register({ required: true })}
            defaultValue={
              state.editing
                ? state.selectedWord?.definitions[0].definition
                : undefined
            }
            placeholder="Enter definition"
          />
        </label>
        {errors.definition && <Alert message="The definition is required" />}
        <label className="font-bold">
          Example sentence
          <input
            className="shadow appearance-none rounded w-full py-2 px-3 bg-gray-900 text-white leading-tight focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
            name="example"
            ref={register({ required: true })}
            defaultValue={
              state.editing
                ? state.selectedWord?.definitions[0].examples[0]
                : undefined
            }
            placeholder="Enter sentence"
          />
        </label>
        {errors.example && <Alert message="The example is required" />}
        <label className="font-bold">
          Tags (Comma separated)
          <input
            className="shadow appearance-none rounded w-full py-2 px-3 bg-gray-900 text-white leading-tight focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
            name="tags"
            ref={register({ required: false })}
            defaultValue={
              state.editing ? state.selectedWord?.tags?.join() : undefined
            }
            placeholder="Enter tags"
          />
        </label>
        <button
          className="block bg-blue-500 hover:bg-blue-700 focus:bg-blue-700 focus:outline-none text-white font-bold text-sm py-2 px-4 rounded disabled:opacity-50"
          // Disable button so that user can't submit twice by accident
        >
          Edit
        </button>
      </form>
    </Layout>
  )
}
