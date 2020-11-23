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
}

type Actions = {
  type: 'EDIT'
}
