# CartRush ⚡🛒

**La scarica di adrenalina dello shopping, senza spendere un centesimo.**

CartRush è un "[dopamine site](https://www.fastcompany.com/91560432/dopamine-sites-fake-online-shopping-apps-let-you-pretend-to-buy-things-foodnevercomes)" — un'app di shopping virtuale dove puoi sfogliare prodotti reali, riempire il carrello, completare un checkout fittizio con confetti e suoni, e tracciare il tuo pacco su una mappa. Zero soldi spesi. Mai.

La scienza: la dopamina si rilascia nell'*anticipazione* della ricompensa, non quando la ricevi. CartRush sfrutta esattamente questo.

> **Live PWA:** [cartrushed.app](#) — nessun account, nessun download

---

## Features

| Feature | Dettaglio |
|---------|-----------|
| 🛍️ Catalogo reale | 1.000+ prodotti da FakeStoreAPI + DummyJSON con fallback automatico |
| ⚡ Flash Sale | Banner con countdown reale, sconti fino a -70% (fittizi) |
| 💳 Checkout immersivo | Indirizzo, pagamento, conferma ordine + 120 particelle confetti + haptic + ka-ching |
| 📦 Tracking realistico | Mappa Leaflet + corriere animato + timeline a 6 step con timestamp simulati |
| 🎨 3 temi visuali | Shein / Glovo / Minimal — CSS custom properties, switch in <300ms |
| 🔥 Streak & Budget | Budget giornaliero €500 con reset mezzanotte, streak con badge emoji |
| 🔒 Privacy by design | Tutto in localStorage, nessun dato inviato a server, tasto "Cancella dati" |
| 📱 PWA installabile | Nessun app store, installa dal browser in 10 secondi |

---

## Stack Tecnico

```
React 18 + TypeScript + Vite 5
Tailwind CSS 3 (CSS custom properties per i temi)
Zustand (persist middleware — localStorage)
Framer Motion 10 (animazioni e micro-interazioni)
Leaflet + react-leaflet (mappa tracking)
React Router v6
Capacitor 6 (build iOS/Android — in sviluppo)
```

---

## Getting Started

```bash
git clone https://github.com/YOUR_USERNAME/dopamine-boost-1.git
cd dopamine-boost-1
npm install
npm run dev        # dev server su http://localhost:3000
npm run build      # build produzione → dist/
```

**Requisiti:** Node.js 18+

---

## Struttura Progetto

```
src/
├── components/
│   ├── common/        # Button, Badge, Modal, BottomNav, ThemeToggle, ErrorBoundary
│   ├── product/       # ProductCard, ProductGrid, ProductDetail, Gallery
│   ├── cart/          # CartItem, CartSummary, CartBadge
│   ├── checkout/      # CheckoutForm, PaymentSelector, OrderConfirmation
│   ├── tracking/      # TrackingTimeline, TrackingMap, TrackingCode
│   └── gamification/  # BudgetBar, StreakBadge, FlashSaleBanner, RelaxStats
├── pages/             # 8 schermate (Home, Prodotto, Carrello, Checkout, ...)
├── stores/            # cartStore, orderStore, themeStore, budgetStore, streakStore
├── services/          # ProductService, TrackingSimulator, NotificationService, AdService
├── hooks/             # useProducts, useCart, useTracking, useBudget, useStreak
├── styles/            # themes.ts (3 temi), globals.css, animations.css
├── types/             # product.ts, order.ts, tracking.ts, theme.ts
├── utils/             # generators.ts, timeSimulator.ts, formatters.ts
└── config/            # api.ts, ads.ts
```

---

## Temi Visuali

| Tema | Font | Colore | Feeling |
|------|------|--------|---------|
| **Shein** | Bebas Neue + DM Sans | #FF2060 | Grid densa, abbondanza, saldi |
| **Glovo** | Outfit | #FF6B00 | Dark mode, delivery, notturno |
| **Minimal** | Playfair Display + Jost | #C9A84C | Bianco puro, serif, premium |

Ogni tema è un oggetto TypeScript in `src/styles/themes.ts` che sovrascrive CSS custom properties su `:root`. I componenti non hanno colori hardcodati.

---

## Deploy su Netlify

Il progetto include `netlify.toml` con redirect SPA, cache headers e security headers.

```bash
# Collega il repo GitHub su netlify.com → New site from Git
# Build command: npm run build
# Publish directory: dist
```

---

## Sicurezza & GDPR

- **CSP** configurato in `index.html` (`script-src 'self'`, `connect-src` limitato alle API)
- **SRI** su Leaflet CDN (`integrity` + `crossorigin`)
- **localStorage only** — nessun dato trasmesso a server esterni
- **Right to erasure** — tasto "Cancella tutti i dati" in Settings
- **AdMob** (placeholder) — nota GDPR + TCF 2.0 reminder in `AdService.ts`

---

## Roadmap

- [ ] Capacitor build iOS + Android
- [ ] CartRush Pro (€2,99 one-time): rimuovi ads, tema Prime, budget custom, streak freeze
- [ ] Vero suono ka-ching (sostituire placeholder)
- [ ] Workbox service worker per offline support completo
- [ ] API prodotti reali (Amazon PA API o scraping Shein)

---

## Licenza

MIT — vedi [LICENSE](./LICENSE)

## Autore

**Zehir Hajeb** — [GitHub](https://github.com/hajebzehir03-ai) · built with [Claude Code](https://claude.ai/code)
