import { EditWordForm, Word, NewWordForm } from '../lib/data-types'
import { NextRouter } from 'next/router'
import { Session } from 'next-auth/client'
// import slugify from 'slugify'

export const createWordFetch = async (
  session: Session | null | undefined,
  router: NextRouter,
  data: NewWordForm
) => {
  if (session) {
    const response = await fetch('/api/db', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    // const slug = slugify(data.word)
    // if (response.ok) {
    //   // router.push(`/d/${slug}`)
    //   response.json().then((body) =>
    //     router.push({
    //       pathname: '/d/[slug]',
    //       query: { slug: body.slug },
    //     })
    //   )
    // }
    return response
  } else {
    alert('you must be logged in to submit a word.')
  }
}

export const updateWordFetch = async (
  session: Session | null | undefined,
  router: NextRouter,
  word: Word,
  data: EditWordForm
) => {
  if (session) {
    const response = await fetch('/api/db', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ...data, _id: word._id }),
    })
    // router.reload()
    return response
  } else {
    alert('you must be logged in to submit a word.')
  }
}

export const deleteWordFetch = async (_id: string) => {
  const response = await fetch('/api/db', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ _id }),
  })
  return response.ok
}

export const approveWordFetch = async (_id: string) => {
  const response = await fetch('/api/db', {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ _id, approval: true }),
  })
  return response.ok
}
