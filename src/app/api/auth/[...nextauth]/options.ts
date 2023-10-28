import { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

export const options: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      credentials: {
        email: { label: 'email', type: 'text', placeholder: 'your best email' },
        password: { label: 'password', type: 'password' },
      },
      async authorize(credentials) {
        const user = {
          id: 1,
          name: 'Eduardo',
          email: 'dudu@gmail.com',
          password: '123456',
        }
        if (
          user &&
          user?.email === credentials?.email &&
          user?.password === credentials?.password
        ) {
          return user
        }

        return null
      },
    }),
  ],
}
