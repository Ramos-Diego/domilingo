import { NextApiRequest, NextApiResponse } from 'next'
import { connectToDatabase } from '../../utils/mongodb'

export default async function (req: NextApiRequest, res: NextApiResponse) {
  try {
    const { db } = await connectToDatabase()

    // const result = await db.collection('test').insertOne({
    //   word: 'jeff',
    //   createdAt: new Date(),
    // })

    const result = await db.collection('words').find({})
    .collation({locale: "en" })
    .sort({word: 1}).toArray()

    res.status(201)
    res.json({ success: true, result })
  } catch (e) {
    res.status(500)
    res.json({ success: false })
  }
}
