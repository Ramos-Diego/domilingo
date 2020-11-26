import { connectToDatabase } from './mongodb'
import { ObjectId } from 'mongodb'
import slugify from 'slugify'
import { EditWordForm, NewWordForm, Word, SessionUser } from '../lib/data-types'

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

export const getUnapprovedWords2 = async () => {
  const { db } = await connectToDatabase()

  const result = await db
    .collection('words')
    .find({ approved: false })
    // Collation allows for case insentive sorting
    .collation({ locale: 'en' })
    .sort({ word: 1 })
    .toArray()

  return result
}

// Todo: remove any type
export const approveOneWord = async (_id: ObjectId) => {
  const { db } = await connectToDatabase()

  // Todo: make array selections dynamic
  const updateObject = {
    approved: true,
  }

  const result = await db
    .collection('words')
    .updateOne({ _id: new ObjectId(_id) }, { $set: updateObject })

  return result
}

export const getOneWord = async (_id: string) => {
  const { db } = await connectToDatabase()

  const result = await db
    .collection('words')
    .findOne({ _id: new ObjectId(_id) })

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

export const getUserWords = async (_id: string) => {
  const { db } = await connectToDatabase()

  const result = await db
    .collection('words')
    // Todo: check this
    .find({ createdBy: new ObjectId(_id) })
    .toArray()

  return JSON.stringify(result)
}

export const getUserIds = async () => {
  const { db } = await connectToDatabase()

  const result = await db
    .collection('users')
    .aggregate([{ $project: { _id: 1 } }])
    .toArray()

  return JSON.stringify(result)
}

// Todo: remove any type
export const createWord = async (obj: NewWordForm, token: SessionUser) => {
  const { db } = await connectToDatabase()

  //Todo: Create a type for this
  const wordSchema = {
    word: obj.word,
    slug: slugify(obj.word),
    approved: false,
    definitions: [{ definition: obj.definition, examples: [obj.example] }],
    createdBy: new ObjectId(token.dominilingo?._id),
    created: Date.now(),
  }

  const result = await db.collection('words').insertOne(wordSchema)

  return result
}

// Todo: remove any type
export const updateWord = async (_id: string, obj: EditWordForm) => {
  const { db } = await connectToDatabase()

  // Todo: make array selections dynamic
  const updateObject = {
    word: obj.word,
    slug: slugify(obj.word),
    'definitions.0.definition': obj.definition,
    'definitions.0.examples.0': obj.example,
  }

  const result = await db
    .collection('words')
    .updateOne({ _id: new ObjectId(_id) }, { $set: updateObject })

  return result
}

export const deleteWord = async (_id: string) => {
  const { db } = await connectToDatabase()

  const result = await db
    .collection('words')
    .deleteOne({ _id: new ObjectId(_id) })

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
      // Todo: Get user _ids for new users
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
