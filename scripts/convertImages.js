const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

async function convertToWebP(inputPath, outputPath) {
  try {
    await sharp(inputPath)
      .webp({ quality: 85, effort: 6 })
      .toFile(outputPath);
    console.log(`Converted: ${inputPath} -> ${outputPath}`);
  } catch (error) {
    console.error(`Error converting ${inputPath}:`, error.message);
  }
}

async function processDirectory(dirPath) {
  const items = fs.readdirSync(dirPath);
  
  for (const item of items) {
    const itemPath = path.join(dirPath, item);
    const stat = fs.statSync(itemPath);
    
    if (stat.isDirectory()) {
      await processDirectory(itemPath);
    } else if (stat.isFile()) {
      const ext = path.extname(item).toLowerCase();
      if (['.jpg', '.jpeg', '.png'].includes(ext)) {
        const webpPath = itemPath.replace(/\.(jpg|jpeg|png)$/i, '.webp');
        await convertToWebP(itemPath, webpPath);
      }
    }
  }
}

async function main() {
  const publicDir = path.join(__dirname, '..', 'public');
  console.log('Starting image conversion to WebP...');
  await processDirectory(publicDir);
  console.log('Image conversion completed!');
}

main().catch(console.error);