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

```bash
git clone https://github.com/hajebzehir03-ai/dopamine-boost-1.git
cd dopamine-boost-1
npm install
npm run dev
```

### Build Produzione

```bash
npm run build
```

### Build Native (Capacitor)

```bash
npx cap add android
npx cap add ios
npx cap sync
npx cap open android  # Apre Android Studio
npx cap open ios      # Apre Xcode
```

## 📁 Struttura Progetto

```
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
```

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
