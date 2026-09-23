export const REVIVE_CONFIG = {
  id: 'ac119b122a644588953c74c4c1daee06',
  scriptUrl: '//ads.les4h.fr/www/delivery/asyncjs.php',
} as const;

export const AD_FORMATS = {
  halfPage: {
    id: 'half-page',
    name: 'Half Page 625Custom',
    width: 300,
    height: 600,
  },
  largeRectangle: {
    id: 'large-rectangle',
    name: 'Large Rectangle',
    width: 336,
    height: 280,
  },
  leaderboard: {
    id: 'leaderboard',
    name: 'Leaderboard 626IAB Leaderboard',
    width: 728,
    height: 90,
  },
  mediumRectangle: {
    id: 'medium-rectangle',
    name: 'Medium Rectangle 627IAB Medium Rectangle',
    width: 300,
    height: 250,
  },
  mobileBanner: {
    id: 'mobile-banner',
    name: 'Mobile Banner 623Custom',
    width: 320,
    height: 100,
  },
  skyscraper: {
    id: 'skyscraper',
    name: 'Skyscraper 622IAB Wide Skyscraper',
    width: 160,
    height: 600,
  },
} as const;

export type AdFormatKey = keyof typeof AD_FORMATS;