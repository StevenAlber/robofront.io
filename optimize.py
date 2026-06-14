#!/usr/bin/env python3
"""
ROBOFRONT image optimizer.
Loob igale assets/-kaustas olevale .jpg/.png fotole AVIF + WebP + tihendatud JPEG
varuvariandi. Kui vahetad fotod uute (Shenzheni 16:9) originaalide vastu, jäta
samad failinimed ja jooksuta lihtsalt:  python3 optimize.py
"""
import os, sys
from PIL import Image
import pillow_avif  # noqa: F401  (registreerib AVIF-i Pillow'sse)

SRC = "assets"
# max pikem külg pikslites rolli kaupa (vaikimisi 1600)
MAXEDGE = {
    "hero-shenzhen-humanoid": 1500,
    "band-towers-diagonal":   1920,
    "hero-pingan-tower":      1920,
    "corridor-futian-cbd":    1600,
}
DEFAULT_MAXEDGE = 1200          # field-galerii pildid
SKIP = {"og-image"}            # OG-kaart genereeritakse eraldi (make_og.py)

def fit(im, maxedge):
    w, h = im.size
    if max(w, h) <= maxedge:
        return im
    s = maxedge / max(w, h)
    return im.resize((round(w*s), round(h*s)), Image.LANCZOS)

def process(path):
    base, _ = os.path.splitext(path)
    name = os.path.basename(base)
    if name in SKIP:
        return
    im = Image.open(path).convert("RGB")
    im = fit(im, MAXEDGE.get(name, DEFAULT_MAXEDGE))
    # JPEG fallback (progressive, mozjpeg-laadne kvaliteet)
    im.save(base + ".jpg", "JPEG", quality=82, optimize=True, progressive=True)
    # WebP
    im.save(base + ".webp", "WEBP", quality=80, method=6)
    # AVIF
    im.save(base + ".avif", "AVIF", quality=58, speed=4)
    j = os.path.getsize(base+".jpg")//1024
    w = os.path.getsize(base+".webp")//1024
    a = os.path.getsize(base+".avif")//1024
    print(f"{name:30} {im.size[0]}x{im.size[1]}  jpg {j}KB · webp {w}KB · avif {a}KB")

def main():
    files = [f for f in os.listdir(SRC) if f.lower().endswith((".jpg", ".jpeg", ".png"))]
    for f in sorted(files):
        process(os.path.join(SRC, f))

if __name__ == "__main__":
    main()
