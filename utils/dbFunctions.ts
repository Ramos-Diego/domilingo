import { connectToDatabase } from './mongodb'

// Todo: create better types for this function
export const GetUserOrSaveNewUser = async (profile: { id?: string }) => {
  // First check if there is a profile object
  if (profile) {
    const { db } = await connectToDatabase()
    const user = await db.collection('users').findOne({ id: `${profile.id}` })
    // Check if the user exists
    if (user) {
      // Return user in order to attach custom data to the JWT
      return user
    } else {
      // Save the new user
      await db.collection('users').insertOne({
        ...profile,
        // This portion can be whatever you want. It is a way to
        // Persist information about the user in the database
        dominilingo: {
          // Convert all ids to string
          role: 'user',
        },
      })
    }
  }
}
