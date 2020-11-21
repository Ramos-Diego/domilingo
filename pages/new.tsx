import Head from 'next/head'
import Button from '../components/Button'
import Form from '../components/Form'
import Input from '../components/Input'
import { postWord } from '../utils/dbFunctions'
import { useForm } from 'react-hook-form'

export default function New() {
  const { register, handleSubmit } = useForm()
  const onSubmit = (data) => {
    console.log(data)
    postWord(data)
  }

  return (
    <div className="container mx-auto grid place-content-center">
      <Head>
        <title>Add New Slang</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="mt-4">
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Input
            name="word"
            register={register}
            type="text"
            placeholder="Enter word"
          >
            Word
          </Input>
          <Button>Submit</Button>
        </Form>
      </div>
    </div>
  )
}
