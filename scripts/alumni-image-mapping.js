// scripts/alumni-image-mapping.js
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const projectRoot = process.cwd();
const alumniDataPath = path.join(projectRoot, 'src', 'data', 'alumni.ts');
const sourceImagesDir = path.join(projectRoot, 'reference', 'صور اليافعين الخريجين 2025-2026');
const publicAssetsDir = path.join(projectRoot, 'public', 'assets', 'alumni');

let alumniFileContent = fs.readFileSync(alumniDataPath, 'utf-8');
const alumniEntries = [];
// Extract id, slug, src, and Arabic name
const entryRegex = /{\s*id:\s*"(\w+)",\s*slug:\s*"([\w-]+)",[\s\S]*?name:\s*{\s*ar:\s*"([^\"]+)",[\s\S]*?portrait:\s*{\s*src:\s*"([^\"]+)"[\s\S]*?},/g;
let match;
while ((match = entryRegex.exec(alumniFileContent)) !== null) {
  const [, id, slug, nameAr, src] = match;
  alumniEntries.push({ id, slug, nameAr, src });
}

const sourceImages = fs.readdirSync(sourceImagesDir).filter(f => !f.startsWith('.'));
const normalize = str => str.toLowerCase().replace(/[\s_\-]+/g, '').replace(/\.[^.]+$/,'');
const report = { matched: [], unmatched: [], converted: [], errors: [] };
if (!fs.existsSync(publicAssetsDir)) {
  fs.mkdirSync(publicAssetsDir, { recursive: true });
}

alumniEntries.forEach(entry => {
  const slugNorm = normalize(entry.slug);
  const nameNorm = normalize(entry.nameAr);
  const possible = sourceImages.find(img => {
    const n = normalize(img);
    return n.includes(slugNorm) || n.includes(nameNorm);
  });
  if (possible) {
    const srcExt = path.extname(possible).toLowerCase();
    const targetFileName = `${entry.slug}.webp`;
    const targetPath = path.join(publicAssetsDir, targetFileName);
    try {
      if (srcExt === '.heic' || srcExt === '.heif') {
        sharp(path.join(sourceImagesDir, possible)).webp({ quality: 80 }).toFile(targetPath);
        report.converted.push({ alumni: entry.slug, from: possible, to: targetFileName });
      } else if (srcExt !== '.webp') {
        sharp(path.join(sourceImagesDir, possible)).webp({ quality: 80 }).toFile(targetPath);
        report.converted.push({ alumni: entry.slug, from: possible, to: targetFileName });
      } else {
        fs.copyFileSync(path.join(sourceImagesDir, possible), targetPath);
      }
      const escapedOldSrc = entry.src.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&');
      const srcRegex = new RegExp(`portrait:\\s*{\\s*src:\\s*\"${escapedOldSrc}\"`);
      const newSrc = `/assets/alumni/${targetFileName}`;
      alumniFileContent = alumniFileContent.replace(srcRegex, `portrait: { src: \"${newSrc}\"`);
      report.matched.push({ alumni: entry.slug, image: possible, newSrc });
    } catch (e) {
      report.errors.push({ alumni: entry.slug, error: e.message });
    }
  } else {
    report.unmatched.push(entry.slug);
  }
});

fs.writeFileSync(alumniDataPath, alumniFileContent, 'utf-8');
fs.writeFileSync(path.join(projectRoot, 'alumni_image_cleanup_report.json'), JSON.stringify(report, null, 2), 'utf-8');
console.log('Alumni image mapping completed.');
