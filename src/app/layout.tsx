import { QuestionProvider } from '@/hooks/useQuestion'
import { UserProvider } from '@/hooks/useUser'
import '@/styles/globals.scss'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Questão Certa',
  description: 'Questão Certa',
  icons: '/assets/things.svg',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <UserProvider>
      <QuestionProvider>
        <html lang="en">
          <body className={inter.className}>{children}</body>
        </html>
      </QuestionProvider>
    </UserProvider>
  )
}
