# Nilikaa Cantina — Site vitrine

## Contexte du projet

Site vitrine pour **Nilikaa Cantina**, un foodtruck. Le site doit rester le plus simple possible, à la fois techniquement et en termes de maintenance : à terme, il sera modifié directement par le propriétaire du foodtruck (non-développeur), soit à la main sur GitHub, soit en discutant avec Claude Code.

Toute décision technique doit privilégier la simplicité et la facilité de prise en main plutôt que la sophistication.

## Objectifs du site

1. **Présentation du foodtruck** : histoire, type de cuisine, charte graphique, photos.
2. **Formulaire de contact / demande de devis** (traiteur, événements, etc.).
3. **Blog** : articles simples pensés pour améliorer le référencement (SEO) dans le temps.

## Stack technique

- **HTML/CSS/JS statique**, sans framework ni étape de build (au moins dans un premier temps).
- Le contenu (textes, images) vit **dans le repo**, dans des fichiers/dossiers séparés du code, pour rester éditable par une personne non-développeuse.
- Hébergement : **GitHub Pages**, avec nom de domaine personnalisé **nilikaa-cantina-foodtruck.fr** (acheté chez OVHcloud).
- **CI/CD GitHub Actions** (`.github/workflows/ci.yml`) : vérifie le site (liens cassés, images manquantes, HTML valide) sur chaque pull request, puis déploie automatiquement sur GitHub Pages à chaque merge sur `main`.

## Feuille de route

- [x] **Étape 1** : créer une version HTML type satisfaisante (structure des pages, sections, style de base) avec du contenu d'exemple.
- [x] **Étape 2** : choisir et mettre en place l'hébergement définitif (GitHub Pages + domaine nilikaa-cantina-foodtruck.fr).
- [x] **Étape 3** : mettre en place la CI (vérifications + déploiement automatique).
- [ ] Formulaire de contact/devis : le site étant statique, il faudra un service tiers (ex. Formspree, ou fonctionnalité native de l'hébergeur) — à trancher à l'étape 2.
- [ ] Structurer le blog pour que l'ajout d'un article soit trivial (un fichier = un article).

## Structure du repo

```
/index.html                      landing page (structure + sections vides remplies par JS)
/blog.html                         page listant les articles de blog
/blog/<article>.html               une page HTML par article de blog
/content/                          TOUS les textes éditables, un fichier .js par texte
  presentation.js                  section "Le foodtruck" (histoire)
  food.js                          section "Notre cuisine"
  prestation.js                    section "Prestations"
  contact.js                       section "Contact" + formulaire de devis
  blog-intro.js                    texte d'intro de la page blog
  blog-<article>.js                contenu d'un article de blog
/photos/                           photos fournies par le propriétaire (logo, foodtruck, plats...)
/assets/css/style.css              mise en page (à ne pas mélanger avec le contenu)
/assets/js/include.js              injecte le contenu de /content/*.js dans les pages + gère l'envoi du devis
/scripts/check_local_references.py vérifie que tous les liens/images locaux référencés existent (utilisé par la CI)
/.github/workflows/ci.yml          vérifications + déploiement automatique sur GitHub Pages
/CNAME                             nom de domaine personnalisé pour GitHub Pages (nilikaa-cantina-foodtruck.fr)
```

`index.html`, `blog.html` et les pages de `/blog/` contiennent des `<section data-include="xxx">` vides. Chaque page
charge d'abord les fichiers `content/*.js` correspondants (via `<script src="content/xxx.js">`), qui déposent leur
texte dans `window.NILIKAA_CONTENT.xxx`, puis `assets/js/include.js` copie ce texte dans la section au chargement.

Chaque fichier `content/*.js` contient une chaîne de texte HTML entre backticks (`` ` ``) : c'est la seule partie à
modifier. Ne pas utiliser le caractère `` ` `` ni la séquence `${` dans le texte.

**Pour modifier un texte du site, il suffit d'éditer le fichier correspondant dans `/content/`, jamais les fichiers
HTML de structure.** Ce choix (scripts classiques plutôt que `fetch()`) permet d'ouvrir `index.html` en double-clic,
sans serveur local.

### Ajouter un article de blog

1. Dupliquer `/blog/premier-article.html` en `/blog/mon-article.html` (adapter `<title>`/`<meta description>` et le
   `<script src="../content/...">` qui pointe vers le bon fichier de contenu).
2. Dupliquer `/content/blog-premier-article.js` en `/content/blog-mon-article.js`, changer la clé
   (`window.NILIKAA_CONTENT['blog-mon-article']`) et écrire le texte.
3. Ajouter un `<li>` dans `/blog.html` pointant vers `/blog/mon-article.html`.

### Formulaire de devis (v1)

Le formulaire de contact (`content/contact.js`) est géré en pur JavaScript côté client (`assets/js/include.js`) :
à l'envoi, il construit un lien `mailto:` pré-rempli vers **chellitkahina@yahoo.com** et l'ouvre dans le client mail
du visiteur. Aucune donnée n'est envoyée à un service tiers, aucun compte externe requis — solution volontairement
minimale pour la v1. Limite connue : nécessite que le visiteur ait un client mail configuré. Si besoin d'une
solution plus robuste plus tard (ex. Formspree, Netlify Forms), ce sera à décider à l'étape 2 (hébergement).

### Prévisualiser le site en local

Aucun serveur requis : ouvrir directement `index.html` (ou `blog.html`) en double-clic dans un navigateur.

### Hébergement, domaine et CI/CD

Le site est hébergé sur **GitHub Pages**, avec le nom de domaine personnalisé **nilikaa-cantina-foodtruck.fr** (acheté chez
OVHcloud). Le fichier `/CNAME` (contenant juste `nilikaa-cantina-foodtruck.fr`) indique ce domaine à GitHub Pages — ne pas le
supprimer.

Le déploiement est automatisé par `.github/workflows/ci.yml` :
- Sur chaque **pull request** vers `main` : le workflow vérifie que tous les liens/images locaux existent
  (`scripts/check_local_references.py`) et que le HTML est valide (`html5validator`). Si une vérification échoue,
  la pull request est bloquée.
- Sur chaque **merge sur `main`** : les mêmes vérifications tournent, puis le site est publié automatiquement sur
  GitHub Pages.

Le nom de domaine (chez OVHcloud) est totalement indépendant du compte GitHub : si le repo est un jour transféré
vers un autre compte GitHub, il suffira de renseigner à nouveau `nilikaa-cantina-foodtruck.fr` dans les réglages Pages du
repo (Settings → Pages → Custom domain) ; aucune modification DNS chez OVHcloud n'est nécessaire.

**Réglages GitHub à faire une seule fois (manuellement, dans l'interface GitHub) :**
1. Settings → Pages → Build and deployment → Source : choisir **GitHub Actions** (pas "Deploy from a branch").
2. Settings → Pages → Custom domain : renseigner `nilikaa-cantina-foodtruck.fr`, puis cocher **Enforce HTTPS** une fois le
   certificat généré par GitHub (peut prendre quelques heures après la configuration DNS).

**Réglages DNS à faire une seule fois chez OVHcloud (zone DNS du domaine nilikaa-cantina-foodtruck.fr) :**
- 4 enregistrements **A** sur la racine du domaine (`@`), pointant vers les IP de GitHub Pages :
  `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
- 1 enregistrement **CNAME** pour `www` pointant vers `stageamp.github.io.`

⚠️ **Piège OVH : l'option "hébergement gratuit"** attachée au nom de domaine configure automatiquement la zone DNS
pour pointer vers les serveurs d'hébergement OVH, ce qui empêche GitHub Pages de vérifier le domaine (erreur
`NotServedByPagesError`). Le site n'utilisant pas cet hébergement OVH (tout est sur GitHub Pages), il faut :
1. Dans l'espace client OVH → Web Cloud → Hébergements : détacher/supprimer l'hébergement associé à ce domaine.
2. Dans Web Cloud → Noms de domaine → nilikaa-cantina-foodtruck.fr → Zone DNS : supprimer les enregistrements A/CNAME
   créés automatiquement par l'hébergement, puis ajouter les 4 A + le CNAME `www` listés ci-dessus.
3. Attendre la propagation DNS (généralement quelques minutes à quelques heures, parfois plus pour un domaine tout
   juste créé) avant que GitHub Pages ne revalide le domaine automatiquement.

## Conventions pour le contenu éditable

- Le texte et les images destinés à être modifiés par le propriétaire doivent être isolés dans des fichiers dédiés (pas mélangés au milieu du HTML de mise en page), avec des noms de fichiers/dossiers explicites.
- Privilégier des formats simples à éditer à la main (HTML simple, Markdown, ou JSON/texte brut) plutôt que des structures imbriquées complexes.
- Éviter le jargon technique dans les commentaires destinés à guider les futures modifications de contenu.

## Notes pour Claude Code

- Garder chaque étape petite et vérifiable : ne pas ajouter de build tools, CMS ou dépendances non demandés.
- Avant de proposer une techno (hébergeur, service de formulaire, générateur de blog...), privilégier l'option la plus simple à maintenir sans compétences dev, et vérifier avec l'utilisateur si plusieurs options sérieuses existent.
- Ce fichier doit être mis à jour au fur et à mesure que les décisions (hébergement, service de formulaire, structure définitive) sont prises.
