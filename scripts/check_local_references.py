#!/usr/bin/env python3
"""Vérifie que tous les liens et images locaux référencés dans le site existent bien sur disque.

Contrairement à un validateur HTML classique, ce script inspecte aussi les fichiers
content/*.js : leur texte est injecté dans les pages par JavaScript (voir assets/js/include.js),
donc invisible pour un outil qui ne lirait que le HTML brut.

Les chemins écrits dans un fichier content/*.js doivent être relatifs à la page qui l'inclut
(via <script src=".../content/xxx.js">), pas au fichier content/*.js lui-même. Ce script repère
donc d'abord quelle page inclut quel fichier de contenu avant de vérifier ses références.
"""
import os
import re
import sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

SCAN_EXTENSIONS = (".html", ".js")
SKIP_DIRS = {".git", "node_modules", "scripts"}

REFERENCE_RE = re.compile(r'(?:src|href)=["\']([^"\']+)["\']')

IGNORED_PREFIXES = (
    "http://", "https://", "//", "mailto:", "tel:", "#", "javascript:",
)


def find_files_to_scan():
    for dirpath, dirnames, filenames in os.walk(ROOT):
        dirnames[:] = [d for d in dirnames if d not in SKIP_DIRS and not d.startswith(".")]
        for filename in filenames:
            if filename.endswith(SCAN_EXTENSIONS):
                yield os.path.join(dirpath, filename)


def build_content_include_map():
    """Associe chaque clé de contenu (ex: 'food') au dossier de la page HTML qui l'inclut."""
    include_map = {}
    for filepath in find_files_to_scan():
        if not filepath.endswith(".html"):
            continue
        with open(filepath, "r", encoding="utf-8") as f:
            content = f.read()
        file_dir = os.path.dirname(filepath)
        for match in REFERENCE_RE.finditer(content):
            reference = match.group(1)
            if "content/" in reference and reference.endswith(".js"):
                key = os.path.splitext(os.path.basename(reference))[0]
                include_map.setdefault(key, file_dir)
    return include_map


def resolve_base_dir(filepath, include_map):
    if filepath.endswith(".js") and os.path.basename(os.path.dirname(filepath)) == "content":
        key = os.path.splitext(os.path.basename(filepath))[0]
        if key in include_map:
            return include_map[key]
    return os.path.dirname(filepath)


def check_file(filepath, base_dir, errors):
    with open(filepath, "r", encoding="utf-8") as f:
        content = f.read()

    for match in REFERENCE_RE.finditer(content):
        reference = match.group(1)

        if reference.startswith(IGNORED_PREFIXES):
            continue

        # On ignore l'ancre (#xxx) éventuelle à la fin d'un lien comme "index.html#contact"
        path_part = reference.split("#", 1)[0]
        if not path_part:
            continue

        if path_part.startswith("/"):
            resolved = os.path.join(ROOT, path_part.lstrip("/"))
        else:
            resolved = os.path.join(base_dir, path_part)

        if not os.path.exists(resolved):
            rel_file = os.path.relpath(filepath, ROOT)
            errors.append(f"{rel_file}: référence introuvable « {reference} »")


def main():
    include_map = build_content_include_map()

    errors = []
    for filepath in find_files_to_scan():
        base_dir = resolve_base_dir(filepath, include_map)
        check_file(filepath, base_dir, errors)

    if errors:
        print("Références locales cassées détectées :\n")
        for error in errors:
            print(f"  - {error}")
        print(f"\n{len(errors)} problème(s) trouvé(s).")
        return 1

    print("Toutes les références locales (liens et images) sont valides.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
