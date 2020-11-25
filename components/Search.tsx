import Input from './Input'
import { useForm } from 'react-hook-form'

export default function Search() {
  const { register, handleSubmit } = useForm()

  const test = ['abc', 'ert']

  // Todo: This search filter doesn't work.
  const search = async ({ search }: { search: string }) => {
    const result = test
      .filter((word) => word.includes(search))
      .map((filtered) => {
        filtered
      })
    console.log({ result })
  }

  return (
    <form onSubmit={handleSubmit(search)}>
      <Input
        type="text"
        name="search"
        register={register({ required: true })}
        placeholder="Search"
      />
    </form>
  )
}
