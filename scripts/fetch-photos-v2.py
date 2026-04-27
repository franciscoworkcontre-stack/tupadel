#!/usr/bin/env python3
"""
Busca imágenes de palas directamente en sitios de fabricantes.
Usa og:image de páginas de producto.
"""

import json, os, re, sys, time, urllib.request, urllib.parse
from html.parser import HTMLParser
import requests
import psycopg2
from difflib import SequenceMatcher

DB_URL = "USE_ENV_VAR"
OUT_DIR = os.path.join(os.path.dirname(__file__), "../public/palas")
os.makedirs(OUT_DIR, exist_ok=True)

HEADERS = {
    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
    "Accept-Language": "es-ES,es;q=0.9,en;q=0.8",
}

S = requests.Session()
S.headers.update(HEADERS)

def similarity(a, b):
    return SequenceMatcher(None, a.lower(), b.lower()).ratio()

def normalize(s):
    return re.sub(r"[^a-z0-9 ]", " ", s.lower()).strip()

class MetaParser(HTMLParser):
    def __init__(self):
        super().__init__()
        self.og_image = None
        self.links = []
        self.title = ""
        self._in_title = False

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if tag == "meta":
            prop = attrs.get("property", "") or attrs.get("name", "")
            if prop in ("og:image", "twitter:image") and not self.og_image:
                self.og_image = attrs.get("content")
        elif tag == "a":
            href = attrs.get("href", "")
            text = ""
            self.links.append({"href": href, "text": text})
        elif tag == "title":
            self._in_title = True

    def handle_data(self, data):
        if self._in_title:
            self.title += data

    def handle_endtag(self, tag):
        if tag == "title":
            self._in_title = False

def fetch_html(url, timeout=15):
    try:
        r = S.get(url, timeout=timeout, allow_redirects=True)
        if r.status_code == 200:
            return r.text
        return None
    except Exception as e:
        return None

def extract_og_image(html):
    if not html:
        return None
    p = MetaParser()
    p.feed(html[:50000])  # Only need head
    return p.og_image

def extract_links(html):
    """Extract all <a href=> links with surrounding text context."""
    links = []
    for m in re.finditer(r'<a[^>]+href=["\']([^"\']+)["\'][^>]*>(.*?)</a>', html, re.IGNORECASE | re.DOTALL):
        href = m.group(1)
        text = re.sub(r'<[^>]+>', '', m.group(2)).strip()
        if text:
            links.append((href, text))
    return links

def find_product_link(links, marca, modelo, base_url):
    """Find the best matching product link."""
    query = normalize(f"{marca} {modelo}")
    best_score = 0
    best_href = None
    marca_words = [w for w in marca.lower().split() if len(w) > 2]

    for href, text in links:
        if not text or len(text) < 3:
            continue
        text_norm = normalize(text)
        if not any(w in text_norm for w in marca_words):
            continue
        score = similarity(query, text_norm)
        if score > best_score:
            best_score = score
            best_href = href

    if best_score < 0.35:
        return None

    if best_href and best_href.startswith("/"):
        parsed = urllib.parse.urlparse(base_url)
        best_href = f"{parsed.scheme}://{parsed.netloc}{best_href}"
    return best_href

def download_image(url, dest):
    try:
        r = S.get(url, timeout=20, stream=True)
        if r.status_code != 200:
            return False
        content = r.content
        if len(content) < 5000:
            return False
        with open(dest, "wb") as f:
            f.write(content)
        return True
    except:
        return False

def safe_filename(marca, modelo):
    s = re.sub(r"[^a-z0-9]", "_", f"{marca}_{modelo}".lower())
    return s[:60]

# ─── Brand-specific catalog strategies ──────────────────────────────────────

def search_bullpadel(marca, modelo, anio):
    """Bullpadel PrestaShop search."""
    query = urllib.parse.quote(f"bullpadel {modelo}")
    url = f"https://www.bullpadel.com/es/buscar?s={query}"
    html = fetch_html(url)
    if not html:
        # Try catalog
        html = fetch_html("https://www.bullpadel.com/es/28-palas")
    if not html:
        return None
    links = extract_links(html)
    product_url = find_product_link(links, marca, modelo, "https://www.bullpadel.com")
    if not product_url:
        return None
    time.sleep(0.5)
    prod_html = fetch_html(product_url)
    return extract_og_image(prod_html)

def search_head(marca, modelo, anio):
    """Head.com padel rackets."""
    # Try direct URL pattern
    slug = re.sub(r'[^a-z0-9-]', '-', modelo.lower()).strip('-')
    slug = re.sub(r'-+', '-', slug)
    urls_to_try = [
        f"https://www.head.com/en/sports/padel/padel-racquets/{slug}/",
        f"https://www.head.com/en_GB/sport/padel/padel-rackets/{slug}/",
        "https://www.head.com/en/sports/padel/padel-racquets/",
        "https://www.head.com/en_GB/sport/padel/padel-rackets/",
    ]
    for url in urls_to_try:
        html = fetch_html(url)
        if not html:
            continue
        links = extract_links(html)
        product_url = find_product_link(links, marca, modelo, "https://www.head.com")
        if product_url:
            time.sleep(0.5)
            prod_html = fetch_html(product_url)
            img = extract_og_image(prod_html)
            if img:
                return img
        og = extract_og_image(html)
        if og and slug in og.lower():
            return og
    return None

def search_babolat(marca, modelo, anio):
    """Babolat padel rackets."""
    url = "https://www.babolat.com/en/padel/padel-rackets/"
    html = fetch_html(url)
    if not html:
        return None
    links = extract_links(html)
    product_url = find_product_link(links, marca, modelo, "https://www.babolat.com")
    if not product_url:
        # Try search
        query = urllib.parse.quote(modelo)
        html2 = fetch_html(f"https://www.babolat.com/en/search?q={query}")
        if html2:
            links = extract_links(html2)
            product_url = find_product_link(links, marca, modelo, "https://www.babolat.com")
    if not product_url:
        return None
    time.sleep(0.5)
    prod_html = fetch_html(product_url)
    return extract_og_image(prod_html)

def search_nox(marca, modelo, anio):
    """Nox-padel.com Shopify store."""
    # Try Shopify products.json
    data = None
    for domain in ["nox-padel.com", "www.noxpadel.com"]:
        try:
            r = S.get(f"https://{domain}/products.json?limit=250", timeout=10)
            if r.status_code == 200:
                data = r.json()
                break
        except:
            pass
    if data and data.get("products"):
        query = normalize(modelo)
        best_score = 0
        best_img = None
        for p in data["products"]:
            title = normalize(p.get("title", ""))
            score = similarity(query, title)
            if score > best_score:
                best_score = score
                imgs = p.get("images", [])
                best_img = imgs[0].get("src") if imgs else None
        if best_score > 0.35 and best_img:
            return best_img
    # Fallback: catalog page
    html = fetch_html("https://nox-padel.com/collections/padel-rackets")
    if not html:
        html = fetch_html("https://www.noxpadel.com/en/palas/")
    if html:
        links = extract_links(html)
        product_url = find_product_link(links, marca, modelo, "https://nox-padel.com")
        if product_url:
            time.sleep(0.5)
            prod_html = fetch_html(product_url)
            return extract_og_image(prod_html)
    return None

def search_adidas(marca, modelo, anio):
    """Adidas padel section."""
    query = urllib.parse.quote(f"adidas {modelo} padel")
    html = fetch_html(f"https://www.adidas.es/buscar?q={query}&start=0&sz=24")
    if not html:
        html = fetch_html("https://www.adidas.es/padel-palas")
    if html:
        links = extract_links(html)
        product_url = find_product_link(links, marca, modelo, "https://www.adidas.es")
        if product_url:
            time.sleep(0.5)
            prod_html = fetch_html(product_url)
            return extract_og_image(prod_html)
    return None

def search_siux(marca, modelo, anio):
    """Siux.es Shopify."""
    for domain in ["siux.es", "www.siux.es"]:
        try:
            r = S.get(f"https://{domain}/products.json?limit=250", timeout=10)
            if r.status_code == 200:
                data = r.json()
                if data.get("products"):
                    query = normalize(modelo)
                    best_score = 0
                    best_img = None
                    for p in data["products"]:
                        title = normalize(p.get("title", ""))
                        score = similarity(query, title)
                        if score > best_score:
                            best_score = score
                            imgs = p.get("images", [])
                            best_img = imgs[0].get("src") if imgs else None
                    if best_score > 0.3 and best_img:
                        return best_img
                break
        except:
            pass
    html = fetch_html("https://siux.es/collections/palas-de-padel")
    if html:
        links = extract_links(html)
        product_url = find_product_link(links, marca, modelo, "https://siux.es")
        if product_url:
            time.sleep(0.5)
            prod_html = fetch_html(product_url)
            return extract_og_image(prod_html)
    return None

def search_starvie(marca, modelo, anio):
    """StarVie padel."""
    for domain in ["starvie.com", "www.starvie.com"]:
        try:
            r = S.get(f"https://{domain}/products.json?limit=250", timeout=10)
            if r.status_code == 200:
                data = r.json()
                if data.get("products"):
                    query = normalize(modelo)
                    best_score = 0
                    best_img = None
                    for p in data["products"]:
                        title = normalize(p.get("title", ""))
                        score = similarity(query, title)
                        if score > best_score:
                            best_score = score
                            imgs = p.get("images", [])
                            best_img = imgs[0].get("src") if imgs else None
                    if best_score > 0.3 and best_img:
                        return best_img
                break
        except:
            pass
    return None

def search_wilson(marca, modelo, anio):
    """Wilson padel rackets."""
    html = fetch_html("https://www.wilson.com/en-us/padel/padel-rackets")
    if not html:
        html = fetch_html("https://www.wilson.com/es-es/padel/palas-de-padel")
    if html:
        links = extract_links(html)
        product_url = find_product_link(links, marca, modelo, "https://www.wilson.com")
        if product_url:
            time.sleep(0.5)
            prod_html = fetch_html(product_url)
            return extract_og_image(prod_html)
    return None

def search_dunlop(marca, modelo, anio):
    """Dunlop padel."""
    html = fetch_html("https://www.dunlopsport.com/es/padel/palas/")
    if not html:
        html = fetch_html("https://www.dunlopsport.com/en/padel/padel-rackets/")
    if html:
        links = extract_links(html)
        product_url = find_product_link(links, marca, modelo, "https://www.dunlopsport.com")
        if product_url:
            time.sleep(0.5)
            prod_html = fetch_html(product_url)
            return extract_og_image(prod_html)
    return None

def search_generic_shopify(domains, marca, modelo):
    """Generic Shopify search across a list of domains."""
    for domain in domains:
        try:
            r = S.get(f"https://{domain}/products.json?limit=250", timeout=10)
            if r.status_code == 200:
                data = r.json()
                if data.get("products"):
                    query = normalize(f"{marca} {modelo}")
                    best_score = 0
                    best_img = None
                    for p in data["products"]:
                        title = normalize(p.get("title", ""))
                        marca_words = [w for w in marca.lower().split() if len(w) > 2]
                        if not any(w in title for w in marca_words):
                            continue
                        score = similarity(query, title)
                        if score > best_score:
                            best_score = score
                            imgs = p.get("images", [])
                            best_img = imgs[0].get("src") if imgs else None
                    if best_score > 0.35 and best_img:
                        return best_img
        except:
            pass
    return None

def search_generic_catalog(catalog_url, marca, modelo, base_url):
    """Generic catalog search."""
    html = fetch_html(catalog_url)
    if not html:
        return None
    links = extract_links(html)
    product_url = find_product_link(links, marca, modelo, base_url)
    if not product_url:
        return None
    time.sleep(0.5)
    prod_html = fetch_html(product_url)
    return extract_og_image(prod_html)

# ─── Brand router ─────────────────────────────────────────────────────────

GENERIC_RETAILERS = [
    "www.padelreference.com",
    "www.padel-pro.fr",
    "www.padelsport.es",
    "www.elitepadelshop.com",
    "padelziel.com",
    "www.padelkorner.com",
]

def find_image(marca, modelo, anio):
    m = marca.lower()

    if "bullpadel" in m:
        img = search_bullpadel(marca, modelo, anio)
        if img: return img

    elif "head" in m:
        img = search_head(marca, modelo, anio)
        if img: return img

    elif "babolat" in m:
        img = search_babolat(marca, modelo, anio)
        if img: return img

    elif "nox" in m:
        img = search_nox(marca, modelo, anio)
        if img: return img

    elif "adidas" in m:
        img = search_adidas(marca, modelo, anio)
        if img: return img

    elif "siux" in m:
        img = search_siux(marca, modelo, anio)
        if img: return img

    elif "starvie" in m or "star vie" in m:
        img = search_starvie(marca, modelo, anio)
        if img: return img

    elif "wilson" in m:
        img = search_wilson(marca, modelo, anio)
        if img: return img

    elif "dunlop" in m:
        img = search_dunlop(marca, modelo, anio)
        if img: return img

    elif "drop shot" in m or "dropshot" in m:
        img = search_generic_catalog(
            "https://www.dropshot.es/palas/",
            marca, modelo, "https://www.dropshot.es"
        )
        if img: return img

    elif "joma" in m:
        img = search_generic_catalog(
            "https://www.joma.com/es/padel/palas.html",
            marca, modelo, "https://www.joma.com"
        )
        if img: return img

    elif "varlion" in m:
        img = search_generic_catalog(
            "https://varlion.com/es/palas/",
            marca, modelo, "https://varlion.com"
        )
        if img: return img

    elif "vibora" in m or "víbora" in m:
        img = search_generic_shopify(["vibora.es", "www.vibora.es"], marca, modelo)
        if img: return img

    elif "akkeron" in m:
        img = search_generic_shopify(["akkeron.com", "www.akkeron.com"], marca, modelo)
        if img: return img

    elif "black crown" in m:
        img = search_generic_catalog(
            "https://www.blackcrownpadel.com/en/palas/",
            marca, modelo, "https://www.blackcrownpadel.com"
        )
        if img: return img

    elif "tecnifibre" in m:
        img = search_generic_catalog(
            "https://www.tecnifibre.com/es/padel/palas/",
            marca, modelo, "https://www.tecnifibre.com"
        )
        if img: return img

    elif "royal padel" in m:
        img = search_generic_shopify(["royalpadel.com", "www.royalpadel.com"], marca, modelo)
        if img: return img

    # Fallback: generic Spanish retailers
    img = search_generic_shopify(GENERIC_RETAILERS, marca, modelo)
    return img

def main():
    conn = psycopg2.connect(DB_URL)
    cur = conn.cursor()

    cur.execute(
        "SELECT id, slug, marca, modelo, anio FROM palas "
        "WHERE imagen_principal IS NULL AND publicada = true "
        "ORDER BY marca, modelo"
    )
    palas = cur.fetchall()
    print(f"🔍 {len(palas)} palas sin foto\n")

    found = 0
    not_found = []

    for (pala_id, slug, marca, modelo, anio) in palas:
        print(f"  → {marca} {modelo} {anio}", end="", flush=True)

        img_url = find_image(marca, modelo, anio)
        if not img_url:
            print(f" ✗")
            not_found.append(f"{marca} {modelo} {anio}")
            continue

        # Clean URL
        img_url_clean = img_url.split("?")[0]
        ext = os.path.splitext(img_url_clean)[1].lower()
        if ext not in (".jpg", ".jpeg", ".png", ".webp", ".avif"):
            ext = ".jpg"

        filename = f"{safe_filename(marca, modelo)}{ext}"
        dest = os.path.join(OUT_DIR, filename)

        if os.path.exists(dest) or download_image(img_url, dest):
            web_path = f"/palas/{filename}"
            cur.execute(
                "UPDATE palas SET imagen_principal = %s WHERE id = %s",
                (web_path, pala_id)
            )
            conn.commit()
            print(f" ✓ {img_url[:60]}...")
            found += 1
        else:
            print(f" ✗ (download fail)")
            not_found.append(f"{marca} {modelo} {anio}")

        time.sleep(0.3)

    cur.close()
    conn.close()

    print(f"\n✅ {found}/{len(palas)} imágenes encontradas")
    if not_found:
        print(f"\n❌ Sin imagen ({len(not_found)}):")
        for p in not_found:
            print(f"  - {p}")

if __name__ == "__main__":
    main()
