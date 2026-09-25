# Directives & Contraintes d'Environnement — decouvrirlaguadeloupe.com

Ce document consigne l'architecture technique, les contraintes d'environnement, les directives de sécurité et les règles éditoriales pour le site **decouvrirlaguadeloupe.com** (decouvrirlaguadeloupe) hébergé sur Cloudflare Pages.

---

## 1. Identité & Environnement du Domaine

| Paramètre | Valeur pour ce site |
| :--- | :--- |
| **Domaine Apex** | `decouvrirlaguadeloupe.com` |
| **URL Cloudflare Pages** | `https://decouvrirlaguadeloupe.pages.dev` |
| **Dépôt GitHub** | `jc842/decouvrirlaguadeloupe` (branche principale : `main`) |
| **Framework** | Astro 5.x SSG pur (`output: 'static'`) |
| **Node.js requis** | `v20.18.0` (Astro 7+ et Node 22+ interdits sur cette machine) |
| **Tracker Analytics** | Matomo cookieless (`https://analytics.les4h.fr/`) |
| **Matomo Site ID** | `57` |
| **Matomo MTM Container** | `container_rzEEcHAG.js` (Container ID : `rzEEcHAG`) |
| **Serveur Publicitaire** | Revive Adserver (`https://ads.les4h.fr/`) |
| **Revive Affiliate ID** | `105` |
| **Zones Publicitaires** | Header (`643`), In-Content (`640`), Mobile Sticky (`644`), Large Rectangle (`642`), Half Page (`641`), Skyscraper (`645`) |

---

## 2. Contraintes Obligatoires pour Chaque Création de Nouvel Article

> [!CRITICAL]
> **RÈGLE FORMELLE : Tout nouvel article créé sur ce média (sous `src/content/blog/<slug>.md` ou via Keystatic CMS) DOIT OBLIGATOIREMENT respecter les contraintes suivantes :**

### A. Présence du Tracker Matomo MTM (Cookieless)
- Chaque article doit obligatoirement être encapsulé dans `src/layouts/Layout.astro`.
- Ce Layout injecte au build statique le composant `Matomo.astro` avec le conteneur MTM dédié : **`container_rzEEcHAG.js`**.
- Le tracking respecte l'exemption stricte CNIL (zéro cookie `_pk_id` / `_pk_ses`, anonymisation IP native, aucun bandeau de consentement intrusif requis).
- La configuration du tracker est scellée dans `src/config/site.config.ts`.

### B. Présence des IDs Ads Revive (Zéro ID en Dur)
- Tout article doit obligatoirement comporter les 2 emplacements publicitaires intégrés dans le gabarit (`src/pages/blog/[...slug].astro`) :
  1. **Encart In-Content (300x250)** : `<ReviveSlot slot="inContent" />` positionné après les premiers paragraphes (Zone 640).
  2. **Encart Fin d'Article (336x280)** : `<ReviveSlot slot="largeRectangle" />` positionné avant les suggestions de maillage (Zone 642).
- **Interdiction absolue** d'écrire des numéros de zone en dur dans les pages ou le Markdown. La résolution s'effectue dynamiquement via le fichier de configuration :
  👉 **`src/config/ads.config.ts`**
- Pour les articles longs (> 1500 mots), un encart supplémentaire peut être inséré : `<ReviveSlot slot="inContent" />` ou un encart sidebar `<ReviveSlot slot="halfPage" />`.
- L'auto-collapse est actif : si aucune campagne n'est programmée sur une zone, l'encart se replie sans afficher d'espace vide.

### C. Directive du Slash Final Canonique (Anti-Boucle Cloudflare)
- Cloudflare Pages redirige nativement `/blog/:slug` vers `/blog/:slug/` (code 308).
- **Règle absolue** : Tout lien interne ou redirection vers un article doit impérativement comporter le slash final (`/blog/${slug}/`).

### D. Qualité Éditoriale & SEO
- Zéro émojis résiduels ou séquences UTF-8 mal décodées dans le titre H1, le frontmatter ou les slugs.
- Déclaration obligatoire des métadonnées SEO Schema.org (`BlogPosting` ou `Article`).
- Génération automatique du sitemap avec slashs finals lors du build via `scripts/generate-sitemap.mjs`.
