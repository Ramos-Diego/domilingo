import { NextApiRequest, NextApiResponse } from 'next'
import { getUserWords } from '../../utils/dbFunctions'

export default async function (req: NextApiRequest, res: NextApiResponse) {
  try {
    const ids = await getUserWords('57334399')

    res.status(201)
    res.json({ success: true, ids })
  } catch (e) {
    res.status(500)
    res.json({ success: false })
  }
}
