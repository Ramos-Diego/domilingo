import { useSession } from 'next-auth/client'
import Button from './Button'
import Input from '../components/Input'
import { useContext } from 'react'
import { useForm } from 'react-hook-form'
import { GlobalContext } from '../context/GlobalState'

export default function WordCard({
  item,
}: {
  // Todo: Remove any type
  item: any
}) {
  // Todo: Remove any type
  const [session]: any = useSession()
  const { state, dispatch } = useContext(GlobalContext)
  const { register, handleSubmit, errors } = useForm()

  const onSubmit = async (data) => {
    console.log(data)
  }
  return (
    <div className="grid grid-rows-hamburger rounded bg-gray-800 p-3">
      {/* ADMIN TOOLS */}
      {session && session.user.dominilingo.uid === item.uid ? (
        <>
          <div></div>
          <form
            className={state.edit ? 'grid gap-2 rounded bg-gray-800 mb-4' : ''}
            onSubmit={handleSubmit(onSubmit)}
          >
            <div
              className={`text-lg font-extrabold overflow-x-auto ${
                state.edit && 'hidden'
              }`}
            >
              {item.word}
            </div>
            <Input
              type="text"
              label="Word"
              name="word"
              register={register({ required: true })}
              placeholder="Enter word"
              defaultValue={item.word}
              hide={!state.edit}
            />
            {item.definitions.map((item, idx) => {
              return (
                <div key={idx} className="mt-2">
                  <div
                    className={`ml-2 overflow-x-auto ${state.edit && 'hidden'}`}
                  >
                    {item.definition}
                  </div>
                  <Input
                    type="textarea"
                    label="Definition"
                    name="definition"
                    register={register}
                    placeholder="Enter definition"
                    defaultValue={item.definition}
                    hide={!state.edit}
                  />
                  {item.examples.map((example, idx) => {
                    return (
                      <div key={idx}>
                        <div
                          className={`italic overflow-x-auto ${
                            state.edit && 'hidden'
                          }`}
                        >
                          "{example}"
                        </div>
                        <Input
                          type="text"
                          label="Example sentence"
                          name="example"
                          register={register}
                          placeholder="Enter sentence"
                          defaultValue={item.definition}
                          hide={!state.edit}
                        />
                      </div>
                    )
                  })}
                </div>
              )
            })}
            <div className={state.edit ? '' : 'hidden'}>
              <Button>Submit</Button>
            </div>
          </form>
          <Button onClick={() => dispatch({ type: 'EDIT' })}>Edit</Button>
        </>
      ) : (
        <>
          <div className="text-lg font-extrabold overflow-x-auto">
            {item.word}
          </div>
          <div>
            {item.definitions.map((item, idx) => {
              return (
                <div key={idx} className="mt-2">
                  <div className="ml-2 overflow-x-auto">{item.definition}</div>
                  {item.examples.map((example, idx) => {
                    return (
                      <div key={idx} className="italic overflow-x-auto">
                        "{example}"
                      </div>
                    )
                  })}
                </div>
              )
            })}
          </div>
        </>
      )}
      {/* <div className="grid gap-x-2 grid-flow-col">
      <div className="bg-purple-900 px-2 text-center rounded">Synonyms</div>
      <div className="bg-purple-900 px-2 text-center rounded">Antonyms</div>
    </div> */}
    </div>
  )
}
