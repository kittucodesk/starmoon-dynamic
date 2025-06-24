import type { Metadata } from 'next'
import '../globals.css'
import { Inter, Sora } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"
import { ReduxProvider } from "@/components/providers/redux-provider"
import { SiteHeader } from '@/components/site-header-wrapper'
import SiteFooter from '@/components/site-footer'

const inter = Inter({ subsets: ["latin"], variable: '--font-inter' })
const sora = Sora({
  subsets: ["latin"],
  variable: '--font-sora',
})

export const metadata: Metadata = {
  title: 'v0 App',
  description: 'Created with v0',
  generator: 'v0.dev',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body className={`${inter.variable} ${sora.variable} font-sans antialiased`}>
        {/* Header */}
        <ReduxProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem={false}
            disableTransitionOnChange
          >
            <SiteHeader />
            {children}
            <SiteFooter />
            <Toaster />
          </ThemeProvider>
        </ReduxProvider>
      </body>
    </html>
  )
}
