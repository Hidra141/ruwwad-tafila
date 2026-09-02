const fs = require('fs');
let content = fs.readFileSync('scripts/alumni-journeys-output.ts', 'utf-8');

// Add import header
const header = 'import type { AlumniJourneyEntry } from "@/types";\n\n';

// Replace 'const journey_' with 'export const journey_'
content = content.replace(/^const journey_/gm, 'export const journey_');

// Remove the slug mapping comments at the end
const lines = content.split('\n');
const idx = lines.findIndex(l => l.startsWith('// Slug'));
if (idx > -1) content = lines.slice(0, idx).join('\n');

fs.writeFileSync('src/data/alumni-journeys.ts', header + content, 'utf-8');
console.log('Done! Created src/data/alumni-journeys.ts');
