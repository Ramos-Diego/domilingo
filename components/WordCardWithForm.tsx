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
import {
  approveWordFetch,
  deleteWordFetch,
  updateWordFetch,
} from '../utils/client'

export default function WordCardWithForm({ word }: { word: Word }) {
  const { register, handleSubmit, errors } = useForm()
  const { dispatch } = useContext(GlobalContext)
  const [session] = useSession()
  const router = useRouter()

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
        onSubmit={handleSubmit(async (data: EditWordForm) => {
          updateWordFetch(session, router, word, data)
        })}
      >
        <Hide invert _id={word._id}>
          <div className="text-lg font-extrabold overflow-x-auto">
            {router.asPath !== `/d/${word.slug}` ? (
              <Link href={`/d/${word.slug}`}>
                <a className="hover:text-blue-400">{word.word}</a>
              </Link>
            ) : (
              <>{word.word}</>
            )}
          </div>
        </Hide>
        <Hide _id={word._id}>
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
              <Hide invert _id={word._id}>
                <div className="ml-2 overflow-x-auto">{item.definition}</div>
              </Hide>
              <Hide _id={word._id}>
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
                    <Hide invert _id={word._id}>
                      <div className="italic overflow-x-auto">"{example}"</div>
                    </Hide>
                    <Hide _id={word._id}>
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
        <Hide _id={word._id}>
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
            deleteWordFetch(word._id)
          }}
        >
          Delete
        </Button>
        {!word.approved && (
          <Button
            onClick={() => {
              approveWordFetch(word._id)
            }}
          >
            Approve
          </Button>
        )}
      </div>
    </>
  )
}
