import { NextApiRequest, NextApiResponse } from 'next'
import { connectToDatabase } from '../../utils/mongodb'
import jwt from 'next-auth/jwt'

const secret = process.env.JWT_SECRET

// interface myToken extends Object {
//   dominilingo: {
//     uid: string | number,
//     role: string
//   }
// }

export default async function (req: NextApiRequest, res: NextApiResponse) {
  // Todo: remove any type
  const token: any = await jwt.getToken({ req, secret })

  if (token) {
    // Signed in
    try {
      const { db } = await connectToDatabase()

      const wordSchema = {
        word: req.body.word,
        definitions: [
          { definition: req.body.definition, examples: [req.body.example] },
        ],
        uid: token.dominilingo.uid
      }

      const result = await db.collection('words').insertOne(wordSchema)

      res.status(201)
      res.json({ success: true, result })
    } catch (e) {
      res.status(500)
      res.json({ success: false })
    }
  } else {
    // Not Signed in
    res.status(401)
  }
  res.end()
}
