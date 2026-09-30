"""Inventory the live smecoilandgas.com: URLs, PDFs and images.

§9 of the Technical Master wants every production URL exported before launch,
"HTML pages, PDFs, images receiving traffic/backlinks and indexed legacy
URLs". The redirect map was built from the XML sitemap alone; this walks the
site itself to find what the sitemap leaves out.

Polite: one request at a time, a pause between them, a normal user agent, and
a hard cap on pages.
"""
import collections
import gzip
import io
import json
import re
import sys
import time
import urllib.error
import urllib.parse
import urllib.request

HOST = "smecoilandgas.com"
ORIGIN = f"https://{HOST}"
UA = "Mozilla/5.0 (compatible; SMEC-migration-audit/1.0; site owner authorised)"
MAX_PAGES = 220
PAUSE = 0.4

seen_pages = {}
assets = collections.defaultdict(set)  # url -> pages referencing it
queue = collections.deque()
queued = set()


def get(url, method="GET"):
    request = urllib.request.Request(url, method=method, headers={"User-Agent": UA})
    try:
        with urllib.request.urlopen(request, timeout=25) as response:
            raw = response.read() if method == "GET" else b""
            if response.headers.get("Content-Encoding") == "gzip":
                raw = gzip.decompress(raw)
            return response.status, response.headers.get("Content-Type", ""), raw, response.url
    except urllib.error.HTTPError as exc:
        return exc.code, exc.headers.get("Content-Type", "") if exc.headers else "", b"", url
    except Exception as exc:  # DNS, TLS, timeout
        return 0, str(exc)[:60], b"", url


def normalise(href, base):
    if not href or href.startswith(("mailto:", "tel:", "javascript:", "#", "data:")):
        return None
    url = urllib.parse.urljoin(base, href)
    parts = urllib.parse.urlsplit(url)
    if parts.netloc.replace("www.", "") != HOST:
        return None
    return urllib.parse.urlunsplit(("https", HOST, parts.path, parts.query, ""))


def push(url):
    if url and url not in queued and len(queued) < MAX_PAGES * 3:
        queued.add(url)
        queue.append(url)


# ---------------------------------------------------------------- sitemaps
sitemap_urls = set()
to_read = [f"{ORIGIN}/sitemap_index.xml", f"{ORIGIN}/sitemap.xml", f"{ORIGIN}/wp-sitemap.xml"]
read = set()
while to_read:
    sm = to_read.pop()
    if sm in read:
        continue
    read.add(sm)
    status, ctype, body, _ = get(sm)
    if status != 200:
        continue
    text = body.decode("utf-8", "replace")
    children = re.findall(r"<sitemap>.*?<loc>(.*?)</loc>", text, re.S)
    to_read.extend(children)
    sitemap_urls.update(re.findall(r"<url>.*?<loc>(.*?)</loc>", text, re.S))
    time.sleep(PAUSE)

print(f"sitemaps read: {len(read & set())} | URLs in sitemaps: {len(sitemap_urls)}")

for url in sitemap_urls:
    push(normalise(url, ORIGIN))
push(ORIGIN + "/")

# ------------------------------------------------------------------- crawl
while queue and len(seen_pages) < MAX_PAGES:
    url = queue.popleft()
    status, ctype, body, final = get(url)
    seen_pages[url] = {"status": status, "type": ctype.split(";")[0]}
    time.sleep(PAUSE)

    if status != 200 or "html" not in ctype:
        continue

    html = body.decode("utf-8", "replace")
    for href in re.findall(r'href="([^"]+)"', html):
        target = normalise(href, url)
        if not target:
            continue
        if re.search(r"\.(pdf|docx?|xlsx?|zip|dwg)(\?|$)", target, re.I):
            assets[target].add(url)
        elif re.search(r"\.(png|jpe?g|webp|gif|svg)(\?|$)", target, re.I):
            assets[target].add(url)
        else:
            push(target)
    for src in re.findall(r'(?:src|data-src)="([^"]+)"', html):
        target = normalise(src, url)
        if target and re.search(r"\.(png|jpe?g|webp|gif|svg|pdf)(\?|$)", target, re.I):
            assets[target].add(url)

print(f"pages fetched: {len(seen_pages)} | asset URLs found: {len(assets)}")

json.dump(
    {
        "sitemap": sorted(sitemap_urls),
        "pages": seen_pages,
        "assets": {k: sorted(v) for k, v in assets.items()},
    },
    open((sys.argv[1] if len(sys.argv) > 1 else ".") + "/legacy-crawl.json", "w", encoding="utf-8"),
    indent=1,
)
print("wrote legacy-crawl.json")
