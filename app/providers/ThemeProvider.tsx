'use client'

import { ThemeProvider } from 'next-themes'
import { ReactNode} from 'react'

export function DarkModeProvider({children}: {children: ReactNode}) {

  return <ThemeProvider enableSystem={false}>{children}</ThemeProvider>
}