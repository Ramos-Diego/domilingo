import { NextApiRequest, NextApiResponse } from 'next'
import {
  updateWord,
  deleteWord,
  createWord,
  approveOneWord,
} from '../../utils/dbFunctions'
import jwt from 'next-auth/jwt'

const secret = process.env.JWT_SECRET || ''

export default async function (req: NextApiRequest, res: NextApiResponse) {
  const token = await jwt.getToken({ req, secret })

  if (token) {
    // Signed in
    switch (req.method) {
      case 'POST':
        const dbRes = await createWord(req.body, token)

        res.status(201)
        res.json({ insertedId: dbRes.insertedId })
        break
      case 'PATCH':
        // Case when admin approves one word
        if (req.body.approval) {
          await approveOneWord(req.body._id)

          res.status(201)
          res.send(`${req.body._id} was approved.`)
        } else {
          await updateWord(req.body._id, req.body)

          res.status(201)
          res.send(`${req.body._id} was updated.`)
        }
        break
      case 'DELETE':
        await deleteWord(req.body._id)

        res.status(201)
        res.send(`${req.body._id} was deleted.`)
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
