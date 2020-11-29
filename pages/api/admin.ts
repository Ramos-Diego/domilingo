import { NextApiRequest, NextApiResponse } from 'next'
import jwt from 'next-auth/jwt'
import { Word } from '../../lib/data-types'
import { connectToDatabase } from '../../utils/mongodb'

const secret = process.env.JWT_SECRET || ''

export default async function (req: NextApiRequest, res: NextApiResponse) {
  const token = await jwt.getToken({ req, secret })

  if (token) {
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
