import fs from 'fs';

const redirectsFile = 'd:/projets/PBN/decouvrirlaguadeloupe/public/_redirects';

const slugMap = {
  'activite-famille-decouvrirlaguadeloupe-2': 'vacances-famille-guadeloupe-plages-jardins-zoos',
  'activite-famille-decouvrirlaguadeloupe-3': 'activites-ludiques-educatives-famille-guadeloupe',
  'activite-famille-decouvrirlaguadeloupe': 'guadeloupe-en-famille-guide-activites-enfants',
  'agenda-evenement-decouvrirlaguadeloupe-2': 'fetes-traditionnelles-animations-culturelles-guadeloupe',
  'agenda-evenement-decouvrirlaguadeloupe-3': 'agenda-culturel-evenements-musicaux-antilles',
  'agenda-evenement-decouvrirlaguadeloupe-4': 'marches-locaux-foires-fetes-patronales-guadeloupe',
  'agenda-evenement-decouvrirlaguadeloupe': 'carnaval-festivals-guadeloupe-calendrier-evenements',
  'fiche-randonnee-decouvrirlaguadeloupe-2': 'sentiers-balises-foret-tropicale-guadeloupe-a-pied',
  'fiche-randonnee-decouvrirlaguadeloupe-3': 'randonnees-cascades-traces-panoramas-volcaniques-guadeloupe',
  'fiche-randonnee-decouvrirlaguadeloupe': 'guide-randonnees-guadeloupe-soufriere-chutes-du-carbet',
  'guide-activite-nautique-decouvrirlaguadeloupe-2': 'sports-nautiques-sensations-fortes-lagons-guadeloupe',
  'guide-activite-nautique-decouvrirlaguadeloupe-3': 'plongee-snorkeling-reserve-cousteau-recifs-guadeloupe',
  'guide-activite-nautique-decouvrirlaguadeloupe-4': 'excursions-mer-sorties-bateau-iles-cayes-guadeloupe',
  'guide-activite-nautique-decouvrirlaguadeloupe-5': 'voile-croisiere-naviguer-archipel-guadeloupe',
  'guide-activite-nautique-decouvrirlaguadeloupe-6': 'kitesurf-planche-a-voile-meilleurs-spots-guadeloupe',
  'guide-activite-nautique-decouvrirlaguadeloupe-7': 'peche-au-gros-sorties-nautiques-guadeloupe',
  'guide-activite-nautique-decouvrirlaguadeloupe-8': 'canyonisme-randonnee-aquatique-rivieres-basse-terre',
  'guide-activite-nautique-decouvrirlaguadeloupe': 'activites-nautiques-kayak-paddle-mangrove-guadeloupe',
  'site-naturel-decouvrirlaguadeloupe-2': 'joyaux-sauvages-reserves-falaises-guadeloupe',
  'site-naturel-decouvrirlaguadeloupe-3': 'panoramas-espaces-naturels-proteges-tresors-verts-guadeloupe',
  'site-naturel-decouvrirlaguadeloupe': 'plus-beaux-sites-naturels-guadeloupe-volcan-cascades'
};

// Sort entries by oldSlug length descending
const sortedEntries = Object.entries(slugMap).sort((a, b) => b[0].length - a[0].length);

let lines = fs.readFileSync(redirectsFile, 'utf8').split('\n');
const fixedLines = [];

for (const line of lines) {
  let trimmed = line.trim();
  if (!trimmed) continue;
  if (trimmed.startsWith('#')) {
    fixedLines.push(trimmed);
    continue;
  }
  const parts = trimmed.split(/\s+/);
  let src = parts[0];
  let target = parts[1];
  let code = parts[2] || '301';

  // Fix target if it has corrupted /-number/
  for (const [oldSlug, newSlug] of sortedEntries) {
    if (src.includes(oldSlug)) {
      target = `/blog/${newSlug}/`;
      break;
    }
  }

  // Ensure trailing slash
  if (!target.endsWith('/')) {
    target += '/';
  }

  fixedLines.push(`${src}  ${target}  ${code}`);
}

// Ensure all old slugs are covered
for (const [oldSlug, newSlug] of sortedEntries) {
  const variations = [
    `/f0-9f-8f-84-${oldSlug}`,
    `/f0-9f-8f-84-${oldSlug}/`,
    `/blog/f0-9f-8f-84-${oldSlug}`,
    `/blog/f0-9f-8f-84-${oldSlug}/`,
    `/${oldSlug}`,
    `/${oldSlug}/`,
    `/blog/${oldSlug}`,
    `/blog/${oldSlug}/`
  ];

  for (const v of variations) {
    const existingIndex = fixedLines.findIndex(l => l.startsWith(`${v} `));
    const rule = `${v}  /blog/${newSlug}/  301`;
    if (existingIndex >= 0) {
      fixedLines[existingIndex] = rule;
    } else {
      fixedLines.push(rule);
    }
  }
}

// Actualite redirect
const actRules = [
  '/actualite  /blog/  301',
  '/actualite/  /blog/  301'
];
for (const r of actRules) {
  const prefix = r.split(/\s+/)[0];
  const idx = fixedLines.findIndex(l => l.startsWith(`${prefix} `));
  if (idx >= 0) fixedLines[idx] = r;
  else fixedLines.push(r);
}

fs.writeFileSync(redirectsFile, fixedLines.join('\n') + '\n', 'utf8');
console.log('Fixed _redirects with exact semantic mappings.');
