import { NextApiRequest, NextApiResponse } from 'next'
import {
  updateWord,
  deleteWord,
  createWord,
  getOneWord,
  approveOneWord,
} from '../../utils/dbFunctions'
import jwt from 'next-auth/jwt'

const secret = process.env.JWT_SECRET || ''

export default async function (req: NextApiRequest, res: NextApiResponse) {
  // Todo: remove any type
  const token: any = await jwt.getToken({ req, secret })

  if (token) {
    // Signed in
    if (req.method === 'POST') {
      try {
        const confirmation = await createWord(req.body, token)

        const result = await getOneWord(confirmation.insertedId)

        res.status(201)
        res.json({ success: true, ...result })
      } catch (e) {
        res.status(500)
        res.json({ success: false })
      }
    } else if (req.method === 'PATCH') {
      // Case when admin approves one word
      if (req.body.approval) {
        try {
          const result = await approveOneWord(req.body._id)

          res.status(201)
          res.json({ success: true, result })
        } catch (e) {
          res.status(500)
          res.json({ success: false })
        }
      } else {
        try {
          const result = await updateWord(req.body._id, req.body)

          res.status(201)
          res.json({ success: true, result })
        } catch (e) {
          res.status(500)
          res.json({ success: false })
        }
      }
    } else if (req.method === 'DELETE') {
      try {
        const result = await deleteWord(req.body._id)

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
