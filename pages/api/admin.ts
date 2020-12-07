import { NextApiRequest, NextApiResponse } from 'next'
import { connectToDatabase } from '../../utils/mongodb'
import { getSession } from 'next-auth/client'

export default async function (req: NextApiRequest, res: NextApiResponse) {
  const session = await getSession({ req })

  if (session) {
    // Signed in
    switch (req.method) {
      case 'GET':
        const { db } = await connectToDatabase()

        const unnaproved = await db
          .collection('words')
          .find({ approved: false }, { projection: { _id: 0 } })
          // Collation allows for case insentive sorting
          .collation({ locale: 'en' })
          .sort({ word: 1 })
          .toArray()

        res.status(201)
        res.json(unnaproved)
        break
      default:
        res.status(400)
        res.send('Bad request.')
    }
  } else {
    res.status(401)
    res.send(`You're not signed in.`)
  }
  res.end()
}
