import { NextApiRequest, NextApiResponse } from 'next'
import { connectToDatabase } from '../../utils/mongodb'

export default async function (req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'GET': {
      try {
        const { db } = await connectToDatabase()
        if (req.query.q) {
          const { page } = req.query
          // Search bar
          const arr = await db
            .collection('words')
            .find(
              {
                approved: true,
                word: {
                  $regex: `^${req.query.q}`,
                  $options: 'i',
                },
              },
              { projection: { _id: 0 } }
            )
            .skip(+page > 0 ? (+page - 1) * 25 : 0)
            .limit(25)
            // Collation allows for case insentive sorting
            .collation({ locale: 'en' })
            .sort({ word: 1 })
            .toArray()

          res.status(200)
          res.json(arr)
        } else {
          const { page } = req.query
          // index page
          const arr = await db
            .collection('words')
            .find({ approved: true }, { projection: { _id: 0 } })
            // https://docs.mongodb.com/manual/reference/method/cursor.skip/#pagination-example
            .skip(+page > 0 ? (+page - 1) * 25 : 0)
            .limit(25)
            .toArray()

          // Shuffle words
          const words = arr.sort(() => Math.random() - 0.5)
          res.status(200)
          res.json(words)
        }
      } catch (e) {
        res.status(400)
      }
      break
    }
    default: {
      res.status(400)
    }
  }
  res.end()
}
