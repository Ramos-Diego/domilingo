import { NextApiHandler } from 'next'
import NextAuth, { InitOptions, User } from 'next-auth'
import Providers from 'next-auth/providers'
import { SessionBase } from 'next-auth/_utils'
import { DomilingoUser, SessionUser } from '../../../lib/data-types'
import { GetUserOrSaveNewUser } from '../../../utils/dbFunctions'

const options: InitOptions & { jwt: { signingKey?: string } } = {
  providers: [
    Providers.Google({
      clientId: process.env.NEXTAUTH_GOOGLE_ID || '',
      clientSecret: process.env.NEXTAUTH_GOOGLE_SECRET || '',
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  jwt: {
    secret: process.env.NEXTAUTH_JWT_SECRET,
    signingKey: process.env.NEXTAUTH_JWT_SIGNING_PRIVATE_KEY,
  },
  callbacks: {
    jwt: async (token, user, _account, profile, _isNewUser) => {
      if (user) {
        const userFromDB = await GetUserOrSaveNewUser(profile)

        token.domilingo = {
          id: userFromDB.id,
          role: userFromDB.domilingo.role,
        }
      }
      return Promise.resolve(token)
    },
    session: async (
      session: SessionBase & { user: SessionUser },
      user: User & { domilingo: DomilingoUser }
    ) => {
      session.user.domilingo = user.domilingo
      return Promise.resolve(session)
    },
  },
}

const Auth: NextApiHandler = (req, res) => NextAuth(req, res, options)

export default Auth
