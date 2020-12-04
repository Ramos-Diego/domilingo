import { NextApiRequest, NextApiResponse } from 'next'
import jwt from 'next-auth/jwt'
import { connectToDatabase } from '../../utils/mongodb'
import slugify from 'slugify'
import { SessionUser } from '../../lib/data-types'
import { object, string, size, is, pattern } from 'superstruct'

const secret = process.env.JWT_SECRET || ''

export default async function (req: NextApiRequest, res: NextApiResponse) {
  const token: SessionUser = await jwt.getToken({ req, secret })

  if (token) {
    // Proceed because user is signed in
    switch (req.method) {
      case 'POST': {
        try {
          // Check that the POST request is correct
          const wordForm = object({
            // Non empty strings
            word: pattern(string(), /.*\S.*/),
            definition: pattern(string(), /.*\S.*/),
            // Non empty strings between 1 and 270 characters
            example: size(pattern(string(), /.*\S.*/), 1, 270),
          })
          // If the be body passes the superstruct test
          if (is(req.body, wordForm)) {
            const { db } = await connectToDatabase()
            const slug = slugify(req.body.word)
            // Insert new word
            await db.collection('words').insertOne({
              word: req.body.word,
              slug: slug,
              approved: token.dominilingo?.role === 'admin' ? true : false,
              definitions: [
                {
                  definition: req.body.definition,
                  examples: [req.body.example],
                },
              ],
              createdBy: token.dominilingo?.id,
              created: Date.now(),
            })

            res.status(201)
            // Return the generated slug so user can be redirected
            res.json({ slug })
          }
        } catch (e) {
          res.status(400)
          // MongoDB will return an error if tried to insert a slug that already exists
          if (e.code === 11000) {
            res.json({ error: 'slug_already_exists' })
          }
        }
        break
      }
      case 'PATCH': {
        // Case when admin approves one word
        try {
          const { db } = await connectToDatabase()
          if (token.dominilingo?.role === 'admin' && req.body.approval) {
            await db.collection('words').updateOne(
              { slug: req.body.slug },
              {
                $set: {
                  approved: true,
                },
              }
            )
            // Word was approved
            res.status(201)
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
            // Word was edited
            res.status(201)
          }
        } catch (e) {
          res.status(400)
        }
        break
      }
      case 'DELETE': {
        try {
          const { db } = await connectToDatabase()
          if (token.dominilingo?.role === 'admin') {
            await db.collection('words').deleteOne({ slug: req.body.slug })
            // Word was deleted
            res.status(201)
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
  } else {
    res.status(401)
  }
  res.end()
}
