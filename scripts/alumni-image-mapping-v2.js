// scripts/alumni-image-mapping-v2.js
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const projectRoot = process.cwd();
const alumniDataPath = path.join(projectRoot, 'src', 'data', 'alumni.ts');
const sourceImagesDir = path.join(projectRoot, 'reference', 'صور اليافعين الخريجين 2025-2026');
const publicAssetsDir = path.join(projectRoot, 'public', 'assets', 'alumni');

let alumniFileContent = fs.readFileSync(alumniDataPath, 'utf-8');

// Helper to normalize Arabic: remove diacritics and unify alef/ya/ta marbuta variations
function normalizeArabic(str) {
  return str
    .replace(/[أإآ]/g, 'ا')
    .replace(/ى/g, 'ي')
    .replace(/ة/g, 'ه')
    .replace(/ئ/g, 'ي')
    .replace(/ؤ/g, 'و')
    .replace(/[\s_\-]+/g, '')
    .toLowerCase();
}

function normalize(str) {
  // generic normalize for filenames (remove extension later)
  const name = str.replace(/\.[^.]+$/,''); // drop extension
  return normalizeArabic(name);
}

// Extract alumni entries (slug, Arabic name, current src)
const alumniEntries = [];
const entryRegex = /{\s*id:\s*"(\w+)",\s*slug:\s*"([\w-]+)",[\s\S]*?name:\s*{\s*ar:\s*"([^\"]+)",[\s\S]*?portrait:\s*{\s*src:\s*"([^\"]+)"[\s\S]*?},/g;
let m;
while ((m = entryRegex.exec(alumniFileContent)) !== null) {
  const [, id, slug, nameAr, src] = m;
  alumniEntries.push({ id, slug, nameAr, src });
}

const sourceImages = fs.readdirSync(sourceImagesDir).filter(f => !f.startsWith('.'));

if (!fs.existsSync(publicAssetsDir)) {
  fs.mkdirSync(publicAssetsDir, { recursive: true });
}

const report = { matched: [], unmatched: [], converted: [], errors: [] };

alumniEntries.forEach(entry => {
  const slugNorm = normalize(entry.slug);
  const nameNorm = normalizeArabic(entry.nameAr);
  // Find best match by scoring appearance of name tokens in filename
  const nameTokens = nameNorm.split('').filter(c => c); // simple char tokens
  let bestMatch = null;
  let bestScore = 0;
  sourceImages.forEach(img => {
    const norm = normalize(img);
    let score = 0;
    // token match: each token character present counts
    nameTokens.forEach(tok => {
      if (norm.includes(tok)) score++;
    });
    if (score > bestScore) {
      bestScore = score;
      bestMatch = img;
    }
  });
  if (bestMatch && bestScore > 0) {
    const srcExt = path.extname(bestMatch).toLowerCase();
    const targetFileName = `${entry.slug}.webp`;
    const targetPath = path.join(publicAssetsDir, targetFileName);
    try {
      if (srcExt === '.heic' || srcExt === '.heif') {
        sharp(path.join(sourceImagesDir, bestMatch)).webp({ quality: 80 }).toFile(targetPath);
        report.converted.push({ alumni: entry.slug, from: bestMatch, to: targetFileName });
      } else if (srcExt !== '.webp') {
        sharp(path.join(sourceImagesDir, bestMatch)).webp({ quality: 80 }).toFile(targetPath);
        report.converted.push({ alumni: entry.slug, from: bestMatch, to: targetFileName });
      } else {
        fs.copyFileSync(path.join(sourceImagesDir, bestMatch), targetPath);
      }
      const escapedOldSrc = entry.src.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&');
      const srcRegex = new RegExp(`portrait:\\s*{\\s*src:\\s*\"${escapedOldSrc}\"`);
      const newSrc = `/assets/alumni/${targetFileName}`;
      alumniFileContent = alumniFileContent.replace(srcRegex, `portrait: { src: \"${newSrc}\"`);
      report.matched.push({ alumni: entry.slug, image: bestMatch, newSrc });
    } catch (e) {
      report.errors.push({ alumni: entry.slug, error: e.message });
    }
  } else {
    report.unmatched.push(entry.slug);
  }
});

fs.writeFileSync(alumniDataPath, alumniFileContent, 'utf-8');
fs.writeFileSync(path.join(projectRoot, 'alumni_image_cleanup_report.json'), JSON.stringify(report, null, 2), 'utf-8');
console.log('Alumni image mapping v2 completed.');
