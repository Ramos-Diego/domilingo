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
  searchResults: []
  loadedWords: Word[]
  shuffledWords: Word[]
  wordToEdit: Word | undefined
  searching: boolean
  editing: boolean
}

export type Actions = {
  type: 'SEARCH' | 'SEARCHING' | 'EDIT' | 'LOAD_AND_SHUFFLE'
  loadedWords?: Word[]
  filteredWords?: Word[]
  searching?: string
  wordToEdit?: Word
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
