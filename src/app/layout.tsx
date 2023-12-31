import type { Metadata } from 'next'
import ToasterContext from '@/context/ToasterContext'
import { Inter } from 'next/font/google'
import './globals.css'
import { AuthContext } from '@/context/AuthContext'
import ActiveStatus from '@/components/ActiveStatus'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Messenger Clone',
  description: 'Messenger Clone for learning Next.js 13 app folder',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthContext>
          <ToasterContext />
          <ActiveStatus />
          {children}
        </AuthContext>
      </body>
    </html>
  )
}
