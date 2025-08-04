#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

/**
 * Supported browsers list
 */
const SUPPORTED_BROWSERS = ['firefox', 'chrome', 'edge', 'tor'];

/**
 * Validates browser argument from command line
 * @param {string} browser - Browser name from process.argv
 * @returns {string} - Validated browser name
 * @throws {Error} - Exits process if validation fails
 */
function validateBrowser(browser) {
    if (!browser) {
        console.error('Please specify a browser: firefox, chrome, or edge');
        process.exit(1);
    }

    if (!SUPPORTED_BROWSERS.includes(browser)) {
        console.error(`Unsupported browser: ${browser}. Supported browsers: ${SUPPORTED_BROWSERS.join(', ')}`);
        process.exit(1);
    }

    return browser;
}

/**
 * Ensures a directory exists, creates it if it doesn't
 * @param {string} dirPath - Path to directory
 * @param {string} description - Description for logging (optional)
 */
function ensureDirectoryExists(dirPath, description = '') {
    if (!fs.existsSync(dirPath)) {
        if (description) {
            console.log(`Creating ${description} directory...`);
        }
        fs.mkdirSync(dirPath, { recursive: true });
    }
}

/**
 * Creates placeholder icons if they don't exist
 * @param {string} iconsDir - Path to icons directory
 */
function createPlaceholderIcons(iconsDir) {
    // Ensure icons directory exists
    ensureDirectoryExists(iconsDir);

    const iconSizes = [16, 48, 128];
    const placeholderIconData = 'iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAQAAADZc7J/AAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAAmJLR0QA/4ePzL8AAAAHdElNRQfkBhAWFhYWFhYWDZCqAAAAjUlEQVRIx7WVwQ3AIAwDbcT+IzN0kR6KHJwqKiIlfmAnCQD8n6w1J8QYY4wxxhhjjDHGGGOMMcYYY4wxxhhjjDHGGGOMMcYYY4wxxhhjjDHGGGOMMcYYY4wxxhhjjDHGGGOMMcYYY4wxxhhjjDHGGGOMMcYYY4wxxhhjjDHGGGOMMcYYY4wx9i4P3wATwWFjTyoAAAAldEVYdGRhdGU6Y3JlYXRlADIwMjMtMDgtMDRUMjA6MjA6MTcrMDA6MDAmqXYPAAAAJXRFWHRkYXRlOm1vZGlmeQAyMDIzLTA4LTA0VDIwOjIwOjE3KzAwOjAwFOrIjgAAAABJRU5ErkJggg==';

    iconSizes.forEach(size => {
        const iconPath = path.join(iconsDir, `icon${size}.png`);
        if (!fs.existsSync(iconPath)) {
            console.log(`Creating placeholder icon ${size}x${size}...`);
            const placeholderIcon = Buffer.from(placeholderIconData, 'base64');
            fs.writeFileSync(iconPath, placeholderIcon);
        }
    });
}

/**
 * Checks if dist directory exists and handles accordingly
 * @param {boolean} buildIfMissing - Whether to build if dist is missing
 * @returns {string} - Path to dist directory
 */
function ensureDistDirectory(buildIfMissing = false) {
    const distDir = path.join(__dirname, '..', 'dist');

    if (!fs.existsSync(distDir)) {
        if (buildIfMissing) {
            console.log('Dist directory not found. Building project...');
            const { execSync } = require('child_process');
            execSync('npm run build', { stdio: 'inherit' });
        } else {
            console.error('Dist directory not found. Please run "npm run build" first.');
            process.exit(1);
        }
    }

    return distDir;
}

/**
 * Creates manifest.json file for specified browser
 * @param {string} browser - Browser name
 * @param {string} targetDir - Directory to write manifest to
 */
function createManifest(browser, targetDir) {
    const { mergeConfigs } = require('./merge-config');
    console.log(`Creating ${browser} manifest...`);
    const manifest = mergeConfigs(browser);
    fs.writeFileSync(path.join(targetDir, 'manifest.json'), JSON.stringify(manifest, null, 2));
}

module.exports = {
    SUPPORTED_BROWSERS,
    validateBrowser,
    ensureDirectoryExists,
    createPlaceholderIcons,
    ensureDistDirectory,
    createManifest
};