export interface SiteConfig {
  name: string;
  domain: string;
  url: string;
  description: string;
  repo: string;
  i18n: { defaultLocale: string; locales: string[]; prefixDefaultLocale: boolean; };
  theme: { style: string; fontFamily: string; colorScheme: string; };
  matomo: { url: string; siteId: string; containerId?: string; };
  revive: { reviveId: string; scriptUrl: string; zones: Record<string, { zoneId: number; format: string }>; };
  legal: { editor: string; address: string; contactEmail: string; hostName: string; hostAddress: string; };
}

export const siteConfig: SiteConfig = {
  name: "Découvrir la Guadeloupe",
  domain: "decouvrirlaguadeloupe.com",
  url: "https://decouvrirlaguadeloupe.com",
  description: "Guide d'évasion, randonnées, cascades secrètes, plages paradisiaques et patrimoine créole en Guadeloupe.",
  repo: "jc842/decouvrirlaguadeloupe",

  i18n: {
    defaultLocale: "fr",
    locales: ["fr", "en", "es"],
    prefixDefaultLocale: false,
  },

  theme: {
    style: "lexington-editorial",
    fontFamily: "sans",
    colorScheme: "emerald",
  },

  matomo: {
    url: "https://analytics.les4h.fr/",
    siteId: "57",
    containerId: "rzEEcHAG",
  },

  revive: {
    reviveId: "ac119b122a644588953c74c4c1daee06",
    scriptUrl: "//ads.les4h.fr/www/delivery/asyncjs.php",
    zones: {
      mobileSticky: { zoneId: 644, format: "mobileBanner" },
      inContent: { zoneId: 640, format: "mediumRectangle" },
      header: { zoneId: 643, format: "leaderboard" },
      halfPage: { zoneId: 641, format: "halfPage" },
      largeRectangle: { zoneId: 642, format: "largeRectangle" },
      skyscraper: { zoneId: 645, format: "skyscraper" },
    },
  },

  legal: {
    editor: "Éditeur indépendant",
    address: "Guadeloupe / France",
    contactEmail: "contact@decouvrirlaguadeloupe.com",
    hostName: "Cloudflare Pages & Hetzner",
    hostAddress: "Union Européenne",
  },
};
