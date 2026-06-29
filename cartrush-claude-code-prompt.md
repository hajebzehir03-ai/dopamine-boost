# CartRush — Claude Code Prompt

## Copia tutto il contenuto qui sotto e incollalo in Claude Code

---

Crea un'app chiamata **CartRush** — un'app di shopping virtuale (acquisti fittizi) pensata come scarica di dopamina/adrenalina controllata per rilassarsi. L'utente naviga, aggiunge al carrello e "acquista" prodotti reali, ma senza spendere un centesimo. Tutto è simulato: pagamento, conferma ordine, tracking con mappa.

## Stack Tecnico

- **PWA** con **React 18+ (Vite)** + **Capacitor 6** per build iOS/Android native
- **TypeScript** ovunque
- **Tailwind CSS 3** per lo styling
- **React Router v6** per la navigazione
- **Zustand** per lo state management globale
- **Workbox** per service worker e offline support
- State persistente con **localStorage** (ordini, streak, budget, preferenze)
- Struttura progetto pulita: `src/components/`, `src/pages/`, `src/stores/`, `src/hooks/`, `src/services/`, `src/styles/`, `src/types/`, `src/utils/`

## Funzionalità Core

### 1. Catalogo Prodotti (da fonti reali)

- Integra **API pubbliche** per popolare il catalogo con prodotti reali:
  - **Fake Store API** (`fakestoreapi.com`) come fallback immediato funzionante
  - **DummyJSON** (`dummyjson.com/products`) come seconda fonte
  - Predisponi un **service layer astratto** (`ProductService`) così in futuro posso aggiungere scraping Amazon/Shein senza toccare i componenti
- Categorie principali: **Moda e Abbigliamento**, **Food e Grocery**
- Ogni prodotto ha: immagine, titolo, prezzo (finto ma realistico in €), rating, descrizione, categoria
- Homepage con: barra di ricerca, filtri per categoria, ordinamento (prezzo, popolarità, novità)
- Pagina dettaglio prodotto con galleria immagini, taglie/varianti, "Aggiungi al carrello" con animazione soddisfacente

### 2. Carrello & Checkout Fittizio

- Carrello con lista prodotti, quantità modificabile, totale aggiornato in tempo reale
- Pagina checkout che SIMULA un vero checkout:
  - Indirizzo di spedizione (precompilato con dati finti o inseriti dall'utente per immersione)
  - Scelta metodo di spedizione fittizio (Standard 3-5gg, Express 1-2gg, Flash <24h)
  - Scelta metodo di pagamento fittizio (carta che finisce in •••• 4242, PayPal finto, Apple Pay finto)
  - Riepilogo ordine con subtotale, spedizione, totale
- Bottone **"ACQUISTA ORA"** con:
  - Animazione celebrativa (confetti/sparkle)
  - Vibrazione haptic (Capacitor Haptics API)
  - Suono di "ka-ching" soddisfacente
  - Schermata di conferma ordine con numero ordine generato (es. `CR-2026-XXXXX`)

### 3. Tracking Virtuale Realistico

- Ogni ordine genera un **codice di tracciamento fittizio** (formato tipo `CRTRK-XXXXXXXXXX`)
- **Timeline di tracking a step** che avanza automaticamente nel tempo:
  1. ✅ Ordine confermato (immediato)
  2. 📦 In preparazione (dopo 2-4 ore)
  3. 🚚 Spedito (dopo 8-12 ore)
  4. ✈️ In transito (dopo 24 ore)
  5. 🏘️ In consegna (dopo 48 ore)
  6. 🎉 Consegnato (dopo 48-72 ore)
- Ogni step ha data/ora simulata e località fittizia ("Centro smistamento Milano", "Hub logistico Bologna")
- **Mappa finta con pacco in movimento**: usa **Leaflet.js** (OpenStreetMap, gratis) con un marker animato che si sposta lungo un percorso casuale tra città italiane
- **Notifiche push simulate**: usa Capacitor Local Notifications per inviare notifiche tipo "Il tuo ordine CR-2026-12345 è stato spedito! 🚚" ai tempi corretti del tracking
- Pagina "I miei ordini" con lista di tutti gli ordini passati e stato attuale

### 4. Gamification & Relax Mode

L'app deve essere **rilassante e appagante**, non stressante. La gamification è soft:

- **Budget virtuale giornaliero**: ogni giorno l'utente riceve un budget fittizio (es. €500) da "spendere". Counter visibile in alto che scala. Si resetta a mezzanotte. Nessuna penalità se lo sfori — solo un messaggio tipo "Oggi hai fatto shopping extra! 🛍️"
- **Streak di acquisti**: conta i giorni consecutivi in cui l'utente ha fatto almeno un acquisto fittizio. Badge visivo (🔥 x3, 🔥 x7, 🔥 x30). Tono positivo, mai punitivo
- **Flash sale simulate**: banner in homepage con timer countdown (es. "Flash Sale: -70% scade tra 00:14:32"). Prodotti a prezzo scontato fittizio. Il timer è reale e crea urgenza giocosa
- **Sezione "Il tuo relax"**: statistiche carine tipo "Hai risparmiato €2.340 questa settimana (nella vita reale 😉)", "Ordini fittizi completati: 47", "Il tuo pacco più veloce: 18 ore"

### 5. Sistema di Stili Visuali Switchable

L'app deve supportare **stili di visualizzazione intercambiabili** con un toggle accessibile dalla navbar/settings:

**Stile "Shein" (default)**:
- Grid densa di prodotti (2 colonne mobile, 4 desktop)
- Card piccole con immagine grande, prezzo in rosso/bold, rating stelline
- Banner colorati, flash sale prominenti
- Palette: rosa/rosso/bianco, font compatto
- Feeling: abbondanza, offerte ovunque

**Stile "Glovo"**:
- Card grandi arrotondate, meno prodotti per schermata
- Dark mode con accenti arancione (#FF6B00)
- Layout più spazioso e pulito
- Categorie con icone grandi in orizzontale
- Feeling: veloce, notturno, delivery-vibe

**Stile "Minimal"**:
- Sfondo bianco puro, tipografia grande serif
- Un prodotto per riga, immagini full-width
- Nessun banner, nessun colore forte
- Palette: bianco/nero/grigio chiaro
- Feeling: premium, calmo, Apple Store

Implementazione:
- Usa **CSS custom properties** (variabili CSS) per colori, spacing, border-radius, font
- Ogni tema è un oggetto JS in `src/styles/themes.ts` che sovrascrive le variabili
- I componenti leggono le variabili, non hanno colori hardcodati
- Il tema corrente è salvato in localStorage e nello store Zustand
- Transizione smooth al cambio tema (CSS transitions)
- Il **colore brand cambia dinamicamente** con il tema selezionato

### 6. Monetizzazione — AdMob

- Integra **@capacitor-community/admob** per ads
- **Banner ad** fisso in basso nella homepage (non invasivo)
- **Interstitial ad** dopo ogni 3° acquisto fittizio completato
- **Rewarded ad** opzionale: "Guarda un video per sbloccare +€200 di budget extra oggi"
- Usa **test ad unit IDs** di Google per development
- Predisponi un file `src/config/ads.ts` con tutti gli ad unit IDs centralizzati (facili da sostituire con quelli di produzione)

## Struttura Progetto Attesa

```
dopamine-boost-1/
├── src/
│   ├── components/
│   │   ├── common/          # Button, Card, Badge, Modal, SearchBar, ThemeToggle
│   │   ├── product/         # ProductCard, ProductGrid, ProductDetail, Gallery
│   │   ├── cart/             # CartItem, CartSummary, CartBadge
│   │   ├── checkout/         # CheckoutForm, PaymentSelector, OrderConfirmation
│   │   ├── tracking/         # TrackingTimeline, TrackingMap, TrackingCode
│   │   ├── gamification/     # BudgetBar, StreakBadge, FlashSaleBanner, RelaxStats
│   │   └── ads/              # BannerAd, InterstitialManager, RewardedAdButton
│   ├── pages/
│   │   ├── HomePage.tsx
│   │   ├── ProductPage.tsx
│   │   ├── CartPage.tsx
│   │   ├── CheckoutPage.tsx
│   │   ├── OrderConfirmationPage.tsx
│   │   ├── OrdersPage.tsx
│   │   ├── TrackingPage.tsx
│   │   ├── ProfilePage.tsx
│   │   └── SettingsPage.tsx
│   ├── stores/
│   │   ├── cartStore.ts
│   │   ├── orderStore.ts
│   │   ├── themeStore.ts
│   │   ├── budgetStore.ts
│   │   └── streakStore.ts
│   ├── services/
│   │   ├── ProductService.ts      # Abstraction layer per API prodotti
│   │   ├── TrackingSimulator.ts   # Logica avanzamento tracking temporizzato
│   │   ├── NotificationService.ts # Push notifications locali
│   │   └── AdService.ts           # Wrapper AdMob
│   ├── hooks/
│   │   ├── useProducts.ts
│   │   ├── useCart.ts
│   │   ├── useTracking.ts
│   │   ├── useBudget.ts
│   │   └── useStreak.ts
│   ├── styles/
│   │   ├── themes.ts              # Definizioni temi (Shein, Glovo, Minimal)
│   │   ├── globals.css            # CSS variables + Tailwind base
│   │   └── animations.css         # Confetti, transitions, haptic feedback CSS
│   ├── types/
│   │   ├── product.ts
│   │   ├── order.ts
│   │   ├── tracking.ts
│   │   └── theme.ts
│   ├── utils/
│   │   ├── generators.ts          # Genera codici ordine, tracking, indirizzi finti
│   │   ├── timeSimulator.ts       # Calcola timestamp per gli step del tracking
│   │   └── formatters.ts          # Formatta prezzi €, date italiane
│   ├── config/
│   │   ├── ads.ts                 # Ad unit IDs AdMob
│   │   └── api.ts                 # Endpoints API prodotti
│   ├── App.tsx
│   └── main.tsx
├── public/
│   ├── sounds/
│   │   └── kaching.mp3            # Suono checkout
│   └── manifest.json              # PWA manifest
├── capacitor.config.ts
├── vite.config.ts
├── tailwind.config.ts
├── tsconfig.json
├── package.json
└── index.html
```

## Requisiti Tecnici

- Tutta l'app deve essere in **italiano** (UI, testi, placeholder, messaggi)
- Design **mobile-first**, responsive per desktop
- Animazioni fluide: usa `framer-motion` per transizioni pagina e micro-interazioni
- Bottom navigation bar con icone: 🏠 Home, 🔍 Esplora, 🛒 Carrello (con badge quantità), 📦 Ordini, 👤 Profilo
- Skeleton loading per i prodotti mentre caricano
- Pull-to-refresh sulla homepage
- La mappa tracking usa **react-leaflet** con tiles OpenStreetMap (zero costi)
- Genera un suono `kaching.mp3` placeholder (o usa un file audio gratuito) per il checkout
- L'app deve funzionare **offline** per ordini/tracking già caricati (Workbox caching)

## Skill e Agenti da Utilizzare

Hai a disposizione ~188 skill da plugin + 1.460 skill Antigravity + 19 agenti cs-*. Di seguito le skill e gli agenti mappati ad ogni area del progetto. **Leggile e invocale nei momenti indicati.**

---

### FASE 0 — DESIGN & ARCHITETTURA (prima di scrivere codice)

**Skill obbligatorie da leggere PRIMA di tutto:**

1. **`frontend-design`** (plugin claude-plugins-official)
   Questa è la skill più critica per CartRush. Leggila per intero e applica:
   - Crea un **design plan** prima di toccare qualsiasi componente: palette (4-6 hex per tema), type pairing (display + body), layout concept ASCII, e un **signature element** — il momento WOW dell'app (il checkout con confetti + haptic + suono è il candidato)
   - Autocritica il piano: se sembra il solito e-commerce generico, cambia. Ogni tema (Shein/Glovo/Minimal) deve avere personalità propria, non solo colori diversi
   - Copy UI in italiano conversazionale: "Il tuo pacco sta viaggiando! 🚚" non "Ordine in transito"
   - Scrivi il piano in un commento strutturato in cima a `src/styles/themes.ts`

2. **`ui-design-system`** (plugin product-skills)
   Usala per costruire il **token system** dei 3 temi: CSS custom properties per colori, spacing, radius, font. Ogni tema è un set di token. I componenti leggono i token, mai colori hardcodati.

3. **`senior-architect`** (plugin engineering-skills)
   Usala per le decisioni architetturali macro: struttura cartelle, separazione service layer, pattern per il theme switching, gestione dello state con Zustand.

4. **`saas-scaffolder`** (plugin product-skills)
   Usala per lo scaffolding iniziale della struttura progetto: directory tree, boilerplate, config files.

**Agente da invocare:** `/cs:fullstack-review` — dopo aver definito l'architettura, fai una review fullstack del piano prima di procedere.

---

### FASE 1 — FRONTEND & COMPONENTI

**Skill attive durante lo sviluppo UI:**

5. **`senior-frontend`** (plugin engineering-skills)
   Per ogni componente: performance, accessibilità, best practice React 18.

6. **`a11y-audit`** (plugin engineering-skills)
   Audit WCAG 2.2 su tutti i componenti: contrast ratio, keyboard focus, screen reader, reduced motion. CartRush deve essere accessibile.

7. **`ux-researcher-designer`** (plugin product-skills)
   Applica principi UX al flusso utente: il percorso Home → Prodotto → Carrello → Checkout → Tracking deve essere fluido e soddisfacente. Zero friction.

8. **`page-cro`** (plugin marketing-skills)
   Ottimizzazione conversione sulla homepage e checkout — anche se gli acquisti sono fittizi, l'esperienza deve *sentirsi* reale e irresistibile.

9. **`signup-flow-cro`** (plugin marketing-skills)
   Per l'eventuale onboarding utente: primo lancio app, tutorial, setup budget iniziale.

**Agente da invocare:** `/cs:frontend-review` — dopo aver completato i componenti principali, fai un frontend review completo.

**Skill Antigravity consigliate:**
- `react-*` — Best practice React
- `tailwind` — Pattern Tailwind avanzati
- `typescript` — TypeScript strict mode patterns

---

### FASE 2 — BACKEND & SERVIZI

**Skill attive per service layer e API:**

10. **`senior-backend`** (plugin engineering-skills)
    Per il ProductService (abstraction layer API), TrackingSimulator, e la logica di persistenza localStorage.

11. **`api-design-reviewer`** (plugin engineering-advanced-skills)
    Review del service layer: l'interfaccia ProductService deve essere pulita così in futuro si può swappare FakeStoreAPI con scraping Amazon senza toccare i componenti.

12. **`performance-profiler`** (plugin engineering-advanced-skills)
    Profiling performance: bundle size, lazy loading, code splitting delle pagine, caching delle immagini prodotto.

**Agente da invocare:** `/cs:backend-review` — review del service layer e della logica di simulazione tracking.

---

### FASE 3 — QUALITÀ & SICUREZZA

**Skill da applicare prima di considerare il progetto "shippable":**

13. **`code-reviewer`** (plugin engineering-skills)
    Code review su tutto il codebase: qualità, pattern, naming convention.

14. **`adversarial-reviewer`** (plugin engineering-skills)
    Review con 3 personas ostili (Saboteur, New Hire, Security Auditor). Trova edge case, UX confuse, possibili crash.

15. **`senior-security`** (plugin engineering-skills)
    Sicurezza applicativa: anche se non ci sono pagamenti reali, l'app gestisce localStorage e potenzialmente dati utente.

16. **`gdpr-dsgvo-expert`** (plugin ra-qm-skills)
    Compliance GDPR: l'app usa AdMob (tracking), quindi serve banner cookie/consenso e privacy policy.

17. **`self-eval`** (plugin engineering-advanced-skills)
    Auto-valutazione finale della qualità del lavoro svolto: cosa è solido, cosa è fragile, cosa va migliorato.

18. **`ship-gate`** (plugin engineering-advanced-skills)
    Gate di qualità pre-deploy: checklist ship-readiness prima di pubblicare su App Store / Play Store.

---

### FASE 4 — MARKETING & PUBBLICAZIONE

**Skill da usare quando l'app è pronta per il lancio:**

19. **`app-store-optimization`** (plugin marketing-skills)
    ASO: titolo, descrizione, keyword, screenshot per App Store e Google Play. CartRush deve posizionarsi bene su "shopping virtuale", "retail therapy", "dopamine shopping".

20. **`ad-creative`** (plugin marketing-skills)
    Creatività per promuovere l'app: copy per gli ad, concept visual.

21. **`content-creator`** (plugin marketing-skills)
    Contenuti per social media launch: post Instagram, TikTok script, blog post.

22. **`launch-strategy`** (plugin marketing-skills)
    Strategia di lancio: timeline, canali, target audience, metriche.

23. **`pricing-strategy`** (plugin marketing-skills)
    Per l'eventuale versione premium/freemium futura.

**Skill extra utili:**
- **`last30days`** — Ricerca social real-time: cerca trend su "fake shopping app", "retail therapy app", "dopamine shopping" su Reddit, TikTok, X per validare il concept e trovare competitor.
- **`competitive-teardown`** (plugin product-skills) — Analisi competitiva di app simili esistenti.

---

### ORDINE DI ESECUZIONE

```
STEP 1: Leggi frontend-design + ui-design-system → crea design plan in themes.ts
STEP 2: Leggi senior-architect + saas-scaffolder → scaffold progetto
STEP 3: Invoca /cs:fullstack-review sul piano architetturale
STEP 4: Builda componenti con senior-frontend + a11y-audit attive
STEP 5: Builda servizi con senior-backend + api-design-reviewer
STEP 6: Invoca /cs:frontend-review + /cs:backend-review
STEP 7: Applica adversarial-reviewer + ship-gate prima di shippare
STEP 8: (futuro) app-store-optimization + launch-strategy per il lancio
```

## Fase 1 — Cosa buildare ORA

Concentrati su far funzionare queste schermate end-to-end:

1. **Homepage** con prodotti da FakeStore/DummyJSON API, barra ricerca, filtri categoria, flash sale banner con timer
2. **Pagina prodotto** con dettaglio e "Aggiungi al carrello"
3. **Carrello** funzionante con quantità e totale
4. **Checkout fittizio** completo con animazione celebrativa
5. **Pagina ordini** con lista e stati
6. **Tracking page** con timeline a step + mappa Leaflet con marker animato
7. **Theme switcher** funzionante (Shein/Glovo/Minimal)
8. **Budget bar** in alto e **streak counter**

NON servono per ora: AdMob (placeholder), notifiche push (predisponi il service), profilo utente (pagina vuota ok).

Dopo il setup iniziale, assicurati che `npm run dev` funzioni e che l'app sia navigabile con dati reali dalle API.

## File di Progetto — Crea SUBITO prima di tutto il resto

### .gitignore

Crea un `.gitignore` completo per questo stack. Deve includere:

```
# Dependencies
node_modules/
.pnp
.pnp.js

# Build output
dist/
build/
.vite/

# Capacitor native builds
android/
ios/
!android/.gitkeep
!ios/.gitkeep

# Environment variables
.env
.env.local
.env.development.local
.env.test.local
.env.production.local

# IDE & OS
.vscode/
.idea/
*.swp
*.swo
*~
.DS_Store
Thumbs.db
desktop.ini

# Logs
npm-debug.log*
yarn-debug.log*
yarn-error.log*
*.log

# Testing
coverage/

# TypeScript cache
*.tsbuildinfo

# Capacitor
capacitor-cordova-android-plugins/
capacitor-cordova-ios-plugins/

# AdMob
google-services.json
GoogleService-Info.plist

# Misc
.cache/
.temp/
*.local
```

### LICENSE

Crea un file `LICENSE` con licenza **MIT**, intestata a:

```
MIT License

Copyright (c) 2026 Zehir Hajeb — CartRush

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

### README.md

Crea un `README.md` professionale con questa struttura:

```markdown
# 🛒⚡ CartRush

**La scarica di adrenalina dello shopping, senza spendere un centesimo.**

CartRush è un'app di shopping virtuale dove puoi navigare, aggiungere al carrello e "acquistare" prodotti reali — tutto fittizio. Nessun pagamento reale, nessun addebito. Solo la soddisfazione pura dell'acquisto.

Pensata per chi ha bisogno di una dose di retail therapy senza conseguenze finanziarie.

## ✨ Features

- 🛍️ **Catalogo reale** — Prodotti veri da navigare e "acquistare"
- 💳 **Checkout immersivo** — Simulazione completa con animazioni e suoni soddisfacenti
- 📦 **Tracking realistico** — Codice di tracciamento, timeline a step e mappa con pacco in movimento
- 🎨 **3 stili visuali** — Shein (denso e colorato), Glovo (dark mode), Minimal (premium)
- 🔥 **Streak & Budget** — Budget giornaliero virtuale e streak di acquisti consecutivi
- ⚡ **Flash Sale** — Timer countdown per offerte lampo simulate
- 📱 **PWA + Native** — Funziona nel browser e come app iOS/Android via Capacitor

## 🛠️ Tech Stack

- **React 18** + **TypeScript** + **Vite**
- **Tailwind CSS 3** — Styling utility-first
- **Capacitor 6** — Build native iOS/Android
- **Zustand** — State management
- **Framer Motion** — Animazioni
- **Leaflet.js** — Mappa tracking
- **Workbox** — Offline support

## 🚀 Getting Started

### Prerequisiti

- Node.js 18+
- npm o yarn

### Installazione

git clone https://github.com/hajebzehir03-ai/dopamine-boost-1.git
cd dopamine-boost-1
npm install
npm run dev

### Build Produzione

npm run build

### Build Native (Capacitor)

npx cap add android
npx cap add ios
npx cap sync
npx cap open android  # Apre Android Studio
npx cap open ios      # Apre Xcode

## 📁 Struttura Progetto

src/
├── components/     # Componenti UI riutilizzabili
├── pages/          # Schermate dell'app
├── stores/         # State management (Zustand)
├── services/       # API, tracking, notifiche
├── hooks/          # Custom React hooks
├── styles/         # Temi e CSS globali
├── types/          # TypeScript types
├── utils/          # Utility functions
└── config/         # Configurazione ads e API

## 🎨 Temi Disponibili

| Tema | Descrizione |
|------|-------------|
| Shein | Grid densa, colorato, feeling abbondanza |
| Glovo | Dark mode, arancione, feeling delivery |
| Minimal | Bianco puro, serif, feeling premium |

## 📄 Licenza

MIT — vedi [LICENSE](./LICENSE)

## 👤 Autore

**Zehir Hajeb** — [GitHub](https://github.com/hajebzehir03-ai)
```

**IMPORTANTE**: Crea questi 3 file (.gitignore, LICENSE, README.md) come PRIMA cosa, prima di iniziare a creare qualsiasi altro file del progetto. Fai il commit iniziale con messaggio `"chore: initial project setup — .gitignore, LICENSE, README"` e poi procedi con il resto dell'app.
