// scripts/cleanup-alumni-images.js
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const sharp = require('sharp');
const { fileTypeFromBuffer } = require('file-type');

const referenceDir = path.resolve('d:/ruwwad_f/reference/صور اليافعين الخريجين 2025-2026');
const assetsDir = path.resolve('d:/ruwwad_f/public/assets/alumni');
const alumniDataPath = path.resolve('d:/ruwwad_f/src/data/alumni.ts');

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

function normalizeName(name) {
  // remove spaces, underscores, hyphens, extension, make lower case
  return name.replace(/[_\s.-]+/g, '').toLowerCase();
}

async function runCleanup() {
  const files = walk(referenceDir);
  const report = {
    totalFiles: files.length,
    heic: [],
    jpg: [],
    png: [],
    webp: [],
    withoutExt: [],
    corrupted: [],
    duplicates: [],
    mapping: {}, // filename -> info
    unmatched: [],
    missingAlumniImages: [],
    convertedCount: 0,
  };
  const hashMap = {};

  for (const filePath of files) {
    const buffer = fs.readFileSync(filePath);
    const type = await fileTypeFromBuffer(buffer);
    const ext = type ? type.ext : '';
    const mime = type ? type.mime : 'unknown';
    const baseName = path.basename(filePath);
    const nameNoExt = path.parse(baseName).name;
    const normalized = normalizeName(nameNoExt);
    if (!ext) report.withoutExt.push(baseName);
    if (mime === 'image/heic' || mime === 'image/heif') {
      report.heic.push(baseName);
    } else if (mime === 'image/jpeg') {
      report.jpg.push(baseName);
    } else if (mime === 'image/png') {
      report.png.push(baseName);
    } else if (mime === 'image/webp') {
      report.webp.push(baseName);
    }
    let metadata = null;
    try {
      metadata = await sharp(buffer).metadata();
    } catch (e) {
      report.corrupted.push(baseName);
      continue;
    }
    const hash = crypto.createHash('sha256').update(buffer).digest('hex');
    if (hashMap[hash]) {
      report.duplicates.push({ original: hashMap[hash], duplicate: baseName });
    } else {
      hashMap[hash] = baseName;
    }
    report.mapping[baseName] = { mime, ext, width: metadata.width, height: metadata.height, path: filePath, normalized };
  }

  // Load alumni data
  const alumniContent = fs.readFileSync(alumniDataPath, 'utf8');
  const alumniLines = alumniContent.split(/\r?\n/);
  const updatedLines = [...alumniLines];
  const usedFiles = new Set();

  function replaceSrc(lineIdx, newSrc) {
    const line = updatedLines[lineIdx];
    const replaced = line.replace(/src:\s*"[^"]+"/, `src: "${newSrc}"`);
    updatedLines[lineIdx] = replaced;
  }

  for (let i = 0; i < alumniLines.length; i++) {
    if (alumniLines[i].includes('id:')) {
      const idMatch = alumniLines[i].match(/id:\s*"([^"]+)"/);
      if (!idMatch) continue;
      const id = idMatch[1];
      let srcIdx = -1;
      for (let j = i; j < Math.min(i + 10, alumniLines.length); j++) {
        if (alumniLines[j].includes('src:')) { srcIdx = j; break; }
      }
      if (srcIdx === -1) continue;
      const candidate = Object.entries(report.mapping).find(([fname, info]) => normalizeName(fname.replace(/\.[^/.]+$/, '')) === normalizeName(id));
      if (candidate) {
        const [origName, info] = candidate;
        const targetExt = (info.mime === 'image/heic' || info.mime === 'image/heif') ? 'webp' : info.ext;
        const targetFileName = `${id}.${targetExt}`;
        const targetPath = path.join(assetsDir, targetFileName);
        if (!fs.existsSync(targetPath)) {
          fs.mkdirSync(assetsDir, { recursive: true });
          if (info.mime === 'image/heic' || info.mime === 'image/heif') {
            await sharp(info.path).toFormat('webp').toFile(targetPath);
            report.convertedCount++;
          } else {
            fs.copyFileSync(info.path, targetPath);
          }
        }
        const newSrc = `/assets/alumni/${targetFileName}`;
        replaceSrc(srcIdx, newSrc);
        usedFiles.add(targetFileName);
      } else {
        report.missingAlumniImages.push(id);
      }
    }
  }

  fs.writeFileSync(alumniDataPath, updatedLines.join('\n'), 'utf8');

  for (const fname of Object.keys(report.mapping)) {
    const normalized = normalizeName(fname.replace(/\.[^/.]+$/, ''));
    const possible = [
      `${normalized}.png`,
      `${normalized}.jpg`,
      `${normalized}.jpeg`,
      `${normalized}.webp`
    ];
    if (!possible.some(p => usedFiles.has(p))) {
      report.unmatched.push(fname);
    }
  }

  const reportPath = path.resolve('d:/ruwwad_f/alumni_image_report.json');
  fs.writeFileSync(reportPath, JSON.stringify(report, null, 2), 'utf8');
  console.log('Report written to', reportPath);
}

runCleanup().catch(err => { console.error('Error:', err); process.exit(1); });
