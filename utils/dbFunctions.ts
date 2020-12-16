import { GenericObject } from 'next-auth/_utils'
import { connectToDatabase } from './mongodb'

// Todo: create better types for this function
export const GetUserOrSaveNewUser = async (profile: GenericObject) => {
  const { db } = await connectToDatabase()
  const user = await db.collection('users').findOne({ id: `${profile.id}` })
  // Check if the user exists
  if (user) {
    // Return user in order to attach custom data to the JWT
    return user
  } else {
    const newUser = {
      ...profile,
      // This portion can be whatever you want. It is a way to persist
      // information about the new user in the database
      domilingo: {
        role: 'user',
      },
    }
    // Save the new user
    await db.collection('users').insertOne(newUser)
    return newUser
  }
}
