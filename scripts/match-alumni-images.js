// scripts/match-alumni-images.js
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');
const { fileTypeFromFile } = require('file-type');

const alumniPath = path.resolve('d:/ruwwad_f/src/data/alumni.ts');
const imagesDir = path.resolve('d:/ruwwad_f/reference/صور اليافعين الخريجين 2025-2026');

function normalizeArabic(str) {
  // remove spaces, underscores, dashes, diacritics, punctuation, normalize Arabic letters
  return str.replace(/[\s_\-]+/g, '').replace(/[\u064B-\u065F]/g, '').trim();
}

function extractAlumni() {
  const content = fs.readFileSync(alumniPath, 'utf8');
  const alumni = [];
  const lines = content.split(/\r?\n/);
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].includes('id:')) {
      const idMatch = lines[i].match(/id:\s*"([^"]+)"/);
      const slugMatch = lines[i].match(/slug:\s*"([^"]+)"/);
      const nameArMatch = lines.slice(i, i + 6).join('\n').match(/name:\s*\{\s*ar:\s*"([^\"]+)"/);
      const portraitSrcMatch = lines.slice(i, i + 12).join('\n').match(/src:\s*"([^"]+)"/);
      const cohortMatch = lines.slice(i, i + 8).join('\n').match(/cohort:\s*cohorts\[\"([^\"]+)\"\]/);
      alumni.push({
        id: idMatch ? idMatch[1] : null,
        slug: slugMatch ? slugMatch[1] : null,
        nameAr: nameArMatch ? nameArMatch[1] : null,
        portraitSrc: portraitSrcMatch ? portraitSrcMatch[1] : null,
        cohort: cohortMatch ? cohortMatch[1] : null,
      });
    }
  }
  return alumni;
}

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    const full = path.join(dir, file);
    const stat = fs.statSync(full);
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(full));
    } else {
      results.push(full);
    }
  });
  return results;
}

async function analyzeImages() {
  const files = walk(imagesDir);
  const images = [];
  for (const filePath of files) {
    const base = path.basename(filePath);
    const typeInfo = await fileTypeFromFile(filePath);
    const mime = typeInfo ? typeInfo.mime : 'unknown';
    const ext = typeInfo ? typeInfo.ext : path.extname(filePath).replace(/^\./, '').toLowerCase();
    let meta = null;
    try { meta = await sharp(filePath).metadata(); } catch (e) { meta = null; }
    images.push({
      filePath,
      fileName: base,
      ext,
      mime,
      width: meta ? meta.width : null,
      height: meta ? meta.height : null,
      isHEIC: mime === 'image/heic' || mime === 'image/heif',
      arabicNameRaw: path.parse(base).name,
    });
  }
  return images;
}

function match(alumni, images) {
  const matches = [];
  const unmatchedImages = [];
  const missingAlumni = [];

  const usedImages = new Set();

  for (const alum of alumni) {
    const normAlum = normalizeArabic(alum.nameAr || '');
    const candidates = images.filter(img => normalizeArabic(img.arabicNameRaw) === normAlum);
    if (candidates.length === 1) {
      const img = candidates[0];
      matches.push({
        sourceFile: img.fileName,
        alumniName: alum.nameAr,
        alumniId: alum.id,
        confidence: 'HIGH',
        action: 'MATCH',
        imageInfo: img,
      });
      usedImages.add(img.fileName);
    } else if (candidates.length > 1) {
      matches.push({
        sourceFile: candidates.map(c => c.fileName).join(' | '),
        alumniName: alum.nameAr,
        alumniId: alum.id,
        confidence: 'AMBIGUOUS',
        action: 'MANUAL_REVIEW',
        imageInfo: candidates,
      });
      candidates.forEach(c => usedImages.add(c.fileName));
    } else {
      missingAlumni.push({ alumniName: alum.nameAr, alumniId: alum.id });
    }
  }

  // images not assigned to any alumni
  for (const img of images) {
    if (!usedImages.has(img.fileName)) {
      unmatchedImages.push({ fileName: img.fileName, reason: 'No Arabic name match to any alumni' });
    }
  }

  return { matches, unmatchedImages, missingAlumni };
}

(async () => {
  const alumni = extractAlumni();
  const images = await analyzeImages();
  const { matches, unmatchedImages, missingAlumni } = match(alumni, images);
  const report = {
    totalAlumni: alumni.length,
    totalImages: images.length,
    matches,
    unmatchedImages,
    missingAlumni,
  };
  const outPath = path.resolve('d:/ruwwad_f/alumni_mapping_report.json');
  fs.writeFileSync(outPath, JSON.stringify(report, null, 2), 'utf8');
  console.log('Alumni mapping report written to', outPath);
})();
