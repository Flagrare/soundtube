const fs = require("fs-extra");
const path = require("path");

async function updateManifestVersion() {
  const packageJson = await fs.readJson("package.json");
  const manifestPath = path.join(__dirname, "..", "manifest.json");
  const manifest = await fs.readJson(manifestPath);

  manifest.version = packageJson.version;

  await fs.writeJson(manifestPath, manifest, { spaces: 2 });
  console.log(`Updated manifest.json version to ${packageJson.version}`);
}

updateManifestVersion().catch(console.error);
