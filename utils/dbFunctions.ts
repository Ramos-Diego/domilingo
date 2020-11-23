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

// Todo: create better types for this function
export const GetUserOrSaveNewUser = async (profile: {
  id?: string | number
}) => {
  // Todo: use the account to add the provider
  // from which the profile was generated: account.provider

  // First check if there is a profile object
  if (profile) {
    const { db } = await connectToDatabase()
    const user = await db.collection('users').findOne({ id: profile.id })
    // Check if the user exists
    if (user) {
      // Return user in order to attach custom data to the JWT/session
      return user
    } else { // Save the new user
      await db.collection('users').insertOne({
        ...profile,
        // This portion can be whatever you want. It is a way to
        // Persist information about the user in the database
        dominilingo: {
          uid: profile.id,
          // Todo: add logic form admin users
          role: 'user',
        },
      })
    }
  }
}
