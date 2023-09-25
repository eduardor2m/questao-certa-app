'use client'

import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react'

import { getCookie, setCookie, deleteCookie } from 'cookies-next'
import { useRouter } from 'next/navigation'

type IUser = {
  token: string
}

type IUserProps = {
  data: {
    name: string
    email: string
    password: string
  }
}

interface IUserContextData {
  user: IUser | null
  signup: ({ data }: IUserProps) => Promise<void>
  signin: (email: string, password: string) => Promise<void>
  logout: () => Promise<void>
}

interface IUserProviderProps {
  children: ReactNode
}

const UserContext = createContext<IUserContextData>({} as IUserContextData)

export function UserProvider({ children }: IUserProviderProps) {
  const route = useRouter()
  const [user, setUser] = useState<IUser | null>(null)
  const userCookieKey = '@questao-certa-app:user'
  const apiUrl = process.env.NEXT_PUBLIC_API_URL

  useEffect(() => {
    const getTokenFromCookie = getCookie(userCookieKey)?.valueOf().toString()

    if (getTokenFromCookie) {
      const token = JSON.parse(getTokenFromCookie).token
      setUser({ token })
    }
  }, [])

  async function signup({ data }: IUserProps): Promise<void> {
    try {
      const response = await fetch(`${apiUrl}/user`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          password: data.password,
        }),
        cache: 'no-cache',
      })

      if (response.ok) {
        const responseData = await response.json()
        console.log(responseData)
      } else {
        throw new Error(`Error: ${response.status}`)
      }
    } catch (error) {
      throw new Error(`Error: ${error}`)
    }
  }

  async function signin(email: string, password: string): Promise<void> {
    try {
      const { headers, ok, status } = await fetch(`${apiUrl}/user/signin`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
        cache: 'no-cache',
      })

      if (ok) {
        const token = headers.get('Authorization')
        if (token) {
          setCookie(userCookieKey, JSON.stringify(token))
          setUser({ token })
        }
      } else {
        throw new Error(`Error: ${status}`)
      }
    } catch (error) {
      throw new Error(`Error: ${error}`)
    }
  }

  async function logout() {
    try {
      setUser(null)
      deleteCookie(userCookieKey)
      route.push('/')
    } catch (error) {
      throw new Error(`Error: ${error}`)
    }
  }

  return (
    <UserContext.Provider
      value={{
        user,
        signup,
        signin,
        logout,
      }}
    >
      {children}
    </UserContext.Provider>
  )
}

export function useUser(): IUserContextData {
  const context = useContext(UserContext)
  return context
}
