/* eslint-disable @typescript-eslint/no-non-null-assertion */
'use client'
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react'
import { getCookie } from 'cookies-next'

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

type IReport = {
  question: QuestionProps
  choice: string
}

interface IQuestionContextData {
  questions: QuestionProps[]
  generateQuestions: ({ data }: QuestionFilterProps) => Promise<void>
  generateReport: (question: QuestionProps, choice: string) => Promise<void>
  showReport: () => (IReport | undefined)[]
}

interface IQuestionProviderProps {
  children: ReactNode
}

const QuestionContext = createContext<IQuestionContextData>(
  {} as IQuestionContextData,
)

const questionCookieKey = '@questao-certa-app:questions'
const reportCookieKey = '@questao-certa-app:report'
const apiUrl = process.env.NEXT_PUBLIC_API_URL || '' // Provide a default value

export function QuestionProvider({ children }: IQuestionProviderProps) {
  const [questions, setQuestions] = useState<QuestionProps[]>([])
  const [report, setReport] = useState<IReport[]>([])

  async function questionsInStorage() {
    const tokenCookie = getCookie(questionCookieKey)

    if (tokenCookie) {
      const token = JSON.parse(tokenCookie)?.token
      setQuestions(token || [])
    } else {
      setQuestions([])
    }
  }

  async function reportInStorage() {
    const reportCookie = getCookie(reportCookieKey)

    if (reportCookie) {
      const token = JSON.parse(reportCookie)?.token
      setReport(token || [])
    } else {
      setReport([])
    }
  }

  useEffect(() => {
    questionsInStorage()
    reportInStorage()
  }, [])

  function getUserTokenFromCookie(): string | undefined {
    const token = getCookie('@questao-certa-app:user')?.valueOf().toString()
    const tokenWithoutQuotes = token?.replace(/['"]+/g, '')

    return tokenWithoutQuotes
  }

  async function generateQuestions({
    data,
  }: QuestionFilterProps): Promise<void> {
    try {
      const token = getUserTokenFromCookie()

      if (!token) {
        return
      }

      const response = await fetch(`${apiUrl}/question/filter`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          organization: data.organization || null,
          year: data.year || null,
          content: data.content || null,
          topic: data.topic || null,
          quantity: data.quantity >= 1 ? data.quantity : null,
        }),
        cache: 'no-cache',
      })

      if (response.ok) {
        const data = await response.json()
        setQuestions(data)

        const setTokenInCookie = { token: data }

        document.cookie = `${questionCookieKey}=${JSON.stringify(
          setTokenInCookie,
        )}; path=/; max-age=86400`

        console.log('Success:', response.status)
      } else {
        console.log('Error:', response.status)
      }
    } catch (error) {
      console.error('Error:', error)
    }
  }

  async function generateReport(question: QuestionProps, choice: string) {
    try {
      if (question.answer !== choice) {
        setReport([...report, { question, choice }])
        document.cookie = `${reportCookieKey}=${JSON.stringify(
          report,
        )}; path=/; max-age=86400`
      } else {
        setReport([...report, { question, choice }])
        document.cookie = `${reportCookieKey}=${JSON.stringify(
          report,
        )}; path=/; max-age=86400`
      }
    } catch (error) {
      console.error('Error:', error)
    }
  }

  function showReport(): (IReport | undefined)[] {
    return report
  }

  return (
    <QuestionContext.Provider
      value={{
        questions,
        generateQuestions,
        generateReport,
        showReport,
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
