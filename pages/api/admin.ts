import { NextApiRequest, NextApiResponse } from 'next'
import { getUnapprovedWords } from '../../utils/dbFunctions'
import jwt from 'next-auth/jwt'
import { Word } from '../../lib/data-types'

const secret = process.env.JWT_SECRET || ''

export default async function (req: NextApiRequest, res: NextApiResponse) {
  const token = await jwt.getToken({ req, secret })

  if (token) {
    // Signed in
    switch (req.method) {
      case 'GET':
        const unnaproved: Word[] = await getUnapprovedWords()
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
