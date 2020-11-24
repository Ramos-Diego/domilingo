import Head from 'next/head'
import Button from '../components/Button'
import Form from '../components/Form'
import Input from '../components/Input'
import Alert from '../components/Alert'
import Center from '../components/Center'
import { useForm } from 'react-hook-form'
import NavBar from '../components/NavBar'
import { useSession } from 'next-auth/client'
import { useRouter } from 'next/router'

export default function New() {
  const { register, handleSubmit, errors } = useForm()
  const [session] = useSession()
  const router = useRouter()

  const onSubmit = async (data) => {
    if (session) {
      const response = await fetch('/api/db', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
      const resData = await response.json()
      console.log(resData.result.slug) // parses JSON response into native JavaScript objects
      router.push({
        pathname: '/d/[slug]',
        query: { slug: resData.result.slug },
      })
      return resData
    } else {
      alert('you must be logged in to submit a word.')
    }
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
        <Form onSubmit={handleSubmit(onSubmit)}>
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
            register={register}
            placeholder="Enter sentence"
          />
          <Button>Submit</Button>
        </Form>
      </Center>
    </>
  )
}
