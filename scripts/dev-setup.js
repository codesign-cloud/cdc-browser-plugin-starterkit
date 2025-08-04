#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { mergeConfigs } = require('./merge-config');

// Get browser argument
const browser = process.argv[2];

// Validate browser argument
if (!browser) {
    console.error('Please specify a browser: firefox, chrome, or edge');
    process.exit(1);
}

const supportedBrowsers = ['firefox', 'chrome', 'edge', 'tor'];
if (!supportedBrowsers.includes(browser)) {
    console.error(`Unsupported browser: ${browser}. Supported browsers: ${supportedBrowsers.join(', ')}`);
    process.exit(1);
}

console.log(`Setting up development environment for ${browser}...`);

try {
    // Check if dist directory exists
    const distDir = path.join(__dirname, '..', 'dist');
    if (!fs.existsSync(distDir)) {
        console.error('Dist directory not found. Please run "npm run build" first.');
        process.exit(1);
    }

    // Generate and write manifest.json for the browser
    console.log(`Creating ${browser} manifest for development...`);
    const manifest = mergeConfigs(browser);
    fs.writeFileSync(path.join(distDir, 'manifest.json'), JSON.stringify(manifest, null, 2));

    // Create icons directory if it doesn't exist
    const iconsDir = path.join(distDir, 'icons');
    if (!fs.existsSync(iconsDir)) {
        fs.mkdirSync(iconsDir);
    }

    // Create placeholder icons if they don't exist
    const iconSizes = [16, 48, 128];
    iconSizes.forEach(size => {
        const iconPath = path.join(iconsDir, `icon${size}.png`);
        if (!fs.existsSync(iconPath)) {
            console.log(`Creating placeholder icon ${size}x${size}...`);
            // Create a simple PNG file (this is just a placeholder)
            const placeholderIcon = Buffer.from('iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAQAAADZc7J/AAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAAmJLR0QA/4ePzL8AAAAHdElNRQfkBhAWFhYWFhYWDZCqAAAAjUlEQVRIx7WVwQ3AIAwDbcT+IzN0kR6KHJwqKiIlfmAnCQD8n6w1J8QYY4wxxhhjjDHGGGOMMcYYY4wxxhhjjDHGGGOMMcYYY4wxxhhjjDHGGGOMMcYYY4wxxhhjjDHGGGOMMcYYY4wxxhhjjDHGGGOMMcYYY4wxxhhjjDHGGGOMMcYYY4wx9i4P3wATwWFjTyoAAAAldEVYdGRhdGU6Y3JlYXRlADIwMjMtMDgtMDRUMjA6MjA6MTcrMDA6MDAmqXYPAAAAJXRFWHRkYXRlOm1vZGlmeQAyMDIzLTA4LTA0VDIwOjIwOjE3KzAwOjAwFOrIjgAAAABJRU5ErkJggg==', 'base64');
            fs.writeFileSync(iconPath, placeholderIcon);
        }
    });

    console.log(`Development setup complete for ${browser}!`);
    console.log(`You can now load the extension from the dist/ directory in ${browser}.`);

} catch (error) {
    console.error(`Error setting up development environment for ${browser}:`, error);
    process.exit(1);
}