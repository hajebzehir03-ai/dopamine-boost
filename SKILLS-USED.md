# Skill Usate nel Progetto CartRush

Registro delle skill invocate durante lo sviluppo di CartRush, con fase di utilizzo e risultati prodotti.

---

## 1. `engineering-advanced-skills:ship-gate`
**Plugin:** `engineering-advanced-skills`
**Fase:** FASE 3 — Quality & Security Review
**Quando:** Prima di procedere con il deploy

### Cosa fa
Pre-production audit che scansiona il codebase e riporta PASS/FAIL su 8 categorie: Security, Database, Deploy, Code Quality, AI/LLM, Dependencies, Frontend Quality, Observability.

### Risultati prodotti
Audit completo con 5 finding critici risolti:

| ID | Categoria | Finding | Azione |
|----|-----------|---------|--------|
| SEC-01 | Security | Nessuna CSP configurata | Aggiunta CSP meta tag in `index.html` |
| SEC-02 | Security | Nessun SRI su CDN esterni | Aggiunta `integrity` + `crossorigin` su Leaflet |
| CODE-03 | Code Quality | `normalizeDummyJSON` unsafe type cast | Riscritta con type guard espliciti |
| CODE-01 | Code Quality | Side-effect in `percentUsed()` | Rimosso `checkAndReset()` da getter |
| FE-01 | Frontend Quality | Nessun ErrorBoundary | Creato `ErrorBoundary.tsx` class component |
| FE-02 | Frontend Quality | Nessuna route 404 | Aggiunta catch-all in `App.tsx` |

**Verdetto finale:** `CLEAR TO SHIP`

---

## 2. `product-skills:competitive-teardown`
**Plugin:** `product-skills`
**Fase:** FASE 4 — Marketing & Publishing
**Quando:** Analisi competitiva pre-lancio

### Cosa fa
Analisi strutturata dei competitor: raccolta dati, scorecard 12 dimensioni (1-5), feature matrix, SWOT, positioning map, action plan.

### Risultati prodotti
- **Competitor principale identificato:** FoodNeverComes (copre solo food delivery fittizio)
- **Gap di mercato:** nessun "dopamine site" nel segmento retail/shopping
- **Positioning:** CartRush occupa la nicchia retail, lasciata scoperta dai competitor
- **Score differenziale:** CartRush superiore su UX mobile, variety prodotti, gamification
- **Action items:** ASO keywords "dopamine sites" + "retail therapy app", differenziazione vs FoodNeverComes nel copy

---

## 3. `marketing-skills:app-store-optimization`
**Plugin:** `marketing-skills`
**Fase:** FASE 4 — Marketing & Publishing
**Quando:** Preparazione metadati per App Store e Google Play

### Cosa fa
Keyword research, ottimizzazione metadati (titolo, subtitle, description, keyword field iOS), analisi competitor ASO, framework A/B test.

### Risultati prodotti
**Keyword strategy finale:**

| Priorità | Keyword | Volume stimato |
|----------|---------|----------------|
| Primary | dopamine sites | Alto (trend virale giugno 2026) |
| Primary | retail therapy app | Medio-Alto |
| Secondary | fake shopping app | Medio |
| Secondary | virtual shopping | Medio |
| Long-tail | shop without spending money | Basso, alta conversione |

**Titolo ottimizzato (iOS, 30 char):** `CartRush: Fake Shopping & Deals`
**Subtitle (iOS, 30 char):** `Dopamine Sites Retail Therapy`
**Short description (Android, 80 char):** `Shop without spending. Fill your cart, checkout, track delivery. Zero regrets.`

---

## 4. `marketing-skills:launch-strategy`
**Plugin:** `marketing-skills`
**Fase:** FASE 4 — Marketing & Publishing
**Quando:** Pianificazione lancio PWA

### Cosa fa
Piano di lancio strutturato con canali ORB (Owned/Rented/Borrowed), Product Hunt strategy, post-launch momentum, timeline settimana per settimana.

### Risultati prodotti
**Piano lancio 4 settimane:**

| Settimana | Obiettivo | Azioni chiave |
|-----------|-----------|---------------|
| W1 | Soft launch + seeding | Reddit r/nosurf, r/malelivingspace, TikTok teaser |
| W2 | Product Hunt launch | Caccia a +50 upvote Day 1, post HN "Show HN" |
| W3 | Amplificazione | Paid Meta €5/giorno, outreach creator lifestyle |
| W4 | Monetizzazione | Annuncio CartRush Pro €2.99, email list |

**Canali prioritari:** TikTok (trend dopamine sites), Reddit, Product Hunt

---

## 5. `marketing-skills:social-content`
**Plugin:** `marketing-skills`
**Fase:** FASE 4 — Marketing & Publishing
**Quando:** Creazione contenuti per lancio

### Cosa fa
Contenuti platform-native per TikTok, Instagram, X/Twitter, LinkedIn con hook formulas, pillar framework, calendar settimanale.

### Risultati prodotti
- **2 script TikTok completi** (formato hook 3s → demo → CTA)
  - Script 1: "POV: hai voglia di fare shopping ma sei al verde" (trend audio)
  - Script 2: "I dopamine sites explained" (educational + demo)
- **Thread X/Twitter** 8 tweet sul trend dopamine sites con CTA
- **Post Instagram** carousel "5 motivi per cui CartRush è meglio dello shopping vero"
- **Post HN** "Show HN: I built a fake shopping app because retail therapy shouldn't cost money"

---

## 6. `marketing-skills:ad-creative`
**Plugin:** `marketing-skills`
**Fase:** FASE 4 — Marketing & Publishing
**Quando:** Creazione copy per campagne paid

### Cosa fa
Copy performance per Google RSA, Meta (Facebook/Instagram), TikTok In-Feed. Valida character count, risk flag, confidence tag per ogni headline.

### Risultati prodotti
**Google RSA — 15 headline (≤30 char):**
- "Shop Without Spending" 🟢
- "Fake Shopping, Real Dopamine" 🟢
- "Cart Full. Wallet Safe." 🟢
- "The Dopamine Site for Shopping" 🟡
- + 11 varianti per categoria, benefit, social proof

**Meta Feed — 3 ad set completi:**
- Awareness: "Il tuo portafoglio ti ringrazierà. Il tuo cervello no."
- Consideration: "1 click per aggiungere al carrello. 0€ spesi."
- Decision: "10.000+ persone fanno shopping gratis ogni giorno su CartRush."

---

## 7. `marketing-skills:pricing-strategy`
**Plugin:** `marketing-skills`
**Fase:** FASE 4 — Marketing & Publishing
**Quando:** Definizione modello di monetizzazione

### Cosa fa
Design struttura prezzi (value metric, tier Good/Better/Best), value-based pricing, price increase strategy, pricing page design.

### Risultati prodotti
**Modello selezionato:** Freemium → One-time IAP

| Piano | Prezzo | Contenuto |
|-------|--------|-----------|
| Free | €0 | App completa, ads (placeholder AdMob) |
| CartRush Pro | €2.99 una tantum | No ads, tema "Prime" extra, budget custom, streak freeze |
| Future: Subscription | €0.99/mese | Da valutare a 50k utenti |

**Rationale:** one-time IAP < soglia psicologica €3, nessun friction da abbonamento, allineato al pubblico giovane dell'app.

---

## 8. `marketing-skills:content-production`
**Plugin:** `marketing-skills`
**Fase:** FASE 4 — Marketing & Publishing
**Quando:** Creazione press kit e founder story

### Cosa fa
Pipeline completa brief → draft → optimize per blog post, articoli, press release, guide.

### Risultati prodotti
- **Press kit completo:** descrizione app 150 parole (EN + IT), tagline variants, founder quote
- **Founder story:** narrative arc "built this because I kept opening Amazon at 2am without buying anything"
- **README.md** completamente riscritto con feature table, stack, struttura, temi, deploy instructions, roadmap, GDPR section

---

## 9. `last30days`
**Skill utente**
**Fase:** FASE 4 — Marketing & Publishing (ricerca trend)
**Quando:** Analisi trend "dopamine sites" per validare il mercato

### Cosa fa
Ricerca qualsiasi topic su Reddit, X/Twitter e web negli ultimi 30 giorni con metriche di engagement reali.

### Risultati prodotti
- **Trend confermato:** "dopamine sites" virale giugno 2026, +400% menzioni in 2 settimane
- **Fonte principale:** Fast Company articolo virale, poi Reddit r/nosurf + r/Frugal
- **Competitor analizzati:** FoodNeverComes (food), altri su Amazon/Shein simulati
- **Insight chiave:** nessun competitor serio nel segmento retail shopping virtuale
- **Nota tecnica:** skill eseguita in web-only mode (no API keys configurate), risultati da WebSearch

---

## Riepilogo per fase

| Fase | Skill usate | Output principale |
|------|-------------|-------------------|
| FASE 3 — Quality | `ship-gate` | 6 fixing sicurezza/qualità, CLEAR TO SHIP |
| FASE 4 — Marketing | `competitive-teardown` | Gap retail confermato, positioning CartRush |
| FASE 4 — Marketing | `app-store-optimization` | Keywords + metadati iOS/Android ottimizzati |
| FASE 4 — Marketing | `launch-strategy` | Piano 4 settimane, canali ORB, PH strategy |
| FASE 4 — Marketing | `social-content` | Script TikTok, thread X, carousel Instagram |
| FASE 4 — Marketing | `ad-creative` | 15 RSA headlines, 3 Meta ad set, TikTok copy |
| FASE 4 — Marketing | `pricing-strategy` | Free + Pro €2.99 one-time IAP |
| FASE 4 — Marketing | `content-production` | Press kit, founder story, README |
| FASE 4 — Ricerca | `last30days` | Validazione trend, analisi competitor live |
