/* eslint-disable @typescript-eslint/no-non-null-assertion */
'use client'
import { getCookie } from 'cookies-next'
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react'

type QuestionProps = {
  id: string
  organization: string
  model: string
  year: string
  content: string
  topic: string
  question: string
  answer: string
  options: string[]
}

type QuestionFilterProps = {
  data: {
    organization: string
    year: string
    content: string
    topic: string
    quantity: number
  }
}

interface IQuestionContextData {
  questions: QuestionProps[]
  generateQuestions: ({ data }: QuestionFilterProps) => Promise<void>
}

interface IQuestionProviderProps {
  children: ReactNode
}

const QuestionContext = createContext<IQuestionContextData>(
  {} as IQuestionContextData,
)

export function QuestionProvider({ children }: IQuestionProviderProps) {
  const [questions, setQuestions] = useState<QuestionProps[]>([])

  const userCookieKey = '@questao-certa-app:questions'

  async function questionsInStorage() {
    const getTokenFromCookie = getCookie(userCookieKey)?.valueOf().toString()

    if (getTokenFromCookie) {
      const token = JSON.parse(getTokenFromCookie!).token

      setQuestions(token)
    } else {
      setQuestions([])
    }
  }

  useEffect(() => {
    questionsInStorage()
  }, [])

  async function generateQuestions({
    data,
  }: QuestionFilterProps): Promise<void> {
    try {
      const response = await fetch(
        'http://localhost:8080/api/question/filter',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },

          body: JSON.stringify({
            organization: data.organization !== '' ? data.organization : null,
            year: data.year !== '' ? data.year : null,
            content: data.content !== '' ? data.content : null,
            topic: data.topic !== '' ? data.topic : null,
            quantity: data.quantity >= 1 ? data.quantity : null,
          }),
          cache: 'no-cache',
        },
      )

      if (response.ok) {
        const data = await response.json()
        setQuestions(data)

        const setTokenInCookie = {
          token: data,
        }

        document.cookie = `${userCookieKey}=${JSON.stringify(
          setTokenInCookie,
        )}; path=/; max-age=86400`

        console.log('Success:', response.status)
      } else {
        console.log('Error:', response.status)
      }
    } catch (error) {
      console.log('Error:', error)
    }
  }

  return (
    <QuestionContext.Provider
      value={{
        questions,
        generateQuestions,
      }}
    >
      {children}
    </QuestionContext.Provider>
  )
}

export function useQuestion(): IQuestionContextData {
  const context = useContext(QuestionContext)

  return context
}
