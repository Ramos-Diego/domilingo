import { NextApiRequest, NextApiResponse } from 'next'
import { connectToDatabase } from '../../utils/mongodb'
import slugify from 'slugify'
import { object, string, size, pattern, assert } from 'superstruct'
import { getSession } from 'next-auth/client'
import { SessionUser } from '../../lib/data-types'
import { Session } from 'next-auth'

export default async function (req: NextApiRequest, res: NextApiResponse) {
  const session: (Session & { user: SessionUser }) | null = await getSession({
    req,
  })

  if (session) {
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
            // Coerce tags field because it's optional
            tags: string(),
          })
          // If the be req.body doesn't pass the superstruct test
          // It will throw an error, thus jumping to the catch section
          assert(req.body, wordForm)

          const { db } = await connectToDatabase()
          const slug = slugify(req.body.word.toLowerCase())
          // Insert new word
          await db.collection('words').insertOne({
            word: req.body.word,
            slug: slug,
            approved: session.user.domilingo?.role === 'admin' ? true : false,
            definitions: [
              {
                definition: req.body.definition,
                examples: [req.body.example],
              },
            ],
            createdBy: session.user.domilingo?.id,
            // Convert comma separated string into an array of strings
            tags: req.body.tags.split(/\s*(?:,|$)\s*/),
            created: Date.now(),
          })

          res.status(201)
          // Return the generated slug so user can be redirected
          res.json({ slug })
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
          if (session.user.domilingo?.role === 'admin' && req.body.approval) {
            await db.collection('words').updateOne(
              { slug: req.body.slug },
              {
                $set: {
                  approved: true,
                },
              }
            )
            // Word was approved
            res.status(200)
          } else {
            const newSlug = slugify(req.body.word.toLowerCase())
            await db.collection('words').updateOne(
              { slug: req.body.slug },
              {
                $set: {
                  word: req.body.word,
                  slug: newSlug,
                  'definitions.0.definition': req.body.definition,
                  'definitions.0.examples.0': req.body.example,
                  tags: req.body.tags.split(/\s*(?:,|$)\s*/),
                },
              }
            )
            // Word was edited
            res.status(200)
            // Return the generated slug so user can be redirected
            res.json({ slug: newSlug })
          }
        } catch (e) {
          res.status(400)
          console.log(e)
        }
        break
      }
      case 'DELETE': {
        try {
          const { db } = await connectToDatabase()
          if (session.user.domilingo?.role === 'admin') {
            await db.collection('words').deleteOne({ slug: req.body.slug })
            // Word was deleted
            res.status(200)
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
