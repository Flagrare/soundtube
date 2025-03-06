const { createCanvas, loadImage } = require("canvas");
const fs = require("fs-extra");
const path = require("path");

async function generateStoreAssets() {
  // Ensure store-assets directory exists
  await fs.ensureDir("store-assets");

  // Generate screenshots
  const screenshotSizes = [
    { width: 1280, height: 800, name: "screenshot1" },
    { width: 1280, height: 800, name: "screenshot2" },
  ];

  for (const size of screenshotSizes) {
    const canvas = createCanvas(size.width, size.height);
    const ctx = canvas.getContext("2d");

    // Set background
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, size.width, size.height);

    // Add YouTube-like interface
    ctx.fillStyle = "#282828";
    ctx.fillRect(0, 0, size.width, 56); // Top bar

    // Save the image
    const buffer = canvas.toBuffer("image/png");
    await fs.writeFile(`store-assets/${size.name}.png`, buffer);
  }

  // Generate promo tiles
  const promoSizes = [
    { width: 440, height: 280, name: "small-promo" },
    { width: 1400, height: 560, name: "marquee-promo" },
  ];

  for (const size of promoSizes) {
    const canvas = createCanvas(size.width, size.height);
    const ctx = canvas.getContext("2d");

    // Set gradient background
    const gradient = ctx.createLinearGradient(0, 0, size.width, size.height);
    gradient.addColorStop(0, "#2196F3");
    gradient.addColorStop(1, "#21CBF3");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, size.width, size.height);

    // Add text
    ctx.fillStyle = "#ffffff";
    ctx.font = `bold ${size.height / 10}px Arial`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("SoundTube", size.width / 2, size.height / 2);

    // Save the image
    const buffer = canvas.toBuffer("image/png");
    await fs.writeFile(`store-assets/${size.name}.png`, buffer);
  }

  console.log("Store assets generated successfully!");
}

generateStoreAssets().catch(console.error);
