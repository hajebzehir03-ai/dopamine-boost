import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { App } from './App'
import { themes, applyTheme } from '@/styles/themes'
import type { ThemeName } from '@/types/theme'
import '@/styles/globals.css'
import '@/styles/animations.css'

const savedTheme = (localStorage.getItem('cartrush-theme') ?? '{}')
let themeName: ThemeName = 'shein'
try {
  const parsed = JSON.parse(savedTheme) as { state?: { themeName?: ThemeName } }
  if (parsed.state?.themeName) themeName = parsed.state.themeName
} catch {
  // use default
}
applyTheme(themes[themeName])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
)
