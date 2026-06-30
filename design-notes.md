# CartRush — Design Specs

Note di design estratte dai mockup generati. Una sezione per ogni schermata.
Palette base: primary `#FF2060`, gradient accent `#FF2060 → #FF7A1A`, sfondo `#fff`,
testo near-black `#15161a`, grigi UI `#9a9da4` / `#b0b3ba` / `#f1f2f4` / `#e6e8ec`.

---

## CartRush Home (`CartRush Home.dc.html`)

Homepage stile Shein — iPhone 15 Pro frame 393×852px.

### Spacing
- Padding orizzontale globale schermata: `18px`
- Header: `padding: 6px 18px 8px`
- Search bar interna: `padding: 11px 14px`, gap icona-testo `9px`
- Griglia prodotti: `gap: 11px`, padding `0 18px 16px`
- Card interna (contenuto): `padding: 9px 10px 11px`
- Pill categorie: `padding: 8px 18px`, gap `8px`
- Flash banner: margin `6px 18px 14px`, padding interno `14px`

### Border radius
- Frame telefono: `54px`
- Banner flash: `18px`
- Card prodotto: `15px`
- Search bar: `13px`
- Pill categorie: `20px` (full pill)
- Pill sort: `14px`
- Bottone "+": `9px` (squircle)
- Badge sconto: `6px`; badge streak: `20px`

### Ombre (box-shadow)
- Card prodotto: `0 6px 18px rgba(20,22,26,.06)` — molto sottile
- Flash banner: `0 12px 24px rgba(255,40,90,.28)` — colorata, sull'accent
- Badge streak: `0 4px 10px rgba(255,32,96,.3)`
- Search container: `0 6px 14px rgba(0,0,0,.03)`
- Frame: `0 40px 90px rgba(0,0,0,.35), 0 0 0 11px #1b1c20, 0 0 0 13px #2c2e34`

### Tipografia
- Logo / prezzi / badge sconto: **Archivo Narrow** 800 (condensed display) — logo `27px`, prezzo `18px`
- Body: **Archivo** — titolo prodotto `12.5px/600`, rating `11px/700`, label categoria `9px/700` uppercase letter-spacing `.8px`
- Countdown: **JetBrains Mono** 700 `16px`, letter-spacing `1px`
- Status bar ora: `15px/700`
- Nav label: `9px`, attiva `700`/`#FF2060`, inattiva `600`/`#9a9da4`

### Proporzioni card
- Immagine: `aspect-ratio: 1` (quadrata, ~165px su griglia 393px)
- Contenuto sotto: ~95px → rapporto immagine:contenuto circa **63:37**
- Titolo a 2 righe con altezza fissa `31px` (overflow hidden) per allineare i prezzi tra card

### Bottom nav
- Altezza `76px`, posizione fissa (absolute bottom)
- Sfondo: `rgba(255,255,255,.96)` + `backdrop-filter: blur(12px)`
- Bordo superiore: `1px solid #f0f1f3` (no shadow — separazione data da blur + border)
- 5 icone `space-around`, padding `11px 14px 0`
- Icona attiva piena `#FF2060`, inattive stroke `#9a9da4` (stroke-width 2)
- Badge carrello: `min-width 16px`, height `16px`, bordo `1.5px solid #fff` per stacco dall'icona

### Pattern immagini placeholder
- `repeating-linear-gradient(45deg, #f0f0f3 0 8px, #e9e9ee 8px 16px)` su sfondo `#f3f3f5`

---

## CartRush Home Dark — Glovo theme (`CartRush Home Dark.dc.html`)

Stesso layout, reskin dark "late-night delivery". Font **Outfit** (rounded sans).
Palette: sfondo `#1A1A1A`, card `#2A2A2A` + bordo `#333`, primary orange `#FF6B00`,
gradient accent `#FF6B00 → #FF9E1A`, testo `#f5f5f5`, grigi `#888` / `#777` / `#aaa`.

### Differenze chiave vs Shein theme
- **Tipografia**: un solo font (Outfit) per tutto — niente condensed display. Logo `25px/800`, prezzi `18px/800`, countdown resta JetBrains Mono.
- **Categorie**: NON pill orizzontali ma **bubble icona grandi** (stile Glovo/Deliveroo): `60×60px`, radius `20px`, gap `14px`, icona SVG `26px` + label sotto `11px`. Attiva = gradient orange con shadow `0 6px 16px rgba(255,107,0,.4)`; inattive = `#2A2A2A` + bordo `#383838`.
- **Card**: radius `18px` (vs 15px), gap griglia `14px` (vs 11px), padding interno `10px 11px 12px`. Bordo `1px solid #333`, shadow `0 8px 22px rgba(0,0,0,.3)`.
- **Bottone "+"**: radius `10px`, `28×28px`, riempito di primary (vs nero su light).
- **Sort "Default" attivo**: riempito orange (vs grigio chiaro su light).

### Ombre (dark)
- Card: `0 8px 22px rgba(0,0,0,.3)`
- Flash banner: `0 14px 30px rgba(255,107,0,.35)`
- Bubble categoria attiva / badge streak: `0 6px 16px rgba(255,107,0,.4)`
- Frame: `0 40px 90px rgba(0,0,0,.6)`

### Bottom nav (dark)
- Sfondo `rgba(20,20,20,.92)` + `backdrop-filter: blur(16px)`, bordo top `1px solid #2c2c2c`
- Indicatore attivo: **dot orange `5px`** sotto l'icona (al posto della label di testo) — icona attiva piena `#FF6B00`, inattive stroke `#777`
- Badge carrello: bordo `1.5px solid #141414` (match sfondo nav)

### Pattern immagini placeholder (dark)
- `repeating-linear-gradient(45deg, #303030 0 8px, #383838 8px 16px)` su sfondo `#333`

---

## CartRush Home Minimal — premium editorial (`CartRush Home Minimal.dc.html`)

Vibe "Apple Store × Net-a-Porter": calmo, lusso, tanto bianco.
Palette: sfondo `#fff`, niente bordi/ombre sulle card, charcoal `#1C1C1C`,
accent gold `#C9A84C`, grigi caldi `#8a857c` / `#b0aa9e` / `#b5afa3`, hairline `#e8e5de`/`#f0eee9`.

### Tipografia (la firma del tema)
- Titoli prodotto + logo + prezzi + heading: **Playfair Display** (serif) 500
  — logo `26px`, titolo prodotto `17px`, prezzo `20px`, heading sezione `22px`
- Body / label / nav: **Jost** (geometric sans) 400–500 con letter-spacing ampio (`1–2px`)
- Prezzo in **gold `#C9A84C`** (non charcoal)

### Layout — editoriale 1 colonna
- **1 prodotto per riga**, full-width. Niente griglia 2-col.
- Immagine `aspect-ratio: 3/2.6` (~60% altezza card), contenuto sotto in riga: testo a sx, prezzo+azione a dx.
- Padding orizzontale generoso: `26px` (vs 18px degli altri temi)
- Spazio verticale tra prodotti: `34–38px` (molto arioso)
- Bottone "+": cerchio `34px` outline `1px #1C1C1C` (filled charcoal se in carrello)

### Niente di tutto questo (rimosso vs altri temi)
- NO flash sale banner
- NO pill categorie / bubble: categorie = **link di testo** maiuscoletto `12px`, gap `22px`, attiva con underline gold `1.5px`
- NO emoji, NO badge colorati pieni — "in carrello" = pill bianca con check + label, sconto = tag nero piccolo `-40%`
- Search = solo **underline** `1px #e8e5de`, nessun fill

### Ombre
- Praticamente assenti. Unica: pill "Nel carrello" `0 2px 10px rgba(0,0,0,.06)`. Frame `0 40px 90px rgba(0,0,0,.28)`.

### Bottom nav (ultra-thin, text-only)
- Altezza `60px` (vs 76px), sfondo bianco, bordo top `1px #f0eee9`
- **Solo testo**, niente icone: label `11px` letter-spacing `1px`, attiva charcoal + underline gold `28×1.5px`, inattive `#b0aa9e`
- Badge carrello = `·2` inline in gold (no badge circolare)

### Pattern immagini placeholder (warm)
- `repeating-linear-gradient(45deg, #f1efe9 0 10px, #ebe8e1 10px 20px)` su sfondo `#f4f2ee`

---

## CartRush Product — pagina prodotto, Shein theme (`CartRush Product.dc.html`)

Pagina dettaglio prodotto stile SHEIN/Zara. Font **Archivo** + **Archivo Narrow** (prezzi), primary `#FF2060`.

### Struttura
- **Immagine full-width** in alto: altezza `530px` (~62% di 852), sfondo placeholder `#f1f1f3` con stripe `45deg`.
- **Controlli flottanti sull'immagine** (top `60px`): back a sx + share/heart/menu a dx — cerchi `42px` `rgba(255,255,255,.9)` + `backdrop-filter: blur(8px)` + shadow `0 4px 12px rgba(0,0,0,.08)`.
- Badge `-40%` sull'immagine (top 120px), dots paginazione immagine (attivo = barretta `18×5` primary).
- **Card flottante dal basso**: `border-radius: 28px 28px 0 0`, shadow superiore `0 -10px 30px rgba(0,0,0,.10)`, grabber `38×4` `#e6e8ec`. Padding `22px`.

### Gerarchia contenuto card
- Categoria `10px/700` uppercase letter-spacing `1px` muted `#b0b3ba`
- Titolo `21px/700` line-height `1.22`, letter-spacing `-.2px`
- Rating: 5 stelle `13px` + valore `12px/700` + count `(128)` muted
- **Prezzo grande**: Archivo Narrow 800 `34px` primary, + prezzo barrato `15px` + tag "RISPARMI 12€" su `#ffe6ee`
- **Selettore taglia**: pill `50×44px` radius `13px`; selezionata = fill `#15161a` testo bianco, altre = outline `1.5px #e6e8ec`. Header con link "Guida taglie" in primary.
- **CTA full-width**: `56px`, radius `18px`, fill primary, icona carrello + testo `16px/800`, shadow `0 12px 26px rgba(255,32,96,.32)`
- Subtext sotto CTA `12px` muted, centrato

### Note riuso
- Stesso sistema tipografico e colori di "CartRush Home" (Shein) — usare come coppia.
- Bottoni circolari overlay e card bottom-sheet sono pattern riutilizzabili per altre detail/modal.

---

## CartRush Confirmation — "wow moment" post-acquisto (`CartRush Confirmation.dc.html`)

Schermata di conferma celebrativa. Shein theme (`#FF2060`), Archivo + Archivo Narrow + JetBrains Mono.

### Struttura verticale
- Wash superiore soft: `linear-gradient(180deg, #fff5f8, #fff)` alto `360px`
- **Campo confetti** top `60px`, alto `300px` (~40% schermo): ~19 pezzi sparsi, mix rettangoli/quadrati/cerchi `6–9px`, colori `#FF2060 / #FF7A1A / #FFB400`, rotazioni e delay variati → look dinamico non a griglia
- **Checkmark hero** (top 150px): cerchio `96px` gradient `#FF2060→#FF5C3A`, shadow `0 16px 36px rgba(255,32,96,.4)`, anello pulsante intorno
- Order number mono `13px` su pill `#ffe6ee`, titolo `27px/800`, sottotitolo muted
- **Summary card** (radius 22px, shadow `0 14px 38px rgba(20,22,26,.08)`): 3 thumbnail circolari `44px` sovrapposti (margin-left -14px, bordo bianco 2px) + "3 prodotti"; divider; Totale `€147,50` Narrow 800 `26px`; Spedizione "Express 1-2 giorni" in verde `#16a34a` con icona camion
- CTA primary "Traccia il tuo ordine" + link "Continua lo shopping"

### Animazioni (keyframes in helmet, decorative)
- `cr-pop`: checkmark scala 0→1.12→1 con overshoot `cubic-bezier(.2,1.4,.4,1)`
- `cr-ring`: anello che si espande e svanisce, loop infinito
- `cr-check`: stroke-dashoffset 40→0, disegno del segno di spunta
- `cr-fall`: confetti entrano dall'alto con rotazione, delay scaglionati
- `cr-rise`: card e testi salgono+fade con delay
- Nota: animazioni puramente decorative/stateless → ok come keyframe CSS in `<helmet>` (non guidate da stato React)

---

## CartRush Tracking — tracciamento ordine, Shein theme (`CartRush Tracking.dc.html`)

Pagina di tracking con mappa + timeline. Sfondo schermata `#f6f6f8` (non bianco puro, per staccare le card). Archivo + JetBrains Mono (codici).

### Struttura (header fisso + scroll)
- Header fisso `54px` status + `50px` barra (back circolare `38px` + titolo centrato "Traccia ordine")
- Card ordine + card codice tracking: mono, label uppercase `10px` muted, pulsante "Copia" `#f1f2f4` con testo/icona primary
- **Status hero card**: gradient `125deg #FF2060→#FF4D5A→#FF7A1A`, icona pacco in tile `rgba(255,255,255,.18)`, "In transito" `22px/800`, sub-location, riga "Consegna prevista" su `rgba(0,0,0,.16)`
- **Mappa** poi **timeline**

### Mappa (approccio — NIENTE geografia disegnata a mano)
- Viewport `200px`, radius `20px`. Resa come **mappa stilizzata astratta**, non coste d'Italia accurate:
  - water = gradient verde-azzurro tenue; landmass = 2 blob `border-radius` morbidi
  - "strade" = 4 path SVG sottili `#d4dcd0` su viewBox `357×200` `preserveAspectRatio=none`
  - **route** = path curvo `#FF2060`: tratto pieno fatto + tratto tratteggiato animato (`cr-dash`) per il rimanente
  - origin Milano = dot bianco bordo nero; destination Roma = pin a goccia; **marker pacco** mid-route = cerchio primary `38px` con pulse + float
  - attribution "© OpenStreetMap" in basso a dx per realismo
- Razionale: mappe reali via tile esterni non affidabili offline; SVG Italia dettagliato vietato → stilizzazione livello-zoom-strada è la scelta più production-realistic.

### Timeline (6 step verticali)
- Colonna icona `26px` + linea connettrice `2px` tra gli step
- **Completati**: cerchio verde `#16a34a` con check bianco, testo nero `14px/700` + timestamp muted
- Linea che transiziona done→current: `linear-gradient(#16a34a, #FF2060)`
- **Current** (In transito): cerchio primary con dot bianco + `cr-pulse`, testo `800` primary
- **Futuri**: cerchio vuoto bordo `#e6e8ec`, testo `#b0b3ba`, date `#c4c7cd`
- Step: Confermato · In preparazione · Spedito · In transito (current) · In consegna · Consegnato

### Animazioni (keyframes helmet)
- `cr-pulse`: alone che si espande (marker mappa + step current)
- `cr-dash`: tratteggio route in movimento
- `cr-float`: marker pacco oscilla verticalmente
