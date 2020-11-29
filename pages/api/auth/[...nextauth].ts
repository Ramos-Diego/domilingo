import NextAuth, { InitOptions } from 'next-auth'
import { SessionUser } from '../../../lib/data-types'
import Providers from 'next-auth/providers'
import { SessionBase } from 'next-auth/_utils'
import { NextApiHandler } from 'next'
import { GetUserOrSaveNewUser } from '../../../utils/dbFunctions'

const options: InitOptions = {
  providers: [
    Providers.Google({
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
      authorizationUrl:
        'https://accounts.google.com/o/oauth2/v2/auth?prompt=consent&access_type=offline&response_type=code',
    }),
  ],
  jwt: {
    // A secret to use for key generation - set this explicitly
    secret: process.env.JWT_SECRET,
  },
  callbacks: {
    /**
     * @param  {object}  token     Decrypted JSON Web Token
     * @param  {object}  _user      User object      (only available on sign in)
     * @param  {object}  account   Provider account (only available on sign in)
     * @param  {object}  profile   Provider profile (only available on sign in)
     * @param  {boolean} isNewUser True if new user (only available on sign in)
     * @return {object}            JSON Web Token that will be saved
     */
    jwt: async (token, _user, account, profile, isNewUser) => {
      // This function only runs when the user logs in
      // becuase that's the only time the profile object exists
      const userFromDB = await GetUserOrSaveNewUser(profile)

      // Attach the profile information provided to the JWT token
      // https://github.com/nextauthjs/next-auth/issues/649

      // This will be true only when the user logs in.
      // Use this statement to add any information neede in the JWT
      // May use the profile.id to query database and get user's permissions
      if (!token.dominilingo) {
        token.dominilingo = {
          _id: userFromDB._id,
          role: userFromDB.dominilingo.role,
        }
      }

      return Promise.resolve(token)
    },
    /**
     * @param  {object} session      Session object
     * @param  {object} user         User object    (if using database sessions)
     *                               JSON Web Token (if not using database sessions)
     * @return {object}              Session that will be returned to the client
     */
    session: async (session: SessionBase, jwt: SessionUser) => {
      return Promise.resolve({
        ...session,
        user: {
          ...session.user,
          dominilingo: jwt.dominilingo,
        },
      })
    },
  },
}

const authHandler: NextApiHandler = (req, res) => NextAuth(req, res, options)
export default authHandler
