import { Session } from 'next-auth/client'

type DbConnection = {
  isConnected: number
}

type GlobalContext = {
  state: State
  dispatch: React.Dispatch<Actions>
}

type State = {
  word: string
  edit: boolean
  deleted: string[]
}

type Actions = {
  type: 'EDIT' | 'USE_EFFECT' | 'DELETE'
  word: string
}

type NewUser = {
  name?: string | null
  email?: string | null
  image?: string | null
  dominilingo?: {
    uid: string | null
  }
}

type ExtendedSession = Session & { user: NewUser }
