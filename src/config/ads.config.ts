/**
 * Configuration publicitaire Revive Adserver pour le domaine decouvrirlaguadeloupe.com
 * Source : Inventaire ads.les4h.fr (Affiliate ID 105)
 */

export interface AdZoneConfig {
  zoneId: number;
  format: 'leaderboard' | 'mediumRectangle' | 'mobileBanner' | 'largeRectangle' | 'halfPage' | 'skyscraper';
  width: number;
  height: number;
  name: string;
}

export type AdSlotKey =
  | 'header'
  | 'inContent'
  | 'mobileSticky'
  | 'largeRectangle'
  | 'halfPage'
  | 'skyscraper';

export interface DomainAdsConfig {
  domain: string;
  affiliateId: number;
  reviveId: string;
  scriptUrl: string;
  zones: Record<AdSlotKey, AdZoneConfig>;
}

export const adsConfig: DomainAdsConfig = {
  domain: 'decouvrirlaguadeloupe.com',
  affiliateId: 105,
  reviveId: 'ac119b122a644588953c74c4c1daee06',
  scriptUrl: '//ads.les4h.fr/www/delivery/asyncjs.php',
  zones: {
    header: {
      zoneId: 643,
      format: 'leaderboard',
      width: 728,
      height: 90,
      name: 'Leaderboard 728x90',
    },
    inContent: {
      zoneId: 640,
      format: 'mediumRectangle',
      width: 300,
      height: 250,
      name: 'Medium Rectangle 300x250',
    },
    mobileSticky: {
      zoneId: 644,
      format: 'mobileBanner',
      width: 320,
      height: 100,
      name: 'Mobile Banner 320x100',
    },
    largeRectangle: {
      zoneId: 642,
      format: 'largeRectangle',
      width: 336,
      height: 280,
      name: 'Large Rectangle 336x280',
    },
    halfPage: {
      zoneId: 641,
      format: 'halfPage',
      width: 300,
      height: 600,
      name: 'Half Page 300x600',
    },
    skyscraper: {
      zoneId: 645,
      format: 'skyscraper',
      width: 160,
      height: 600,
      name: 'Skyscraper 160x600',
    },
  },
};

export default adsConfig;
