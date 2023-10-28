import 'next-auth'

declare module 'next-auth' {
  interface User {
    id: number // <- here it is
  }
}
