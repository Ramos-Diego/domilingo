import { NextApiRequest, NextApiResponse } from 'next'
import { getOneWord } from '../../utils/dbFunctions'

export default async function (req: NextApiRequest, res: NextApiResponse) {
  try {
    const ids = await getOneWord('5fbd4370c4ef043f66582daf')

    res.status(201)
    res.json({ success: true, ids })
  } catch (e) {
    res.status(500)
    res.json({ success: false })
  }
}
