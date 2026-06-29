export type ThemeName = 'shein' | 'glovo' | 'minimal'

export interface Theme {
  name: ThemeName
  label: string
  description: string
  emoji: string
  colors: {
    primary: string
    primaryHover: string
    accent: string
    background: string
    backgroundSecondary: string
    card: string
    text: string
    textMuted: string
    border: string
    success: string
    error: string
    flash: string
  }
  fonts: {
    display: string
    body: string
  }
  radius: {
    sm: string
    md: string
    lg: string
    xl: string
  }
  grid: {
    mobile: number
    desktop: number
  }
}
