#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const {
    validateBrowser,
    ensureDistDirectory,
    ensureDirectoryExists,
    createManifest,
    createPlaceholderIcons
} = require('./shared-utils');

// Get and validate browser argument
const browser = validateBrowser(process.argv[2]);

console.log(`Creating release package for ${browser}...`);

try {
    // Check if dist directory exists, if not build the project
    const distDir = ensureDistDirectory(true);

    // Create release directory if it doesn't exist
    const releaseDir = path.join(__dirname, '..', 'release');
    ensureDirectoryExists(releaseDir);

    // Create browser-specific release directory
    const browserReleaseDir = path.join(releaseDir, browser);
    ensureDirectoryExists(browserReleaseDir);

    // Copy dist contents to browser release directory
    console.log(`Copying files to ${browser} release directory...`);
    execSync(`xcopy /E /I /Y "${distDir}" "${browserReleaseDir}"`, { stdio: 'inherit' });

    // Create manifest.json for the browser
    createManifest(browser, browserReleaseDir);

    // Create placeholder icons if they don't exist
    const iconsDir = path.join(browserReleaseDir, 'icons');
    createPlaceholderIcons(iconsDir);

    // Create zip package
    const packageName = `preact-tailwind-starterkit.${browser}.zip`;
    const packagePath = path.join(releaseDir, packageName);

    console.log(`Creating package: ${packageName}`);

    // Change to browser release directory and create zip
    process.chdir(browserReleaseDir);

    // Remove existing package if it exists
    const fullPackagePath = path.join(releaseDir, packageName);
    if (fs.existsSync(fullPackagePath)) {
        fs.unlinkSync(fullPackagePath);
    }

    // Create zip using PowerShell (Windows) - compress contents, not the folder itself
    execSync(`powershell -Command "Compress-Archive -Path '*' -DestinationPath '${fullPackagePath}' -Force"`, { stdio: 'inherit' });

    // Change back to original directory
    process.chdir(path.join(__dirname, '..'));

    // Clean up browser release directory
    execSync(`rd /s /q "${browserReleaseDir}"`, { stdio: 'inherit' });

    console.log(`${browser} release package created successfully: ${packageName}`);

} catch (error) {
    console.error(`Error creating release package for ${browser}:`, error);
    process.exit(1);
}