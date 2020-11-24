import { NextApiRequest, NextApiResponse } from 'next'
import {
  updateWord,
  deleteWord,
  createWord,
  getOneWord,
} from '../../utils/dbFunctions'
import jwt from 'next-auth/jwt'
import { CONNREFUSED } from 'dns'

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
    if (req.method === 'POST') {
      try {
        const confirmation = await createWord(req.body, token)

        const result = await getOneWord(confirmation.insertedId)
        console.log({ result })

        res.status(201)
        res.json({ success: true, result })
      } catch (e) {
        res.status(500)
        res.json({ success: false })
      }
    } else if (req.method === 'PATCH') {
      try {
        const result = await updateWord(req.body.word, req.body)

        res.status(201)
        res.json({ success: true, result })
      } catch (e) {
        res.status(500)
        res.json({ success: false })
      }
    } else if (req.method === 'DELETE') {
      try {
        const result = await deleteWord(req.body.word)

        res.status(201)
        res.json({ success: true, result })
      } catch (e) {
        res.status(500)
        res.json({ success: false })
      }
    } else {
      // Bad request
      res.status(400)
    }
  } else {
    // Not Signed in
    res.status(401)
  }
  res.end()
}
