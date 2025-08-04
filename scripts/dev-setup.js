#!/usr/bin/env node

const path = require('path');
const {
    validateBrowser,
    ensureDistDirectory,
    createManifest,
    createPlaceholderIcons
} = require('./shared-utils');

// Get and validate browser argument
const browser = validateBrowser(process.argv[2]);

console.log(`Setting up development environment for ${browser}...`);

try {
    // Ensure dist directory exists
    const distDir = ensureDistDirectory(false);

    // Generate and write manifest.json for the browser
    createManifest(browser, distDir);

    // Create placeholder icons if they don't exist
    const iconsDir = path.join(distDir, 'icons');
    createPlaceholderIcons(iconsDir);

    console.log(`Development setup complete for ${browser}!`);
    console.log(`You can now load the extension from the dist/ directory in ${browser}.`);

} catch (error) {
    console.error(`Error setting up development environment for ${browser}:`, error);
    process.exit(1);
}