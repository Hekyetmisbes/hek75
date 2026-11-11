// scripts/optimize-assets.mjs
// Lossless / High-fidelity image optimization for core portfolio assets using Sharp

import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

async function optimizeCoreAssets() {
  console.log('🖼  Optimizing core portfolio image assets...');

  // 1. Emre.png (Portrait) -> 400x400 (retina 2x-3x for 140x140 display)
  const emrePath = path.resolve('public/assets/Emre.png');
  const emreWebpPath = path.resolve('public/assets/Emre.webp');
  if (fs.existsSync(emrePath)) {
    const emreBuf = fs.readFileSync(emrePath);
    await sharp(emreBuf)
      .resize(400, 400, { fit: 'cover' })
      .webp({ quality: 90 })
      .toFile(emreWebpPath);

    await sharp(emreBuf)
      .resize(400, 400, { fit: 'cover' })
      .png({ compressionLevel: 9, quality: 90 })
      .toFile(emrePath + '.tmp');

    fs.renameSync(emrePath + '.tmp', emrePath);
    console.log(`✔ Emre.png optimized: 4.75 MB -> ${(fs.statSync(emrePath).size / 1024).toFixed(1)} KB (WebP: ${(fs.statSync(emreWebpPath).size / 1024).toFixed(1)} KB)`);
  }

  // 2. All 9 Game Logos (16:9 thumbnails, max width 800 for 380px display)
  const gameLogos = [
    'ribbon-bloom-logo.png',
    'tiny-tide-harbor-logo.png',
    'final_loop_logo.png',
    'fog-bridge-logo.png',
    'unlit_door_logo.png',
    'delivery-drive-logo.png',
    'platform-logo.png',
    'flag-quiz-logo.png',
    'movidle-logo.png'
  ];

  for (const name of gameLogos) {
    const filePath = path.resolve(`public/assets/${name}`);
    if (fs.existsSync(filePath)) {
      const origSize = fs.statSync(filePath).size;
      const buf = fs.readFileSync(filePath);
      const meta = await sharp(buf).metadata();
      
      const targetWidth = Math.min(800, meta.width || 800);
      const targetHeight = Math.round(targetWidth * ((meta.height || 450) / (meta.width || 800)));

      // Generate WebP alongside
      const webpName = name.replace(/\.png$/, '.webp');
      const webpPath = path.resolve(`public/assets/${webpName}`);
      await sharp(buf)
        .resize(targetWidth, targetHeight)
        .webp({ quality: 85 })
        .toFile(webpPath);

      // Optimize PNG
      await sharp(buf)
        .resize(targetWidth, targetHeight)
        .png({ compressionLevel: 9, quality: 85 })
        .toFile(filePath + '.tmp');

      fs.renameSync(filePath + '.tmp', filePath);
      const newSize = fs.statSync(filePath).size;
      console.log(`✔ ${name} optimized: ${(origSize / 1024 / 1024).toFixed(2)} MB -> ${(newSize / 1024).toFixed(1)} KB (WebP: ${(fs.statSync(webpPath).size / 1024).toFixed(1)} KB)`);
    }
  }

  console.log('✅ Core image optimization complete.');
}

optimizeCoreAssets().catch((err) => {
  console.error('Image optimization failed:', err);
  process.exit(1);
});
