import Head from 'next/head'
import Button from '../components/Button'
import Input from '../components/Input'
import Alert from '../components/Alert'
import Center from '../components/Center'
import { useForm } from 'react-hook-form'
import NavBar from '../components/NavBar'
import { useSession } from 'next-auth/client'
import { useRouter } from 'next/router'
import { NewWordForm } from '../lib/data-types'
import { createWordFetch } from '../utils/client'

export default function New() {
  const { register, handleSubmit, errors } = useForm()
  const [session, loading] = useSession()
  const router = useRouter()

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
      <Center max="sm" styles="px-2">
        <p className="font-sans text-xl font-bold text-center mb-4 uppercase">
          Add a word to the dictionary
        </p>
        <form
          className="grid gap-3 bg-gray-800 shadow-md rounded px-8 pt-6 pb-8 mb-4"
          onSubmit={handleSubmit(async (data: NewWordForm, e) => {
            createWordFetch(session, router, data)
            e?.target.reset()
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
          <Button>Submit</Button>
        </form>
      </Center>
    </>
  )
}
