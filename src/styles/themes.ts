/*
 * CartRush — Design System Themes
 *
 * DESIGN PLAN:
 * ============
 * Three distinct personalities for three different shopping moods:
 *
 * SHEIN (default):
 *   Palette: Hot pink #FF2060 + Flash yellow #FFDE07 + Energy white
 *   Type: Bebas Neue (display/prices) + DM Sans (body) — condensed + airy pairing
 *   Grid: 2-col mobile, 4-col desktop — maximum density
 *   Radius: 6px — compact, no-nonsense
 *   Vibe: "everything on sale, all the time" — the dopamine machine
 *
 * GLOVO:
 *   Palette: Near-black #1A1A1A + Glovo orange #FF6B00 + White text
 *   Type: Outfit — single family, rounded, fast
 *   Grid: 2-col cards, more breathing room
 *   Radius: 16px — soft and friendly
 *   Vibe: late-night delivery, dark and warm
 *
 * MINIMAL:
 *   Palette: Pure white + Charcoal #1C1C1C + Gold #C9A84C
 *   Type: Playfair Display (display) + Jost (body) — editorial luxury
 *   Grid: 1 product per row, full-width editorial
 *   Radius: 2px — architecture, not decoration
 *   Vibe: Apple Store meets Vogue — the premium calm
 *
 * SIGNATURE WOW MOMENT:
 *   Checkout celebration: full-screen confetti burst (200 particles, 3 colors per theme),
 *   haptic feedback pulse, ka-ching audio, order number types out letter-by-letter at
 *   80ms per character, then explodes into a scale animation.
 */

import type { Theme, ThemeName } from '@/types/theme'

export const themes: Record<ThemeName, Theme> = {
  shein: {
    name: 'shein',
    label: 'Shein',
    description: 'Denso, colorato, pieno di offerte',
    emoji: '🛍️',
    colors: {
      primary: '#FF2060',
      primaryHover: '#E0004A',
      accent: '#FFDE07',
      background: '#FFFFFF',
      backgroundSecondary: '#F3F3F5',
      card: '#FFFFFF',
      text: '#15161A',
      textMuted: '#767676',
      border: '#E6E8EC',
      success: '#00C853',
      error: '#FF2060',
      flash: '#FF6B00',
    },
    fonts: {
      display: '"Bebas Neue", cursive',
      body: '"DM Sans", sans-serif',
    },
    radius: {
      sm: '4px',
      md: '6px',
      lg: '8px',
      xl: '12px',
    },
    grid: {
      mobile: 2,
      desktop: 4,
    },
  },

  glovo: {
    name: 'glovo',
    label: 'Glovo',
    description: 'Dark mode, delivery vibe',
    emoji: '🌙',
    colors: {
      primary: '#FF6B00',
      primaryHover: '#E55A00',
      accent: '#FFB800',
      background: '#1A1A1A',
      backgroundSecondary: '#111111',
      card: '#2A2A2A',
      text: '#FFFFFF',
      textMuted: '#888888',
      border: '#333333',
      success: '#00C853',
      error: '#FF4444',
      flash: '#FF6B00',
    },
    fonts: {
      display: '"Outfit", sans-serif',
      body: '"Outfit", sans-serif',
    },
    radius: {
      sm: '8px',
      md: '16px',
      lg: '20px',
      xl: '24px',
    },
    grid: {
      mobile: 2,
      desktop: 3,
    },
  },

  minimal: {
    name: 'minimal',
    label: 'Minimal',
    description: 'Premium, calmo, editoriale',
    emoji: '✨',
    colors: {
      primary: '#1C1C1C',
      primaryHover: '#333333',
      accent: '#C9A84C',
      background: '#FFFFFF',
      backgroundSecondary: '#FAFAFA',
      card: '#FFFFFF',
      text: '#1C1C1C',
      textMuted: '#767676',
      border: '#E8E8E8',
      success: '#2E7D32',
      error: '#C62828',
      flash: '#C9A84C',
    },
    fonts: {
      display: '"Playfair Display", serif',
      body: '"Jost", sans-serif',
    },
    radius: {
      sm: '1px',
      md: '2px',
      lg: '4px',
      xl: '6px',
    },
    grid: {
      mobile: 1,
      desktop: 2,
    },
  },
}

export const defaultTheme: ThemeName = 'shein'

export function applyTheme(theme: Theme): void {
  const root = document.documentElement
  root.style.setProperty('--color-primary', theme.colors.primary)
  root.style.setProperty('--color-primary-hover', theme.colors.primaryHover)
  root.style.setProperty('--color-accent', theme.colors.accent)
  root.style.setProperty('--color-background', theme.colors.background)
  root.style.setProperty('--color-background-secondary', theme.colors.backgroundSecondary)
  root.style.setProperty('--color-card', theme.colors.card)
  root.style.setProperty('--color-text', theme.colors.text)
  root.style.setProperty('--color-text-muted', theme.colors.textMuted)
  root.style.setProperty('--color-border', theme.colors.border)
  root.style.setProperty('--color-success', theme.colors.success)
  root.style.setProperty('--color-error', theme.colors.error)
  root.style.setProperty('--color-flash', theme.colors.flash)
  root.style.setProperty('--font-display', theme.fonts.display)
  root.style.setProperty('--font-body', theme.fonts.body)
  root.style.setProperty('--radius-sm', theme.radius.sm)
  root.style.setProperty('--radius-md', theme.radius.md)
  root.style.setProperty('--radius-lg', theme.radius.lg)
  root.style.setProperty('--radius-xl', theme.radius.xl)
  root.style.setProperty('--grid-mobile', String(theme.grid.mobile))
  root.style.setProperty('--grid-desktop', String(theme.grid.desktop))
  root.setAttribute('data-theme', theme.name)
}
