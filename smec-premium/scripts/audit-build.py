"""Audit the built site against the Technical Master's pre-launch QA list.

Runs over `.next/server/app` after a build, so it checks what is actually
served rather than what the source intends. Every check is a line from §26,
§31 or §34, and the failures it produced the first time it ran are in the
history of this repo.

    npm run build && python scripts/audit-build.py
"""
import json
import pathlib
import re
import sys
from collections import defaultdict

ROOT = pathlib.Path(__file__).resolve().parent.parent
BUILD = ROOT / ".next/server/app"

pages = {}  # url -> html
for f in BUILD.rglob("*.html"):
    rel = f.relative_to(BUILD).as_posix()[: -len(".html")]
    url = "/" if rel == "index" else f"/{rel}/"
    if rel.startswith("_"):  # Next's own error routes, not site URLs
        continue
    pages[url] = f.read_text(encoding="utf-8", errors="replace")

print(f"built pages: {len(pages)}")


def one(pattern, html, group=1):
    m = re.search(pattern, html, re.S)
    return m.group(group) if m else None


def report(label, bad, total=None, sample=6):
    head = f"{'PASS' if not bad else 'FAIL'}  {label}"
    if total is not None:
        head += f"  ({len(bad)} of {total})"
    print(head)
    for b in list(bad)[:sample]:
        print("        ", b)
    if len(bad) > sample:
        print(f"         … and {len(bad) - sample} more")


print("\n--- §26 one H1, title, meta, canonical ---")
no_h1, many_h1, no_title, no_desc, no_canon, mismatch = [], [], [], [], [], []
titles, canon_of = defaultdict(list), {}
for url, html in pages.items():
    h1s = re.findall(r"<h1[\s>]", html)
    if not h1s:
        no_h1.append(url)
    elif len(h1s) > 1:
        many_h1.append(f"{url}  ({len(h1s)})")
    t = one(r"<title>(.*?)</title>", html)
    if not t:
        no_title.append(url)
    else:
        titles[t].append(url)
    if not one(r'<meta name="description" content="(.*?)"', html):
        no_desc.append(url)
    c = one(r'rel="canonical" href="([^"]+)"', html)
    if not c:
        no_canon.append(url)
    else:
        canon_of[url] = c
        if not c.endswith(url):
            mismatch.append(f"{url}  ->  {c}")

report("every page has exactly one H1", no_h1 + many_h1, len(pages))
report("every page has a title", no_title, len(pages))
report("every page has a meta description", no_desc, len(pages))
report("every page has a canonical", no_canon, len(pages))
report("canonical matches the page's own URL", mismatch, len(pages))
report("titles are unique", [f"{t!r}: {u}" for t, u in titles.items() if len(u) > 1])

print("\n--- §8/§26 robots, sitemap, indexation ---")
robots = (BUILD / "robots.txt.body").read_text(encoding="utf-8") if (BUILD / "robots.txt.body").exists() else ""
print("PASS  robots.txt references the sitemap" if "sitemap" in robots.lower() else "FAIL  robots.txt has no sitemap line")
sitemap = (BUILD / "sitemap.xml.body").read_text(encoding="utf-8") if (BUILD / "sitemap.xml.body").exists() else ""
sitemap_urls = {re.sub(r"https?://[^/]+", "", u) for u in re.findall(r"<loc>(.*?)</loc>", sitemap)}
noindexed = {u for u, h in pages.items() if re.search(r'name="robots" content="noindex', h)}
print(f"      sitemap: {len(sitemap_urls)} URLs | noindex pages: {len(noindexed)}")
report("no noindex page is in the sitemap", sorted(sitemap_urls & noindexed))
report("every sitemap URL was built", sorted(u for u in sitemap_urls if u not in pages), len(sitemap_urls))
report(
    "every indexable built page is in the sitemap",
    sorted(u for u in pages if u not in noindexed and u not in sitemap_urls),
    len(pages),
)

print("\n--- §31 required hubs ---")
hubs = ["/industries/", "/industries/onshore/", "/customers/", "/solutions/", "/products/", "/digital/", "/resources/", "/company/"]
report("all locked hubs exist, are indexable and are in the sitemap",
       [h for h in hubs if h not in pages or h in noindexed or h not in sitemap_urls], len(hubs))

print("\n--- §26 structured data ---")
bad_json, faq_mismatch, empty_graph = [], [], []
for url, html in pages.items():
    for block in re.findall(r'<script type="application/ld\+json">(.*?)</script>', html, re.S):
        try:
            data = json.loads(block)
        except Exception as exc:
            bad_json.append(f"{url}: {exc}")
            continue
        for node in data.get("@graph", [data]):
            if node.get("@type") == "FAQPage":
                visible = html.count("<summary")
                if len(node.get("mainEntity", [])) > visible:
                    faq_mismatch.append(f"{url}: {len(node['mainEntity'])} in schema, {visible} visible")
report("every JSON-LD block parses", bad_json)
report("FAQ schema never exceeds the visible questions", faq_mismatch)

print("\n--- §2/§19 orphans and contextual links ---")
# Links inside <main> only: navigation and footer are global, not contextual.
inbound = defaultdict(set)
for url, html in pages.items():
    body = one(r"<main[^>]*>(.*)</main>", html) or ""
    for href in set(re.findall(r'href="(/[^"#?]*)"', body)):
        if href != url:
            inbound[href].add(url)

commercial = [u for u in pages if re.match(r"^/(products|solutions|digital|industries|customers|markets)/.+", u)]
orphans = sorted(u for u in commercial if len(inbound[u]) == 0)
thin = sorted(u for u in commercial if 0 < len(inbound[u]) < 2)
report("no commercial page is an orphan", orphans, len(commercial))
report("every commercial page has 2+ contextual inbound links", thin, len(commercial))

print("\n--- §5/§26 images ---")
missing_alt, missing_dims = [], []
for url, html in pages.items():
    for tag in re.findall(r"<img[^>]*>", html):
        if "alt=" not in tag:
            missing_alt.append(f"{url}: {tag[:80]}")
        if not ("width=" in tag and "height=" in tag) and "fill" not in tag:
            if 'style="' in tag and "absolute" in tag:
                continue  # next/image fill sets its own box
            missing_dims.append(f"{url}: {tag[:80]}")
report("every img has an alt attribute", missing_alt)
report("every img reserves its space (width/height or fill)", missing_dims)

print("\n--- §34/§19 leaked editorial notes and placeholder tokens ---")
NOTES = [
    r"Publication control", r"Website treatment", r"Developer copy", r"^Placement\b",
    r"Locked Content Decision", r"RFQ fields", r"Profile fields", r"Suggested MD themes",
    r"Content structure", r"Technical specification fields",
]
leaked = []
for url, html in pages.items():
    body = one(r"<main[^>]*>(.*)</main>", html) or ""
    text = re.sub(r"<[^>]+>", " ", body)
    for note in NOTES:
        if re.search(note, text, re.I):
            leaked.append(f"{url}: {note}")
report("no internal editorial note is rendered", leaked)

# The answer block is the first thing a reader sees; it gets its own check.
instructions = []
for url, html in pages.items():
    m = re.search(r'class="[^"]*answer[^"]*">(.*?)</p>', html, re.S)
    answer = re.sub(r"<[^>]+>", "", m.group(1)).strip() if m else ""
    if re.search(r"^(publish|use only|do not|keep|render|write|avoid|maintain)", answer, re.I) or re.search(
        r"should (be presented|be searchable|include|establish|attract|show|state)|reviewed by engineering", answer, re.I
    ):
        instructions.append(f"{url}: {answer[:70]}")
report("no answer block is written to the developer", instructions)

tokens = []
for url, html in pages.items():
    body = re.sub(r"<[^>]+>", " ", one(r"<main[^>]*>(.*)</main>", html) or "")
    for token in ["DOMAIN", "VERIFIED", "TBD", "Lorem ipsum", "placeholder"]:
        if re.search(rf"\b{token}\b", body):
            tokens.append(f"{url}: {token}")
report("no DOMAIN / VERIFIED / TBD token on a page", tokens)

print("\n--- §31 navigation lock ---")
nav = (ROOT / "lib/navigation.ts").read_text(encoding="utf-8")
top_nav_src = nav[nav.index("export const TOP_NAV") :]
built_nav = re.findall(r"label: '([^']+)'", top_nav_src)
locked = ["Industries & Markets", "By Customer", "Solutions", "Products", "Digital", "Resources", "Company", "Contact / RFQ"]
print("      locked order:", " | ".join(locked))
print("      built order: ", " | ".join(built_nav))
print(f"{'PASS' if len(built_nav) == len(locked) else 'FAIL'}  top-level item count ({len(built_nav)} built, {len(locked)} locked)")
