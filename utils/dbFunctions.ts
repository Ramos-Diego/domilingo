import { connectToDatabase } from './mongodb'

export const test = async () => {
  const { db } = await connectToDatabase()

  const result = await db.collection('test').insertOne({
    word: 'client side',
    createdAt: new Date(),
  })

  // const isConnected = await db.isConnected() // Returns true or false
  console.log({ result })
}

export const getWords = async () => {
  const { db } = await connectToDatabase()

  const result = await db
    .collection('words')
    .find({})
    // Collation allows for case insentive sorting
    .collation({ locale: 'en' })
    .sort({ word: 1 })
    .toArray()

  return JSON.stringify(result)
}
