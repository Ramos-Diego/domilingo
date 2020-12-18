import Head from 'next/head'
import Alert from '../components/Alert'
import { useForm } from 'react-hook-form'
import { useSession } from 'next-auth/client'
import { NewWordForm } from '../lib/data-types'
import { createWordFetch } from '../utils/client'
import Layout from '../components/Layout'
import { useState } from 'react'

export default function New() {
  const { register, handleSubmit, errors } = useForm()
  const [session, loading] = useSession()
  const [sumitted, setSumitted] = useState(false)
  const [duplicateError, setDuplicateError] = useState(false)

  if (loading) return null

  if (!session) {
    return <div>You must be logged in to submit a new word.</div>
  }

  return (
    <Layout>
      <Head>
        <title>Add new word</title>
      </Head>
      <p className="font-sans text-xl font-bold text-center mb-4 uppercase">
        Add a word to the dictionary
      </p>
      <form
        className="grid gap-3 ring ring-gray-900 shadow-md rounded px-8 pt-6 pb-8 m-3"
        onSubmit={handleSubmit(async (data: NewWordForm, e) => {
          setSumitted(true)
          const response = await createWordFetch(data)
          if (response.ok) {
            e?.target.reset()
            // createWordFetch returns the slug correspoding to the new word
            const { slug } = await response.json()
            // Redirect user to new page using Window.location
            location.assign(`/d/${slug}`)
          } else {
            setSumitted(false)
            // TODO: Make type for errors
            const data = await response.json()
            if (data.error === 'slug_already_exists') setDuplicateError(true)
          }
        })}
      >
        <label className="font-bold">
          Word
          <input
            className="shadow appearance-none rounded w-full py-2 px-3 bg-gray-900 text-white leading-tight focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
            name="word"
            ref={register({ required: true })}
            placeholder="Enter word"
            onFocus={() => setDuplicateError(false)}
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
            placeholder="Enter tags"
          />
        </label>
        <button
          className="block bg-blue-500 hover:bg-blue-700 focus:bg-blue-700 focus:outline-none text-white font-bold text-sm py-2 px-4 rounded disabled:opacity-50"
          // Disable button so that user can't submit twice by accident
          disabled={sumitted}
        >
          Submit
        </button>
      </form>
    </Layout>
  )
}
