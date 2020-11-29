import { NextApiRequest, NextApiResponse } from 'next'
import jwt from 'next-auth/jwt'
import { connectToDatabase } from '../../utils/mongodb'
import slugify from 'slugify'
import { SessionUser } from '../../lib/data-types'

const secret = process.env.JWT_SECRET || ''

export default async function (req: NextApiRequest, res: NextApiResponse) {
  const token: SessionUser = await jwt.getToken({ req, secret })

  if (token) {
    // Signed in
    switch (req.method) {
      case 'POST': {
        const { db } = await connectToDatabase()

        // Insert new word
        const { insertedId } = await db.collection('words').insertOne({
          word: req.body.word,
          slug: slugify(req.body.word),
          approved: false,
          definitions: [
            { definition: req.body.definition, examples: [req.body.example] },
          ],
          createdBy: token.dominilingo?.id,
          created: Date.now(),
        })

        // Return what was saved in the database
        const result = await db.collection('words').findOne({ _id: insertedId })

        res.status(201)
        // Converts _id to string
        res.json(JSON.parse(JSON.stringify(result)))
        break
      }
      case 'PATCH': {
        // Case when admin approves one word
        const { db } = await connectToDatabase()
        if (req.body.approval) {
          await db.collection('words').updateOne(
            { slug: req.body.slug },
            {
              $set: {
                approved: true,
              },
            }
          )

          res.status(201)
          res.send(`${req.body.slug} was approved.`)
        } else {
          await db.collection('words').updateOne(
            { slug: req.body.slug },
            {
              $set: {
                word: req.body.word,
                slug: slugify(req.body.word),
                'definitions.0.definition': req.body.definition,
                'definitions.0.examples.0': req.body.example,
              },
            }
          )

          res.status(201)
          res.send(`${req.body.slug} was updated.`)
        }
        break
      }
      case 'DELETE': {
        const { db } = await connectToDatabase()

        await db.collection('words').deleteOne({ slug: req.body.slug })

        res.status(201)
        res.send(`${req.body.slug} was deleted.`)
        break
      }
      default: {
        res.status(400)
        res.send('Bad request.')
      }
    }
  } else {
    res.status(401)
    res.send(`You're not signed in.`)
  }
  res.end()
}
