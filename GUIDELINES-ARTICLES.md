# Directives Éditoriales & Emplacements Publicitaires Obligatoires

Ce document consigne les règles de monétisation et d'intégration publicitaire obligatoires pour chaque nouvel article créé sur **decouvrirlaguadeloupe.com**.

---

## 1. Principe Général : Zéro ID en Dur

La monétisation de ce site s'appuie sur le serveur autonome **Revive Adserver** (`https://ads.les4h.fr`, Éditeur ID `105`).
Tous les identifiants de zones Revive attribués à **decouvrirlaguadeloupe.com** sont centralisés dans le fichier de configuration :
👉 **`src/config/ads.config.ts`**

> **Règle absolue** : Il est strictement interdit d'écrire des numéros de zone Revive (ex: `zoneId={640}`) directement dans les articles Markdown, les templates Astro ou les composants. Tout appel d'emplacement publicitaire doit obligatoirement se faire via son identifiant sémantique (`slot`).

---

## 2. Emplacements Publicitaires Obligatoires par Article

Pour chaque nouvel article (créé sous `src/content/blog/<slug>.md` ou via l'interface Keystatic CMS), les emplacements publicitaires suivants sont obligatoirement activés :

| Emplacement (`slot`) | Format & Dimensions | Zone Revive Dédiée | Rôle & Positionnement |
| :--- | :--- | :---: | :--- |
| **`header`** | Leaderboard (728x90) | Zone 643 | Bannière haute injectée au-dessus ou sous le menu principal |
| **`inContent`** | Medium Rectangle (300x250) | Zone 640 | Encart contextuel inséré au milieu de l'article |
| **`largeRectangle`** | Large Rectangle (336x280) | Zone 642 | Encart de fin d'article inséré avant les articles recommandés |
| **`mobileSticky`** | Mobile Banner (320x100) | Zone 644 | Bandeau collant ancré en bas d'écran sur smartphone |
| **`halfPage`** | Half Page (300x600) | Zone 641 | Grand format pour colonne latérale (Sidebar desktop) |
| **`skyscraper`** | Skyscraper (160x600) | Zone 645 | Format vertical pour listing et dossiers thématiques |

---

## 3. Code Obligatoire dans le Gabarit d'Article (`src/pages/blog/[...slug].astro`)

Le gabarit universel enveloppe le contenu Markdown de chaque article avec les balises suivantes :

```astro
---
import ReviveSlot from '../../components/ads/ReviveSlot.astro';
---

<!-- Corps de l'article -->
<div class="prose max-w-none ...">
  <Content />
</div>

<!-- 1. Encart Pub In-Content Obligatoire (300x250) -->
<div class="my-12 py-6 border-y border-stone-200/80 flex justify-center">
  <ReviveSlot slot="inContent" />
</div>

<!-- 2. Encart Pub Fin d'Article Obligatoire (336x280) -->
<div class="my-8 p-4 bg-stone-50/60 rounded-2xl border border-stone-200/60 flex flex-col items-center justify-center text-center">
  <ReviveSlot slot="largeRectangle" />
</div>
```

---

## 4. Insertion Manuelle dans un Article Long (> 1500 mots)

Si un article approfondi nécessite un encart publicitaire supplémentaire dans une sous-section :
```astro
<ReviveSlot slot="inContent" />
```
Pour un encart latéral desktop (Sidebar) :
```astro
<ReviveSlot slot="halfPage" />
```

---

## 5. Masquage Automatique (Auto-Collapse)
Si aucune campagne active n'est planifiée dans Revive Adserver pour une zone donnée, le conteneur `.revive-slot-container` se replie automatiquement via l'écouteur d'événement Revive dans `Layout.astro`. Aucun encart vide ou message d'erreur n'apparaît aux lecteurs.
