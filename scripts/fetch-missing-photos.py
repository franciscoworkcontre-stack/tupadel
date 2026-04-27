#!/usr/bin/env python3
"""
Busca imágenes para las palas sin foto en tiendas Shopify con amplio catálogo.
Las guarda en public/palas/ y actualiza la DB.
"""

import json, os, re, sys, time, urllib.request, urllib.parse
import psycopg2
from difflib import SequenceMatcher

DB_URL = os.environ.get("DATABASE_URL_UNPOOLED") or os.environ.get("DATABASE_URL")
OUT_DIR = os.path.join(os.path.dirname(__file__), "../public/palas")
os.makedirs(OUT_DIR, exist_ok=True)

HEADERS = {"User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36"}

# Tiendas Shopify con catálogo amplio (múltiples marcas)
STORES = [
    "www.padelnuestro.es",      # Mayor retailer España, todas las marcas
    "www.depadel.com",          # España, todas las marcas
    "www.padel45.com",          # España
    "www.padelstar.es",         # España
    "www.padelmaniac.es",       # España
    "padeldepot.cl",            # Chile
    "paladelante.cl",           # Chile
]

def similarity(a: str, b: str) -> float:
    return SequenceMatcher(None, a.lower(), b.lower()).ratio()

def normalize(s: str) -> str:
    return re.sub(r"[^a-z0-9 ]", " ", s.lower()).strip()

def fetch_json(url: str):
    try:
        req = urllib.request.Request(url, headers=HEADERS)
        with urllib.request.urlopen(req, timeout=10) as r:
            return json.loads(r.read())
    except Exception as e:
        return None

def fetch_store_products(domain: str):
    products = []
    page = 1
    while True:
        data = fetch_json(f"https://{domain}/products.json?limit=250&page={page}")
        if not data or not data.get("products"):
            break
        batch = data["products"]
        products.extend(batch)
        if len(batch) < 250:
            break
        page += 1
        time.sleep(0.3)
    return products

def download_image(url: str, dest: str) -> bool:
    try:
        req = urllib.request.Request(url, headers=HEADERS)
        with urllib.request.urlopen(req, timeout=15) as r:
            data = r.read()
        if len(data) < 10_000:  # imagen demasiado pequeña / 404 html
            return False
        with open(dest, "wb") as f:
            f.write(data)
        return True
    except:
        return False

def find_best_match(products, marca: str, modelo: str):
    query = normalize(f"{marca} {modelo}")
    best_score = 0.0
    best_product = None
    for p in products:
        title = normalize(p.get("title", ""))
        # Require marca in title (fuzzy)
        marca_words = marca.lower().split()
        if not any(w in title for w in marca_words):
            continue
        score = similarity(query, title)
        if score > best_score:
            best_score = score
            best_product = p
    if best_score < 0.4:
        return None
    return best_product

def get_best_image(product):
    images = product.get("images", [])
    if not images:
        # Try variants
        for v in product.get("variants", []):
            if v.get("featured_image"):
                return v["featured_image"].get("src")
        return None
    # Prefer largest image
    return images[0].get("src")

def safe_slug(s: str) -> str:
    return re.sub(r"[^a-z0-9]", "_", s.lower())[:40]

def main():
    conn = psycopg2.connect(DB_URL)
    cur = conn.cursor()

    cur.execute("SELECT id, slug, marca, modelo, anio FROM palas WHERE imagen_principal IS NULL AND publicada = true ORDER BY marca, modelo")
    palas = cur.fetchall()
    print(f"🔍 {len(palas)} palas sin foto\n")

    if not palas:
        print("✅ Todas las palas tienen foto")
        return

    # Agrupar por marca para optimizar búsquedas por tienda
    marcas_needed = set(p[2] for p in palas)
    print(f"Marcas: {', '.join(sorted(marcas_needed))}\n")

    # Caché de productos por tienda (para no repetir requests)
    store_cache: dict[str, list] = {}

    found = 0
    not_found = []

    for (pala_id, slug, marca, modelo, anio) in palas:
        print(f"  → {marca} {modelo} {anio}", end="", flush=True)
        img_found = False

        for domain in STORES:
            # Cargar tienda si no está en caché
            if domain not in store_cache:
                print(f"\n    [fetching {domain}]", end="", flush=True)
                store_cache[domain] = fetch_store_products(domain)
                print(f" {len(store_cache[domain])} productos", end="", flush=True)

            products = store_cache[domain]
            if not products:
                continue

            match = find_best_match(products, marca, modelo)
            if not match:
                continue

            img_url = get_best_image(match)
            if not img_url:
                continue

            # Limpiar query params de Shopify (v=xxx)
            img_url_clean = img_url.split("?")[0]
            ext = os.path.splitext(img_url_clean)[1].lower() or ".jpg"
            if ext not in (".jpg", ".jpeg", ".png", ".webp", ".avif"):
                ext = ".jpg"

            store_slug = domain.replace("www.", "").replace(".", "_").replace("-", "_")
            handle = match.get("handle", "unknown")
            img_id = match.get("images", [{}])[0].get("id", "0")
            filename = f"{store_slug}__{handle}__{img_id}{ext}"
            dest = os.path.join(OUT_DIR, filename)

            if os.path.exists(dest) or download_image(img_url, dest):
                web_path = f"/palas/{filename}"
                cur.execute(
                    "UPDATE palas SET imagen_principal = %s WHERE id = %s",
                    (web_path, pala_id)
                )
                conn.commit()
                print(f" ✓ ({domain})")
                found += 1
                img_found = True
                break

            time.sleep(0.2)

        if not img_found:
            print(f" ✗ no encontrada")
            not_found.append(f"{marca} {modelo} {anio}")

    cur.close()
    conn.close()

    print(f"\n✅ {found}/{len(palas)} imágenes encontradas")
    if not_found:
        print(f"\n❌ Sin imagen ({len(not_found)}):")
        for p in not_found:
            print(f"  - {p}")

if __name__ == "__main__":
    main()
