import { useForm } from 'react-hook-form'
import Button from './Button'
import Input from './Input'
import Hide from './Hide'
import Link from 'next/link'
import { useContext } from 'react'
import { GlobalContext } from '../context/GlobalState'
import { useEffect } from 'react'
import { useSession } from 'next-auth/client'
import { useRouter } from 'next/router'
import { Word, EditWordForm } from '../lib/data-types'

export default function WordCardWithForm({ word }: { word: Word }) {
  const { register, handleSubmit, errors } = useForm()
  const { state, dispatch } = useContext(GlobalContext)
  const [session] = useSession()
  const router = useRouter()

  const onSubmit = async (data: EditWordForm) => {
    if (session) {
      const response = await fetch('/api/db', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
      const resData = await response.json()
      console.log(resData) // parses JSON response into native JavaScript objects
      router.reload()
      return resData
    } else {
      alert('you must be logged in to submit a word.')
    }
  }

  const deleteWordFetch = async (word: string) => {
    if (session) {
      const response = await fetch('/api/db', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ word }),
      })
      const resData = await response.json()
      console.log(resData) // parses JSON response into native JavaScript objects
      router.push('/')
      return resData
    } else {
      alert('you must be logged in to submit a word.')
    }
  }

  const approveOneWordFetch = async (word: string) => {
    if (session) {
      const response = await fetch('/api/db', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ word, approval: true }),
      })
      const resData = await response.json()
      console.log(resData) // parses JSON response into native JavaScript objects
      return resData
    } else {
      alert('you must be logged in to submit a word.')
    }
  }

  // This useEffect clears sets edit state to false
  // when switching the path changes
  // Todo: check that useEffect is being cleared correctly
  useEffect(() => {
    dispatch({
      type: 'USE_EFFECT',
    })
    // Return cleanup function
    // return null
  }, [])

  return (
    <>
      <form
        className="grid gap-2 rounded bg-gray-800 mb-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Hide invert word={word.word}>
          <div className="text-lg font-extrabold overflow-x-auto">
            <Link href={`/d/${word.slug}`}>
              <a className="hover:text-blue-400">{word.word}</a>
            </Link>
          </div>
        </Hide>
        <Hide word={word.word}>
          <Input
            type="text"
            label="Word"
            name="word"
            register={register({ required: true })}
            placeholder="Enter word"
            defaultValue={word.word}
          />
        </Hide>
        {word.definitions.map((item, idx) => {
          return (
            <div key={idx} className="mt-2">
              <Hide invert word={word.word}>
                <div className="ml-2 overflow-x-auto">{item.definition}</div>
              </Hide>
              <Hide word={word.word}>
                <Input
                  type="textarea"
                  label="Definition"
                  name="definition"
                  register={register}
                  placeholder="Enter definition"
                  defaultValue={item.definition}
                />
              </Hide>
              {item.examples.map((example, idx) => {
                return (
                  <div key={idx}>
                    <Hide invert word={word.word}>
                      <div className="italic overflow-x-auto">"{example}"</div>
                    </Hide>
                    <Hide word={word.word}>
                      <Input
                        type="text"
                        label="Example sentence"
                        name="example"
                        register={register}
                        placeholder="Enter sentence"
                        defaultValue={example}
                      />
                    </Hide>
                  </div>
                )
              })}
            </div>
          )
        })}
        <Hide word={word.word}>
          <Button>Submit</Button>
        </Hide>
      </form>
      <div className="grid grid-flow-col gap-2">
        <Button
          onClick={() =>
            dispatch({
              type: 'EDIT',
              _id: word._id,
            })
          }
        >
          Edit
        </Button>
        <Button
          onClick={() => {
            dispatch({
              type: 'DELETE',
              _id: word._id,
            })
            deleteWordFetch(word.word)
          }}
        >
          Delete
        </Button>
        {!word.approved && (
          <Button
            onClick={() => {
              approveOneWordFetch(word.word)
            }}
          >
            Approve
          </Button>
        )}
      </div>
    </>
  )
}
