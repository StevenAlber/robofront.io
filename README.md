# ROBOFRONT Intelligence — robofront.io (v1.1)

Static landing page for **robofront.io**.

## v1.1 muudatused (11.06.2026)
- **Fondid laetud**: DM Sans + Inter (Google Fonts) — varem jooksis sait Arial/Helvetica peal
- **Päris field-fotod**: CSS-joonistatud robot asendatud Shenzheni fotodega (Huaqiangbei robotipood, juuni 2026)
- **Uus sektsioon "Field Evidence"**: 3 fotot allkirjadega
- **Field Report kaart**: dekoratiivne võltsgraafik asendatud päris fotoga (3 humanoidi toolidel)
- **Favicon** lisatud (assets/favicon.svg)
- **og:image** lisatud (assets/og-image.jpg) — sotsiaaljagaminne näitab nüüd brändipilti
- Hongkongi kaardisõlme tekst muudetud kliendikeelseks ("Headquarters · contracting hub")
- Footerisse lisatud ROBOFRONT CHINA Telegram-link — **⚠️ ASENDA õige kanali URL** (index.html, otsi "REPLACE_WITH_CHANNEL")

## Fotode vahetamine (kui uued originaalid valmis)
Asenda failid kaustas `assets/` SAMADE nimedega — HTML-i muutma ei pea:
- `hero-shenzhen-humanoid.jpg` — hero, portree 4:5 (1200×1500)
- `field-dexterous-hands.jpg` — 4:3 (1100×825)
- `field-robot-coffee-kiosk.jpg` — 4:3
- `field-robot-latte.jpg` — 4:3
- `field-humanoids-resting.jpg` — ruut 1:1
- `og-image.jpg` — 1200×630
- `field-future-era-store.jpg` — varus, praegu kasutamata (4:5)

## GitHub Pages deployment
1. Lae kõik failid repo juurkausta (assets/ kaust kaasa!)
2. Settings → Pages → Deploy from a branch → main / root
3. DNS (Gandi): A-kirjed apex-domeenile GitHub Pages IP-dele:
   - 185.199.108.153 / 185.199.109.153 / 185.199.110.153 / 185.199.111.153
   - CNAME `www` → `<sinu-github-kasutajanimi>.github.io.`

## E-mailid (seadista Gandis või asenda)
- partners@robofront.io · editorial@robofront.io · access@robofront.io
