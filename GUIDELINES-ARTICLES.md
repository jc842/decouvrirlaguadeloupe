# Directives Éditoriales & Contraintes d'Environnement — decouvrirlaguadeloupe.com

Ce document récapitule les directives d'environnement et de monétisation obligatoires pour toute création de nouvel article sur **decouvrirlaguadeloupe.com**.

---

## 1. Contraintes d'Environnement du Domaine

| Ressource | Identifiant & Paramètres |
| :--- | :--- |
| **Domaine** | `decouvrirlaguadeloupe.com` |
| **Tracker Analytics** | Matomo cookieless (`https://analytics.les4h.fr/`) |
| **Conteneur MTM** | `container_rzEEcHAG.js` (Site ID: `57`) |
| **Adserver Revive** | `https://ads.les4h.fr/` (Éditeur ID: `105`) |
| **Config Ads Dédiée** | `src/config/ads.config.ts` |

---

## 2. Règle Impérative : Tracker + IDs Ads sur Tout Nouvel Article

Pour chaque nouvel article rédigé dans `src/content/blog/` ou publié via l'interface Keystatic :

### A. Tracker Matomo (Automatique via Layout)
L'article doit impérativement être rendu par le gabarit `src/pages/blog/[...slug].astro` qui fait appel à `Layout.astro`.
Ce Layout compile au build statique la balise MTM :
```html
<script type="text/javascript" src="https://analytics.les4h.fr/js/container_rzEEcHAG.js" async defer></script>
```
Ce tracker est 100% cookieless, garantissant une conformité CNIL immédiate sans pop-up de cookies.

### B. Emplacements Publicitaires Dédiés (Zéro ID en Dur)
L'article doit contenir les deux encarts publicitaires suivants, résolus via `src/config/ads.config.ts` :

```astro
---
import ReviveSlot from '../../components/ads/ReviveSlot.astro';
---

<!-- Corps de l'article -->
<div class="prose max-w-none ...">
  <Content />
</div>

<!-- 1. Encart Pub In-Content Obligatoire (Medium Rectangle 300x250 - Zone 640) -->
<div class="my-12 py-6 border-y border-stone-200/80 flex justify-center">
  <ReviveSlot slot="inContent" />
</div>

<!-- 2. Encart Pub Fin d'Article Obligatoire (Large Rectangle 336x280 - Zone 642) -->
<div class="my-8 p-4 bg-stone-50/60 rounded-2xl border border-stone-200/60 flex flex-col items-center justify-center text-center">
  <ReviveSlot slot="largeRectangle" />
</div>
```

---

## 3. Inventaire des Zones Revive du Domaine

| Emplacement (`slot`) | Format | Zone ID | Positionnement |
| :--- | :--- | :---: | :--- |
| **`header`** | Leaderboard (728x90) | **643** | Haut de page / sous navigation |
| **`inContent`** | Medium Rectangle (300x250) | **640** | Milieu d'article contextuel |
| **`largeRectangle`** | Large Rectangle (336x280) | **642** | Fin d'article avant recommandations |
| **`mobileSticky`** | Mobile Banner (320x100) | **644** | Bandeau sticky bas d'écran mobile |
| **`halfPage`** | Half Page (300x600) | **641** | Sidebar desktop pour articles longs |
| **`skyscraper`** | Skyscraper (160x600) | **645** | Colonne latérale de listing / dossiers |

---

## 4. Checklist Avant Publication
- [ ] L'article utilise le Layout avec le tracker MTM actif (`rzEEcHAG`).
- [ ] Les 2 encarts publicitaires (`slot="inContent"` et `slot="largeRectangle"`) sont présents.
- [ ] Aucun numéro de zone n'est écrit en dur dans le Markdown ou le template.
- [ ] L'URL interne de l'article se termine bien par un slash (`/blog/:slug/`).
