import { NuxtAuthHandler } from '#auth'
import GithubProvider from 'next-auth/providers/github'
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from 'next-auth/providers/credentials'

import { users } from '@/server/models'

export default NuxtAuthHandler({
  secret: 'my-superb-secret',
  pages: {
    signIn: '/login',
  },
  providers: [
    // @ts-expect-error You need to use .default here for it to work during SSR. May be fixed via Vite at some point
    GithubProvider.default({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
    // @ts-expect-error You need to use .default here for it to work during SSR. May be fixed via Vite at some point
    GoogleProvider.default({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET
    }),
    // @ts-expect-error You need to use .default here for it to work during SSR. May be fixed via Vite at some point
    CredentialsProvider.default({
      name: 'Credentials',
      async authorize(credentials: any) {
        return credentials
      },
    }),
  ],
  callbacks: {
    async signIn({ user, credentials }) {
      // console.log("1")
      if (credentials) return true
      if (user) {
        try {
          const userDB = await users.findOne({
            email: user.email,
          });
          if (!userDB) await users.create({ name: user.name, email: user.email })
        } catch (_) {
          return false
        }
        return true
      }
      return false
    },
    async redirect({ url, baseUrl }) {
      if (url.startsWith(baseUrl)) return url
      else if (url.startsWith('/')) return new URL(url, baseUrl).toString()
      return baseUrl
    },
    async session({ session, token }) {
      // console.log("3")
      if (token) {
        // Adicionando o _id do cliente, visivel no middleware da api
        session._id = token.sub
      }
      return session
    },
    async jwt({ token, user }) {
      // console.log("2")
      if (user) {
        const userDB = await users.findOne({
          email: user.email,
        });
        token.sub = userDB?._id
      }
      return token
    },
  },
})