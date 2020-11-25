import { connectToDatabase } from './mongodb'
import slugify from 'slugify'

export const getApprovedWords = async () => {
  const { db } = await connectToDatabase()

  const result = await db
    .collection('words')
    .find({ approved: true })
    // Collation allows for case insentive sorting
    .collation({ locale: 'en' })
    .sort({ word: 1 })
    .toArray()

  return JSON.stringify(result)
}

export const getUnapprovedWords = async () => {
  const { db } = await connectToDatabase()

  const result = await db
    .collection('words')
    .find({ approved: false })
    // Collation allows for case insentive sorting
    .collation({ locale: 'en' })
    .sort({ word: 1 })
    .toArray()

  return JSON.stringify(result)
}

// Todo: remove any type
export const approveOneWord = async (word: string) => {
  const { db } = await connectToDatabase()

  // Todo: make array selections dynamic
  const updateObject = {
    approved: true,
  }

  const result = await db
    .collection('words')
    .updateOne({ word }, { $set: updateObject })

  return result
}

export const getOneWord = async (_id: string) => {
  const { db } = await connectToDatabase()

  const result = await db.collection('words').findOne({ _id })

  return result
}

export const getAllSlugs = async () => {
  const { db } = await connectToDatabase()

  const result = await db
    .collection('words')
    .aggregate([{ $project: { _id: 0, slug: 1 } }])
    .toArray()

  return JSON.stringify(result)
}

export const getWordData = async (slug: string | string[] | undefined) => {
  const { db } = await connectToDatabase()

  const result = await db.collection('words').findOne({ slug })

  return JSON.stringify(result)
}

export const getUserWords = async (uid: string | string[] | undefined) => {
  const { db } = await connectToDatabase()

  const result = await db.collection('words').find({ uid }).toArray()

  return JSON.stringify(result)
}

export const getUserIds = async () => {
  const { db } = await connectToDatabase()

  const result = await db
    .collection('users')
    .aggregate([{ $project: { _id: 0, uid: '$dominilingo.uid' } }])
    .toArray()

  return JSON.stringify(result)
}

// Todo: remove any type
export const createWord = async (obj: any, token: any) => {
  const { db } = await connectToDatabase()

  const wordSchema = {
    word: obj.word,
    slug: slugify(obj.word),
    approved: false,
    definitions: [{ definition: obj.definition, examples: [obj.example] }],
    uid: token.dominilingo.uid,
  }

  const result = await db.collection('words').insertOne(wordSchema)

  return result
}

// Todo: remove any type
export const updateWord = async (word: string, obj: any) => {
  const { db } = await connectToDatabase()

  // Todo: make array selections dynamic
  const updateObject = {
    word: obj.word,
    'definitions.0.definition': obj.definition,
    'definitions.0.examples.0': obj.example,
  }

  const result = await db
    .collection('words')
    .updateOne({ word }, { $set: updateObject })

  return result
}

export const deleteWord = async (word: string) => {
  const { db } = await connectToDatabase()

  const result = await db.collection('words').deleteOne({ word })

  return result
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
    } else {
      // Save the new user
      await db.collection('users').insertOne({
        ...profile,
        // This portion can be whatever you want. It is a way to
        // Persist information about the user in the database
        dominilingo: {
          // Convert all ids to string
          uid: `${profile.id}`,
          // Todo: add logic form admin users
          role: 'user',
        },
      })
    }
  }
}
