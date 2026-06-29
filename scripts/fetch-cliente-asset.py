#!/usr/bin/env python3
"""
fetch-cliente-asset.py — busca logo + cores de cliente a partir de @ IG OU URL site.

Fontes:
  - @<instagram>: usa scrape_profile.py da skill instagram-intel (Apify, type=details).
                  Pega profile pic + bio + posts pra inferir cor.
  - http(s)://...: scraping leve com requests/BeautifulSoup buscando:
                   * og:image / og:logo
                   * favicon
                   * <img alt="logo">
                   * cor dominante do header CSS.

Saída:
  - Salva candidatos em /tmp/cliente-<slug>-*.png
  - Imprime sugestão de paleta via extract-paleta
  - Snippet pra rodar wizard-cliente com asset baixado

Uso:
  python fetch-cliente-asset.py --ig sigadoma --slug doma
  python fetch-cliente-asset.py --url https://rentauto.com.br --slug rentauto
"""
import argparse, sys, subprocess, json, re
from pathlib import Path
from urllib.parse import urlparse

PLUGIN = Path(__file__).resolve().parent.parent
PROJECT = PLUGIN.parent.parent.parent
INSTAGRAM_SKILL = PROJECT / ".claude" / "skills" / "instagram-intel"
def venv_python(project: Path) -> Path | None:
    v = project / ".venv-instagram"
    for rel in ("Scripts/python.exe", "Scripts/python", "bin/python3", "bin/python"):
        p = v / rel
        if p.exists():
            return p
    return None


VENV = venv_python(PROJECT)
EXTRACT_PALETA = PLUGIN / "scripts" / "extract-paleta.py"


def fetch_from_ig(handle, slug):
    """Usa scrape_profile da instagram-intel pra pegar profile pic."""
    scrape = INSTAGRAM_SKILL / "scripts" / "scrape_profile.py"
    if not scrape.exists() or not VENV or not VENV.exists():
        print(f"[ERRO] instagram-intel ou venv não disponível em {INSTAGRAM_SKILL}")
        return None

    url = f"https://instagram.com/{handle.lstrip('@')}"
    print(f"==> Scraping {url} via Apify (details)…")
    out_dir = PROJECT / "instagram" / "data"
    out_dir.mkdir(parents=True, exist_ok=True)

    r = subprocess.run([
        str(VENV), str(scrape),
        "--url", url, "--type", "details"
    ], capture_output=True, text=True, cwd=PROJECT)

    if r.returncode != 0:
        print(f"[ERRO] scrape falhou: {r.stderr[:200]}")
        return None

    # Achar JSON gerado (mais recente)
    jsons = sorted(out_dir.glob(f"*{handle}*details*.json"), key=lambda p: -p.stat().st_mtime)
    if not jsons:
        print("[ERRO] JSON details não encontrado")
        return None
    data = json.loads(jsons[0].read_text())
    profile_pic = data[0].get("profilePicUrlHD") or data[0].get("profilePicUrl") if isinstance(data, list) else None
    if not profile_pic:
        print("[ERRO] profilePicUrl não disponível no JSON")
        return None

    out = Path(f"/tmp/cliente-{slug}-logo.jpg")
    import urllib.request
    urllib.request.urlretrieve(profile_pic, out)
    print(f"✅ Logo IG baixado: {out}")
    return out


def fetch_from_url(url, slug):
    """Scraping leve do site cliente."""
    try:
        import urllib.request
        from html.parser import HTMLParser
    except ImportError:
        print("[ERRO] stdlib não disponível"); return None

    class LogoHunter(HTMLParser):
        def __init__(self):
            super().__init__()
            self.candidates = []
            self.favicon = None
            self.og_image = None
        def handle_starttag(self, tag, attrs):
            d = dict(attrs)
            if tag == "meta" and d.get("property") == "og:image":
                self.og_image = d.get("content")
            elif tag == "link" and "icon" in (d.get("rel") or ""):
                self.favicon = d.get("href")
            elif tag == "img":
                src = d.get("src", "")
                alt = (d.get("alt", "") or "").lower()
                if "logo" in alt or "logo" in src.lower():
                    self.candidates.append(src)

    print(f"==> Scraping {url}…")
    try:
        req = urllib.request.Request(url, headers={"User-Agent": "marketing-doma-fetcher/0.1"})
        html = urllib.request.urlopen(req, timeout=10).read().decode("utf-8", errors="ignore")
    except Exception as e:
        print(f"[ERRO] fetch URL: {e}"); return None

    hunter = LogoHunter()
    hunter.feed(html)

    parsed = urlparse(url)
    base = f"{parsed.scheme}://{parsed.netloc}"

    def abs_url(u):
        if u.startswith("http"): return u
        if u.startswith("//"): return parsed.scheme + ":" + u
        if u.startswith("/"): return base + u
        return base + "/" + u

    # Prioridade: og:image > favicon > primeiro <img logo>
    candidates = []
    if hunter.og_image: candidates.append(abs_url(hunter.og_image))
    if hunter.favicon: candidates.append(abs_url(hunter.favicon))
    candidates.extend(abs_url(c) for c in hunter.candidates[:3])

    if not candidates:
        print("[ERRO] nenhum logo detectado no HTML")
        return None

    # Baixar 1º
    out = Path(f"/tmp/cliente-{slug}-logo.png")
    print(f"    candidatos: {len(candidates)}. Tentando 1º: {candidates[0][:80]}")
    try:
        req = urllib.request.Request(candidates[0], headers={"User-Agent": "marketing-doma-fetcher/0.1"})
        with urllib.request.urlopen(req, timeout=10) as resp:
            out.write_bytes(resp.read())
        print(f"✅ Logo baixado: {out}")
        return out
    except Exception as e:
        print(f"[ERRO] download: {e}"); return None


def extract_paleta_e_sugere(logo_path):
    """Roda extract-paleta.py em modo JSON."""
    r = subprocess.run([
        sys.executable, str(EXTRACT_PALETA),
        "--input", str(logo_path), "--n", "3", "--ignore-black", "--json"
    ], capture_output=True, text=True)
    if r.returncode != 0:
        print(f"[ERRO] extract-paleta: {r.stderr[:100]}")
        return None
    return json.loads(r.stdout)


def main():
    p = argparse.ArgumentParser()
    p.add_argument("--ig", help="@ do Instagram (ex: sigadoma)")
    p.add_argument("--url", help="URL do site (ex: https://rentauto.com.br)")
    p.add_argument("--slug", required=True, help="slug do cliente pra naming")
    args = p.parse_args()

    if not args.ig and not args.url:
        print("[ERRO] --ig OU --url obrigatório"); sys.exit(1)

    logo = fetch_from_ig(args.ig, args.slug) if args.ig else fetch_from_url(args.url, args.slug)
    if not logo:
        sys.exit(1)

    paleta = extract_paleta_e_sugere(logo)
    if paleta:
        print(f"\n==> Paleta detectada:")
        for c in paleta["palette"]:
            print(f"   {c['hex']}  (rgb {c['rgb']}, {c['pct']}%)")
        print(f"\n💡 Sugestão pra --cor: {paleta['suggested_card_bg']}")

    print(f"\n==> Próximo passo — rodar wizard-cliente:")
    print(f"python scripts/wizard-cliente.py \\")
    print(f"  --logo {logo} \\")
    print(f"  --nome {args.slug} \\")
    print(f"  --cidade '<Cidade>/<UF>' \\")
    print(f"  --cor {paleta['suggested_card_bg'] if paleta else '#???'}")


if __name__ == "__main__":
    main()
