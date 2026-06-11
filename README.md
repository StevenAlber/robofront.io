# ROBOFRONT Intelligence — robofront.io (v3.0 · flat)

## NB — see ZIP on lameda struktuuriga (mobiili jaoks)
Fondid on otse `assets/`-is (mitte `assets/fonts/`), et mobiilis ei peaks alamkausti laadima.
`video/` on praegu välja jäetud — videoväljad näitavad posterpilti, klipid lisad hiljem
(loo repos kaust `assets/video/` ja pane sinna field-clip-01.mp4 / field-clip-02.mp4).


Static, single-file landing for **robofront.io**. No build step, no framework.
Deploy to GitHub Pages and point DNS — see below.

## v3.0 — tehniline tipptaseme-pass (11.06.2026)
- **Self-hostitud fondid** (`assets/`) — Newsreader + Inter muutuvfontidena, IBM Plex Mono.
  Google Fonts CDN eemaldatud täielikult: kiirem, privaatne, püsiv. ~360K, esimene osapool.
- **Pildid: AVIF + WebP + JPEG** iga foto kohta, serveeritud `<picture>` kaudu (brauser valib parima).
  Hero on päris `<img fetchpriority="high">` (eelnevalt CSS-taust) → eellaaditav, responsive-valmis.
  Bändid kasutavad CSS `image-set()` (AVIF/WebP/JPEG).
- **Brändi-OG-kaart** `assets/og-image.jpg` (1200×630) — wordmark + tagline + humanoid.
  See on pilt, mis ilmub Telegrami / X-i / LinkedIni / WhatsAppi linki jagades.
- **Ikoonid/logod**: `favicon.svg` (skaleeruv) + `favicon-32.png` + `apple-touch-icon.png` (180)
  + `icon-512.png` + `site.webmanifest` (Android/Chrome). "Dispatch" märk: messing pealkirjajoon + 2 keharida.
- **Steel asendab teali** — institutsionaalsem palett (messing = ainus soe aktsent, steel = jahe signaal).
- **Lightbox** väljafoto-galeriile (klikk avab täissuuruses; Esc / klikk taustal sulgeb; ligipääsetav).
- **2 videokohta** (16:9) su Shenzheni klippidele — vt allpool.
- **JSON-LD** (Organization + WebSite), tugevdatud OG/Twitter-meta, jaluse sotsiaalikoonid.
- Säilitatud: WCAG AA kontrast, `prefers-reduced-motion`, FormSubmit-vormid, mobile-first.

## ⚠️ ASENDA enne avaldamist
Otsi failidest need stringid ja pane õiged URL-id/aadressid:
- `REPLACE_WITH_CHANNEL` — Telegrami kanal (jalus, `index.html`)
- `REPLACE_WITH_HANDLE` — X/Twitter (jalus)
- `REPLACE_WITH_PAGE` — LinkedIn-leht (jalus)
- E-mailid: `partners@robofront.io` (kõik vormid lähevad siia FormSubmit relee kaudu)
  > Esimese saadetise järel tuleb FormSubmitilt kinnitusmeil — kliki link aktiveerimiseks!
- Kui sotsiaalkontod on olemas, lisa nende URL-id ka JSON-LD `sameAs` massiivi (head' osas) entiteedi-sidumiseks.

## Fotode vahetamine (kui Shenzheni 16:9 originaalid valmis)
1. Aseta uued originaalid `assets/` kausta **samade .jpg-nimedega**.
2. Juurkaustas jooksuta: `python3 optimize.py`
   (vajab Pillow + pillow-avif-plugin: `pip install pillow pillow-avif-plugin`)
   → loob igale automaatselt `.avif` + `.webp` + tihendatud `.jpg`. **HTML-i ei pea muutma.**
- Hero on portree (nt 1200×1500); galerii 4:3; bändid laiad (nt 1920 lai). Lähtepildi seade `MAXEDGE` skriptis.

## Videod
Lae `assets/video/` kausta:
- `field-clip-01.mp4` ja `field-clip-02.mp4` (H.264, 1080p, kuni ~30 sek, <90MB)
Posterpildid on juba seotud. Kuni faile pole, väljad näitavad posterit; play aktiveerub niipea kui MP4 olemas.

## OG/ikoonide regenereerimine (kui tahad uut kaarti/märki)
OG-kaart ja ikoonid genereeriti ühekordse skriptiga (Pillow). Praegused failid on `assets/`-is valmis.
Uue OG-kaardi jaoks anna mulle uus hero-foto — teen uue 1200×630 kaardi sama stiiliga.

## GitHub Pages deployment
1. Lae **kõik** failid repo juurkausta (`assets/` kaust kaasa, sh `fonts/` ja `video/`).
2. Settings → Pages → Deploy from a branch → `main` / `root`.
3. DNS (Gandi): apex-domeenile A-kirjed GitHub Pages IP-dele:
   - 185.199.108.153 / 185.199.109.153 / 185.199.110.153 / 185.199.111.153
   - CNAME `www` → `<sinu-github-kasutajanimi>.github.io.`
4. `CNAME` fail on juba repos (`robofront.io`).

## Failid
- `index.html` · `thanks.html` · `site.webmanifest` · `CNAME`
- `optimize.py` — piltide regen-skript
- `assets/` — pildid (avif/webp/jpg), `fonts/`, `video/`, `og-image.jpg`, ikoonid
