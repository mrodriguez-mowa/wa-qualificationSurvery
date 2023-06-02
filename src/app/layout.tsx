"use client"
import { Provider } from 'react-redux'
import './globals.css'
import { Inter } from 'next/font/google'
import { store } from '@/redux/store'
import { Toaster } from 'react-hot-toast'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Tipificación Mowa',
  description: 'Web app to classify answers received by SMS',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <Provider store={store}>


        <body className={inter.className}>

          <Toaster />

          {children}</body>
      </Provider>
    </html>
  )
}
