// scripts/alumni-image-mapping-copy.js
const fs = require('fs');
const path = require('path');

const projectRoot = process.cwd();
const alumniDataPath = path.join(projectRoot, 'src', 'data', 'alumni.ts');
const sourceImagesDir = path.join(projectRoot, 'reference', 'صور اليافعين الخريجين 2025-2026');
const publicAssetsDir = path.join(projectRoot, 'public', 'assets', 'alumni');

let alumniFileContent = fs.readFileSync(alumniDataPath, 'utf-8');
const alumniEntries = [];
const entryRegex = /{\s*id:\s*"(\w+)",\s*slug:\s*"([\w-]+)",[\s\S]*?name:\s*{\s*ar:\s*"([^\"]+)",[\s\S]*?portrait:\s*{\s*src:\s*"([^\"]+)"[\s\S]*?},/g;
let m;
while ((m = entryRegex.exec(alumniFileContent)) !== null) {
  const [, id, slug, nameAr, src] = m;
  alumniEntries.push({ id, slug, nameAr, src });
}

const sourceImages = fs.readdirSync(sourceImagesDir).filter(f => !f.startsWith('.'));
const normalize = str => str.toLowerCase().replace(/[\s_\-]+/g, '').replace(/\.[^.]+$/,'');

function nameTokens(name) {
  return name.split(/\s+/).map(t => normalize(t));
}

if (!fs.existsSync(publicAssetsDir)) {
  fs.mkdirSync(publicAssetsDir, { recursive: true });
}

const report = { matched: [], unmatched: [] };

alumniEntries.forEach(entry => {
  const tokens = nameTokens(entry.nameAr);
  let bestMatch = null;
  let bestScore = 0;
  sourceImages.forEach(img => {
    const norm = normalize(img);
    const score = tokens.reduce((s, t) => s + (norm.includes(t) ? 1 : 0), 0);
    if (score > bestScore) {
      bestScore = score;
      bestMatch = img;
    }
  });
  if (bestScore > 0 && bestMatch) {
    const ext = path.extname(bestMatch).toLowerCase();
    const targetFileName = `${entry.slug}${ext}`;
    const srcPath = path.join(sourceImagesDir, bestMatch);
    const destPath = path.join(publicAssetsDir, targetFileName);
    fs.copyFileSync(srcPath, destPath);
    const newSrc = `/assets/alumni/${targetFileName}`;
    const escapedOldSrc = entry.src.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&');
    const srcRegex = new RegExp(`portrait:\\s*{\\s*src:\\s*\"${escapedOldSrc}\"`);
    alumniFileContent = alumniFileContent.replace(srcRegex, `portrait: { src: \"${newSrc}\"`);
    report.matched.push({ alumni: entry.slug, file: bestMatch, newSrc });
  } else {
    report.unmatched.push(entry.slug);
  }
});

fs.writeFileSync(alumniDataPath, alumniFileContent, 'utf-8');
fs.writeFileSync(path.join(projectRoot, 'alumni_image_cleanup_report.json'), JSON.stringify(report, null, 2), 'utf-8');
console.log('Alumni image mapping copy completed.');
