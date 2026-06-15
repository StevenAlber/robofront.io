ROBOFRONT — count-up leht
==========================

MIDA SA MUUDAD
--------------
Ainult ühte faili: data.js

Seal on:
  location     — ülariba tekst (asukoht / koordinaadid)
  updated      — "UPDATED ..." aeg (hoia ausana, muuda käsitsi)
  deployments  — suur number (jookseb üles)
  reports      — väiksem number (jookseb üles)
  signals      — signaalikaartide nimekiri (tag + text)

Muuda väärtus, salvesta, lae GitHubi. index.html'i ei pea puutuma.


KUIDAS UUENDADA (GitHub Pages)
------------------------------
1. Paki ZIP lahti.
2. Ava data.js, muuda numbrid / signaalid / aeg.
3. Lae index.html ja data.js GitHubi (mõlemad samasse kausta).
4. Valmis. Number jookseb 0-st õige väärtuseni lehe avanedes.


MÄRKUSED
--------
- Number on praegu DEKORATIIVNE: animatsioon mängib lehe avanedes,
  väärtus tuleb data.js'ist. See pole reaalajas loendur — ja see on aus,
  sest "UPDATED" aeg ütleb millal viimati uuendati.

- Animatsioon aeglustub lõpus (ease-out) — see annab kalli mulje.
  Kui kasutajal on "reduced motion" sees, snäppleb kohe lõppväärtusele.

- Logo on hetkel CSS-iga tehtud (sinine kuul + punane ring).
  Kui tahad oma päris logo, ütle — vahetan välja.

- Kui kunagi tahad numbri PÄRISELT liveiks (kasvab kui tegelikult
  lisad deploymenti), ütle — see sama data.js struktuur sobib selleks.
