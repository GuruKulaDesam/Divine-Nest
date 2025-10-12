import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function generateAndroidIcons() {
  const inputSvg = path.join(__dirname, 'public', 'logo-light.svg');

  // Android icon sizes needed
  const iconSizes = [72, 96, 128, 144, 192, 512];

  console.log('Generating Android app icons...');

  for (const size of iconSizes) {
    const outputPath = path.join(__dirname, 'public', `icon-${size}.png`);

    try {
      await sharp(inputSvg)
        .resize(size, size)
        .png()
        .toFile(outputPath);

      console.log(`✓ Generated ${size}x${size} icon: ${outputPath}`);
    } catch (error) {
      console.error(`✗ Failed to generate ${size}x${size} icon:`, error.message);
    }
  }

  console.log('Android icon generation complete!');
}

async function generateSplashScreens() {
  const inputSvg = path.join(__dirname, 'public', 'logo-light.svg');

  // Android splash screen sizes (width x height)
  const splashSizes = [
    { width: 800, height: 480 },   // HVGA
    { width: 480, height: 800 },   // HVGA portrait
    { width: 1280, height: 720 },  // HD
    { width: 720, height: 1280 },  // HD portrait
    { width: 1920, height: 1080 }, // FHD
    { width: 1080, height: 1920 }, // FHD portrait
  ];

  console.log('Generating Android splash screens...');

  for (const size of splashSizes) {
    const outputPath = path.join(__dirname, 'public', `splash-${size.width}x${size.height}.png`);

    try {
      // Create a white background with centered logo
      const logoSize = Math.min(size.width, size.height) * 0.3; // Logo takes 30% of smaller dimension

      await sharp({
        create: {
          width: size.width,
          height: size.height,
          channels: 4,
          background: { r: 255, g: 255, b: 255, alpha: 1 }
        }
      })
        .composite([{
          input: await sharp(inputSvg)
            .resize(Math.floor(logoSize), Math.floor(logoSize))
            .png()
            .toBuffer(),
          top: Math.floor((size.height - logoSize) / 2),
          left: Math.floor((size.width - logoSize) / 2)
        }])
        .png()
        .toFile(outputPath);

      console.log(`✓ Generated ${size.width}x${size.height} splash screen: ${outputPath}`);
    } catch (error) {
      console.error(`✗ Failed to generate ${size.width}x${size.height} splash screen:`, error.message);
    }
  }

  console.log('Android splash screen generation complete!');
}

// Run both functions
async function main() {
  await generateAndroidIcons();
  await generateSplashScreens();
}

main().catch(console.error);