import dbConnect from './dbConnect'
import Word from '../models/Word'

export const getWords = async () => {
  await dbConnect()

  const data = await Word.find({})

  return JSON.stringify(data)
}

export const postWord = async (word: string) => {
  await dbConnect()

  const newWord = new Word(word)

  const result = await newWord.save((err) => {
    if (err) return console.log('error')
    return 'success'
  })

  return JSON.stringify(result)
}
