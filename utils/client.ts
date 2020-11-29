import { EditWordForm, Word, NewWordForm } from '../lib/data-types'

export const createWordFetch = (data: NewWordForm) => {
  return fetch('/api/db', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
}

export const updateWordFetch = (word: Word, data: EditWordForm) => {
  return fetch('/api/db', {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ ...data, _id: word._id }),
  })
}

export const deleteWordFetch = (slug: string) => {
  return fetch('/api/db', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ slug }),
  })
}

export const approveWordFetch = (slug: string) => {
  return fetch('/api/db', {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ slug, approval: true }),
  })
}
