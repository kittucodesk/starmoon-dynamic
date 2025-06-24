import type { Metadata } from 'next'
import { Inter, Sora } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"
import { ReduxProvider } from "@/components/providers/redux-provider"
import './globals.css'

const inter = Inter({ subsets: ["latin"], variable: '--font-inter' })
const sora = Sora({
  subsets: ["latin"],
  variable: '--font-sora',
})

export const metadata: Metadata = {
  title: 'Sign In - ServiceHub',
  description: 'Sign in to your ServiceHub account',
}

export default function LoginLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body className={`${inter.variable} ${sora.variable} font-sans antialiased`}>
        <ReduxProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
            <Toaster />
          </ThemeProvider>
        </ReduxProvider>
      </body>
    </html>
  )
} 