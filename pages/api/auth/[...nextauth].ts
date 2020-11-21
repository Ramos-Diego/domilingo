import NextAuth, { InitOptions, User } from 'next-auth'
import Providers from 'next-auth/providers'
import { SessionBase } from 'next-auth/_utils'
import { NextApiHandler } from 'next'

// The User data type must match any modifications
// in the JWT callback.
interface myUser extends User {
  uid: string
}

const options: InitOptions = {
  providers: [
    Providers.GitHub({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
  ],
  jwt: {
    // A secret to use for key generation - set this explicitly
    secret: process.env.JWT_SECRET,
  },
  callbacks: {
    /**
     * @param  {object}  token     Decrypted JSON Web Token
     * @param  {object}  user      User object      (only available on sign in)
     * @param  {object}  account   Provider account (only available on sign in)
     * @param  {object}  profile   Provider profile (only available on sign in)
     * @param  {boolean} isNewUser True if new user (only available on sign in)
     * @return {object}            JSON Web Token that will be saved
     */
    jwt: async (token, user, account, profile, isNewUser) => {
      // Attach the profile information provided to the JWT token
      // https://github.com/nextauthjs/next-auth/issues/649

      // This will be true only when the user logs in.
      // Use this statement to add any information neede in the JWT
      // May use the profile.id to query database and get user's permissions
      if (!token.uid) token.uid = profile.id

      return Promise.resolve(token)
    },
    /**
     * @param  {object} session      Session object
     * @param  {object} user         User object    (if using database sessions)
     *                               JSON Web Token (if not using database sessions)
     * @return {object}              Session that will be returned to the client
     */
    session: async (session: SessionBase, user: myUser) => {
      // The user gets its data from the token in the JWT callback
      return Promise.resolve({
        ...session,
        user: {
          ...session.user,
          uid: user.uid,
        },
      })
    },
  },
}

const authHandler: NextApiHandler = (req, res) => NextAuth(req, res, options)
export default authHandler
