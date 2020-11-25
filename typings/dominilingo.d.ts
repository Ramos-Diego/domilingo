export type DbConnection = {
  isConnected: number
}

export type GlobalContextType = {
  state: State
  dispatch: React.Dispatch<Actions>
}

export type State = {
  word: string
  edit: boolean
  deleted: string[]
  dropdownMenu: boolean
}

export type Actions = {
  type: 'EDIT' | 'USE_EFFECT' | 'DELETE' | 'DROPDOWN'
  word?: string
}

export type NewUser = {
  name?: string | null
  email?: string | null
  image?: string | null
  dominilingo?: {
    uid: string | null
    role: 'user' | 'admin'
  }
}
