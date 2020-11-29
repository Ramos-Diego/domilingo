import Head from 'next/head'
import Input from '../components/Input'
import Alert from '../components/Alert'
import { useForm } from 'react-hook-form'
import { useSession } from 'next-auth/client'
import { NewWordForm } from '../lib/data-types'
import { createWordFetch } from '../utils/client'
import NavBar from '../components/NavBar'
import { useState } from 'react'

export default function New() {
  const { register, handleSubmit, errors } = useForm()
  const [session, loading] = useSession()
  const [sumitted, setSumitted] = useState(false)

  if (loading) return null

  if (!session) {
    return <div>You must be logged in to submit a new word.</div>
  }

  return (
    <>
      <Head>
        <title>Add new word</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NavBar />
      <div className="mx-auto max-w-lg mt-4">
        <p className="font-sans text-xl font-bold text-center mb-4 uppercase">
          Add a word to the dictionary
        </p>
        <form
          className="grid gap-3 bg-gray-800 shadow-md rounded px-8 pt-6 pb-8 mb-4"
          onSubmit={handleSubmit(async (data: NewWordForm, e) => {
            e?.target.reset()
            setSumitted(true)
            // createWordFetch returns the slug correspoding to the new word
            const response = await createWordFetch(data)
            const { slug } = await response.json()
            // Redirect user to new page using Window.location
            location.assign(`/d/${slug}`)
          })}
        >
          <Input
            type="text"
            label="Word"
            name="word"
            register={register({ required: true })}
            placeholder="Enter word"
          />
          {errors.word && <Alert message="The word is required" />}
          <Input
            type="textarea"
            label="Definition"
            name="definition"
            register={register({ required: true })}
            placeholder="Enter definition"
          />
          {errors.definition && <Alert message="The definition is required" />}
          <Input
            type="text"
            label="Example sentence"
            name="example"
            register={register({ required: true })}
            placeholder="Enter sentence"
          />
          {errors.example && <Alert message="The example is required" />}
          <button
            className="block bg-blue-500 hover:bg-blue-700 focus:bg-blue-700 focus:outline-none text-white font-bold text-sm py-2 px-4 rounded disabled:opacity-50"
            disabled={sumitted}
          >
            Submit
          </button>
        </form>
      </div>
    </>
  )
}
