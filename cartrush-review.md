# CartRush — Code Review

Revisore: Senior Mobile App Engineer
Repository: `hajebzehir03-ai/dopamine-boost`
Deploy: `cartrush.netlify.app`
Data: 30 giugno 2026

---

## BUG CRITICO: Flickering immagini

Ho identificato **tre cause concorrenti** che producono il flicker delle immagini ogni ~500ms.

### Causa 1 — `useCart()` dentro ProductCard invalida `React.memo`

`ProductCard` e' wrappato con `memo`, ma al suo interno chiama `useCart()`, che fa:

```typescript
const { items, addItem, removeItem, ... } = useCartStore()
```

Questo sottoscrive il componente all'INTERO store Zustand. Ogni modifica al carrello (da qualsiasi componente) forza il re-render di TUTTE le ProductCard, rendendo `memo` completamente inutile. Quando la BottomNav legge `totalItems` dal cart store, anche un cambio nel badge del carrello ri-renderizza tutte le card.

**Fix**: ProductCard non deve sottoscrivere l'intero store. Servono selector atomici:

```typescript
// SBAGLIATO — sottoscrive tutto
const { items } = useCartStore()

// CORRETTO — sottoscrive solo items
const items = useCartStore(state => state.items)
```

E la funzione `isInCart` deve spostarsi fuori dal hook, come utility pura che riceve `items` come parametro.

### Causa 2 — CSS transition wildcard su ogni elemento del DOM

```css
[data-theme] * {
  transition: background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease;
}
```

Questa regola applica transizioni a OGNI nodo del DOM, incluse le `<img>`. Combinata con l'animazione `flash-blink` del FlashSaleBanner (che pulsa ogni 1.5s) e il countdown che aggiorna lo stato ogni secondo, il browser ricalcola layout e repaint continuamente. Le immagini, non avendo dimensioni esplicite, subiscono un layout shift ad ogni ciclo.

**Fix**: Rimuovere il selettore wildcard. Applicare le transizioni solo agli elementi che effettivamente cambiano tema (card, background, testi), non alle immagini.

### Causa 3 — Immagini senza dimensioni esplicite e caching assente

Le immagini di FakeStoreAPI (`fakestoreapi.com/img/...`) vengono servite con header di caching deboli. Il browser, senza `width`/`height` espliciti sull'`<img>`, ricalcola il layout ad ogni repaint. Quando il componente parent ri-renderizza, l'immagine perde lo stato "loaded" e appare il flash bianco.

**Fix**: Aggiungere `width` e `height` espliciti alle immagini, usare `decoding="async"`, e implementare un componente `<LazyImage>` con stato di loading interno che mostra un placeholder finche' l'immagine non e' caricata.

---

## ANALISI ARCHITETTURALE

### Cosa funziona bene

- **ProductService con cache in memoria e deduplicazione**: il pattern `pending` promise per evitare fetch concorrenti e' solido
- **Theme system con CSS custom properties**: architettura pulita, i temi sono oggetti tipizzati e i componenti non hanno colori hardcodati
- **Zustand con persist middleware**: gestione stato semplice e corretta per un'app localStorage-only
- **Struttura cartelle**: separazione chiara tra hooks, stores, services, components, types
- **Error boundary e fallback 404**: gestione errori presente
- **Stale response handling**: `requestIdRef` in useProducts per scartare risposte obsolete

### Problemi da risolvere

**PRIORITA' ALTA**

1. **Zustand selector pattern non rispettato in nessun componente**
   Ogni hook (`useCart`, `useBudget`, `useStreak`) destruttura l'intero store. Questo significa che OGNI componente che usa uno di questi hook ri-renderizza ad OGNI modifica dello store, anche se il dato che gli interessa non e' cambiato. In un'app con griglia di prodotti, questo e' un moltiplicatore di performance negativo.

2. **`useBudget()` chiama `checkAndReset()` durante il render**
   ```typescript
   export function useBudget() {
     const { remaining, spend, checkAndReset } = useBudgetStore()
     checkAndReset() // side-effect durante il render
   ```
   Questo viola le regole di React: i side-effect vanno in `useEffect`. In StrictMode, questo viene eseguito due volte. Se il giorno e' cambiato, chiama `set()` durante il render, causando un doppio aggiornamento dello stato.

3. **`injectFlashSales` usa `Math.random()` senza seed**
   Ogni volta che la cache viene ricostruita (es. dopo un refresh), prodotti diversi diventano flash sale. Un utente che vede un prodotto in sconto, fa refresh, e lo sconto e' sparito. Per un'app che vuole sentirsi "reale", questo rompe l'immersione. Serve un seed basato sulla data del giorno (stesso giorno = stessi prodotti in sconto).

4. **`CheckoutPage` naviga durante il render**
   ```typescript
   if (items.length === 0) {
     navigate('/carrello') // side-effect durante il render
     return null
   }
   ```
   Questo deve stare in un `useEffect`. Navigare durante il render causa un warning React e comportamento imprevedibile con StrictMode.

**PRIORITA' MEDIA**

5. **Nessuna gestione di errori sulle immagini prodotto**
   Se un'immagine FakeStoreAPI restituisce 404 o timeout, il componente mostra un'immagine rotta. Serve un fallback (`onError` sull'img) con un placeholder SVG.

6. **FlashSaleBanner countdown non persiste**
   Il timer parte sempre da `52:47` ad ogni mount. Se l'utente cambia pagina e torna, il timer riparte. Dovrebbe salvare il timestamp di inizio in sessionStorage e calcolare il tempo rimanente da quello.

7. **Nessun code splitting**
   Tutte le pagine vengono caricate nel bundle iniziale. TrackingPage importa Leaflet (~40kb) anche se l'utente non la visita mai. Servono `React.lazy` + `Suspense` per le pagine secondarie.

8. **Emoji nell'interfaccia utente**
   L'app usa emoji in posizioni strutturali (titoli, label, categorie, pulsanti). Questo:
   - Rende l'app visivamente "cheap" e poco professionale
   - Le emoji renderizzano diversamente su iOS, Android e web
   - Screen reader le leggono ad alta voce ("donna con vestito rosso" per l'emoji dei vestiti)
   
   Vanno sostituite con icone SVG consistenti (Lucide icons o Heroicons).

9. **Copy troppo "AI-generated"**
   Alcuni testi tradiscono l'origine automatica:
   - "Shopping senza conseguenze" — troppo didascalico
   - "Nessun addebito reale. CartRush e' solo per divertimento!" — nessun vero e-commerce scrive cosi'
   - "Hai fatto shopping extra!" — innaturale
   
   Per sembrare un'app reale, il copy deve essere invisibile. Un utente non dovrebbe percepire che sta usando un'app "finta".

**PRIORITA' BASSA**

10. **Mancano test**
    Zero test. Per un prodotto vendibile, servono almeno test unitari sui servizi (ProductService, TrackingSimulator) e test di integrazione sul flusso checkout.

11. **Nessun service worker / offline support**
    L'app e' una PWA ma non ha Workbox configurato. I prodotti caricati non vengono cachati offline.

12. **AdService e' un placeholder vuoto**
    AdMob non e' integrato. Va bene per ora, ma il README parla di "ads" come feature, il che e' fuorviante.

---

## PROMPT CLAUDE CODE — FIX COMPLETO

Copia e incolla questo in Claude Code nella directory del progetto:

```
Ho una review professionale del progetto CartRush con bug critici e miglioramenti. Esegui TUTTI i fix seguenti in ordine di priorita'. Non saltare nessun punto.

## FIX 1 — CRITICO: Eliminare il flickering immagini

### 1a. Zustand selector atomici — riscrivere useCart

Riscrivi `src/hooks/useCart.ts` usando selector individuali per ogni campo:

```typescript
import { useCallback } from 'react'
import { useCartStore } from '@/stores/cartStore'
import type { Product } from '@/types/product'

export function useCart() {
  const items = useCartStore(state => state.items)
  const addItem = useCartStore(state => state.addItem)
  const removeItem = useCartStore(state => state.removeItem)
  const updateQuantity = useCartStore(state => state.updateQuantity)
  const clearCart = useCartStore(state => state.clearCart)

  const totalItems = items.reduce((acc, i) => acc + i.quantity, 0)
  const totalPrice = items.reduce((acc, i) => acc + i.product.price * i.quantity, 0)

  const isInCart = useCallback(
    (productId: number) => items.some((i) => i.product.id === productId),
    [items]
  )

  const getQuantity = useCallback(
    (productId: number) => items.find((i) => i.product.id === productId)?.quantity ?? 0,
    [items]
  )

  return { items, add: addItem, remove: removeItem, updateQty: updateQuantity, clear: clearCart, totalItems, totalPrice, isInCart, getQuantity }
}
```

Rimuovi `totalItems()` e `totalPrice()` come funzioni dal `cartStore.ts` — calcolarli inline evita che lo store notifichi cambiamenti quando i valori non cambiano.

### 1b. ProductCard — rimuovere useCart, passare solo cio' che serve via props

Modifica `ProductCard` per NON chiamare `useCart()` internamente. Il componente padre (ProductGrid o HomePage) deve passare `isInCart` e `onAdd` come props:

```typescript
interface ProductCardProps {
  product: Product
  themeName: ThemeName
  inCart: boolean
  onAdd: (product: Product) => void
}

export const ProductCard = memo(function ProductCard({ product, themeName, inCart, onAdd }: ProductCardProps) {
  // Rimuovi useCart() da qui
  // Usa inCart e onAdd dalle props
})
```

E in ProductGrid:

```typescript
export function ProductGrid({ products, loading }: ProductGridProps) {
  const { themeName } = useThemeStore()
  const { add, isInCart } = useCart()

  return (
    <div className="product-grid">
      {products.map((p) => (
        <ProductCard
          key={p.id}
          product={p}
          themeName={themeName}
          inCart={isInCart(p.id)}
          onAdd={add}
        />
      ))}
    </div>
  )
}
```

### 1c. Rimuovere CSS transition wildcard

In `src/styles/globals.css`, ELIMINA questa regola:

```css
[data-theme] * {
  transition: background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease;
}
```

Sostituiscila con transizioni mirate SOLO sui contenitori principali:

```css
body,
.card,
.bg-card,
.bg-background,
.bg-secondary,
.bottom-nav {
  transition: background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease;
}
```

### 1d. Componente LazyImage con placeholder

Crea `src/components/common/LazyImage.tsx`:

```typescript
import { useState, memo } from 'react'

interface LazyImageProps {
  src: string
  alt: string
  className?: string
  fallback?: string
}

const FALLBACK_SVG = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200'%3E%3Crect fill='%23f0f0f0' width='200' height='200'/%3E%3Ctext x='100' y='105' text-anchor='middle' fill='%23ccc' font-size='14'%3EImmagine%3C/text%3E%3C/svg%3E"

export const LazyImage = memo(function LazyImage({ src, alt, className = '', fallback = FALLBACK_SVG }: LazyImageProps) {
  const [loaded, setLoaded] = useState(false)
  const [error, setError] = useState(false)

  return (
    <div className={`relative ${className}`}>
      {!loaded && !error && (
        <div className="absolute inset-0 skeleton" />
      )}
      <img
        src={error ? fallback : src}
        alt={alt}
        className={`w-full h-full object-contain transition-opacity duration-200 ${loaded ? 'opacity-100' : 'opacity-0'}`}
        loading="lazy"
        decoding="async"
        onLoad={() => setLoaded(true)}
        onError={() => setError(true)}
      />
    </div>
  )
})
```

Sostituisci TUTTE le `<img>` di prodotto in ProductCard e FlashSaleBanner con `<LazyImage>`.

## FIX 2 — Side-effect durante il render

### 2a. useBudget — spostare checkAndReset in useEffect

```typescript
import { useEffect } from 'react'
import { useBudgetStore, DAILY_BUDGET } from '@/stores/budgetStore'

export function useBudget() {
  const remaining = useBudgetStore(state => state.remaining)
  const spend = useBudgetStore(state => state.spend)
  const checkAndReset = useBudgetStore(state => state.checkAndReset)

  useEffect(() => { checkAndReset() }, [checkAndReset])

  const used = DAILY_BUDGET - remaining
  const percent = Math.min(100, (used / DAILY_BUDGET) * 100)
  return { remaining, used, percent, total: DAILY_BUDGET, spend }
}
```

### 2b. CheckoutPage — spostare navigate in useEffect

In `CheckoutPage.tsx`, sostituisci:
```typescript
if (items.length === 0) {
  navigate('/carrello')
  return null
}
```

Con:
```typescript
useEffect(() => {
  if (items.length === 0) navigate('/carrello')
}, [items.length, navigate])

if (items.length === 0) return null
```

## FIX 3 — Flash sales deterministiche

In `ProductService.ts`, sostituisci la funzione `injectFlashSales`:

```typescript
function seededRandom(seed: number) {
  const x = Math.sin(seed) * 10000
  return x - Math.floor(x)
}

function injectFlashSales(products: Product[]): Product[] {
  const daySeed = Math.floor(Date.now() / 86400000) // stesso seed per tutto il giorno
  const sorted = [...products].sort((a, b) => {
    const sa = seededRandom(a.id * 1000 + daySeed)
    const sb = seededRandom(b.id * 1000 + daySeed)
    return sa - sb
  })
  const candidateIds = new Set(sorted.slice(0, 5).map(p => p.id))
  const discounts = [30, 40, 50, 60, 70]
  let discIdx = 0

  return products.map((p) => {
    if (candidateIds.has(p.id)) {
      const disc = discounts[discIdx++]
      return { ...p, isFlashSale: true, discount: disc, price: discountedPrice(p.price, disc) }
    }
    return p
  })
}
```

## FIX 4 — Sostituire TUTTE le emoji con icone SVG

Installa lucide-react: `npm install lucide-react`

Sostituisci ogni emoji strutturale con l'icona Lucide corrispondente:
- 🏠 → `<Home size={20} />`
- 🔍 → `<Search size={20} />`
- 🛒 → `<ShoppingCart size={20} />`
- 📦 → `<Package size={20} />`
- 👤 → `<User size={20} />`
- 💰 → `<Wallet size={16} />`
- ⭐ → `<Star size={12} fill="currentColor" />`
- 💳 → `<CreditCard size={20} />`
- ⚡ → `<Zap size={16} fill="currentColor" />`
- 🔒 → `<Lock size={14} />`
- ❌ → `<AlertCircle size={20} />`
- 📋 → `<ClipboardList size={16} />`
- 🗺️ → `<Map size={16} />`
- ← (back button) → `<ArrowLeft size={20} />`
- ✓ (in cart) → `<Check size={14} />`
- + (add to cart) → `<Plus size={14} />`

Per i badge del tema nel ThemeToggle:
- Shein: `<Grid3x3 size={16} />`
- Glovo: `<Moon size={16} />`
- Minimal: `<Minus size={16} />`

Per il rating, crea un componente `<StarRating>` che renderizza stelle SVG piene/vuote, non ripetizioni di emoji.

La StreakBadge puo' mantenere il fuoco come singolo accento visivo, ma come icona: `<Flame size={16} className="text-orange-500" />`.

Tutti i label delle categorie nella HomePage ("Tutti", "Moda", "Uomo", "Donna", "Tech", "Gioielli") devono usare solo testo, senza emoji prefissate.

## FIX 5 — Copy piu' naturale

Sostituisci questi testi:
- "Shopping senza conseguenze" → "Il tuo spazio per lo shopping"
- "Nessun addebito reale. CartRush e' solo per divertimento!" → "Nessun costo, zero stress. Solo il piacere dello shopping."
- "Hai fatto shopping extra! 🛍️" → "Budget esaurito per oggi"
- "Impossibile caricare i prodotti. Riprova." → "Connessione interrotta. Tocca per riprovare."
- "Nessun prodotto trovato" (con emoji 🛍️ grande) → solo il testo, senza emoji, con un'icona Search barrata
- "Checkout 💳" → "Checkout"
- "🛍️ ACQUISTA ORA" → "Conferma acquisto"
- "Elaborazione in corso…" → "Un momento..."
- "📋 Riepilogo ordine" → "Riepilogo"
- "Pagina non trovata" (con emoji 🛒 grande) → un'illustrazione SVG minimale o solo un'icona PackageX di Lucide

Il tono deve essere quello di un'app reale: asciutto, diretto, senza spiegare il concept al suo interno.

## FIX 6 — Code splitting con React.lazy

In `App.tsx`, importa le pagine secondarie con lazy loading:

```typescript
import { lazy, Suspense } from 'react'
import { LoadingSpinner } from '@/components/common/LoadingSpinner'

const ProductPage = lazy(() => import('@/pages/ProductPage').then(m => ({ default: m.ProductPage })))
const CheckoutPage = lazy(() => import('@/pages/CheckoutPage').then(m => ({ default: m.CheckoutPage })))
const OrderConfirmationPage = lazy(() => import('@/pages/OrderConfirmationPage').then(m => ({ default: m.OrderConfirmationPage })))
const TrackingPage = lazy(() => import('@/pages/TrackingPage').then(m => ({ default: m.TrackingPage })))
const OrdersPage = lazy(() => import('@/pages/OrdersPage').then(m => ({ default: m.OrdersPage })))
const SettingsPage = lazy(() => import('@/pages/SettingsPage').then(m => ({ default: m.SettingsPage })))
const EsploraPage = lazy(() => import('@/pages/EsploraPage').then(m => ({ default: m.EsploraPage })))
```

Wrappa le Routes in `<Suspense fallback={<LoadingSpinner />}>`.

HomePage resta importata staticamente (e' il punto di ingresso principale).

## FIX 7 — README professionale

Riscrivi il README rimuovendo:
- Tutte le emoji dai titoli e dalle tabelle
- Il link "dopamine site" di Fast Company (non associare l'app a un articolo esterno)
- La riga "built with Claude Code" dal footer (non dichiarare il tool usato)
- Le emoji nella tabella features

Mantieni: struttura progetto, stack tecnico, getting started, roadmap. Tono: documentazione tecnica, non landing page.

## ORDINE DI ESECUZIONE

1. FIX 1a-1d (flickering) — questo e' il bug visibile all'utente, va fixato per primo
2. FIX 2a-2b (side-effect render)
3. FIX 3 (flash sales deterministiche)
4. FIX 4 (emoji → icone SVG)
5. FIX 5 (copy naturale)
6. FIX 6 (code splitting)
7. FIX 7 (README)

Dopo ogni fix, verifica che `npm run dev` funzioni senza errori e che l'app sia navigabile. Fai un commit per ogni fix con un messaggio descrittivo (es. "fix: resolve image flickering with atomic selectors and LazyImage").
```

---

*Fine review.*
