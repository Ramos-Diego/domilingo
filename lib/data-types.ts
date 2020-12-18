import React from 'react'
import { Session } from 'next-auth/client'

export interface Word {
  _id: string
  word: string
  definitions: [
    {
      definition: string
      examples: string[]
    }
  ]
  created: Date
  createdBy: string
  slug: string
  approved: boolean
  updated?: Date
  tags?: string[]
  synonyms?: string[]
  antonyms?: string[]
  idiom?: boolean
  phoneticNotation?: string
  year?: number
  coiner?: string
}

export interface DomilingoUser {
  id: string
  role: 'admin' | 'user'
}

export interface SessionUser {
  name?: string | null
  email?: string | null
  image?: string | null
  domilingo?: DomilingoUser
}

export type ExtendedUseSession = [
  (Session & { user: SessionUser }) | null | undefined,
  boolean
]

export type DbConnection = {
  isConnected: number
}

export type GlobalContextType = {
  state: State
  dispatch: React.Dispatch<Actions>
}

export type State = {
  selectedWord: Word | undefined
  editing: boolean
  deleting: boolean
  words: Word[]
  hasMore: boolean
  pageNumber: number
  searchQuery: string
}

export type Actions = {
  type:
    | 'SEARCH'
    | 'EDIT'
    | 'LOAD'
    | 'DELETE'
    | 'HAS_MORE'
    | 'PAGE_NUMBER'
    | 'CLEAR'
  deleteState?: boolean
  selectedWord?: Word
  payload?: any
}

export type EditWordForm = {
  word: string
  definition: string
  example: string
  tags: string
}

export type NewWordForm = {
  word: string
  definition: string
  example: string
  tags: string
}
