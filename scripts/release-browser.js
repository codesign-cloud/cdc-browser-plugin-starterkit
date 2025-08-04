#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
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

console.log(`Creating release package for ${browser}...`);

try {
    // Check if dist directory exists, if not build the project
    const distDir = path.join(__dirname, '..', 'dist');
    if (!fs.existsSync(distDir)) {
        console.log('Dist directory not found. Building project...');
        execSync('npm run build', { stdio: 'inherit' });
    } else {
        console.log('Using existing dist directory');
    }

    // Create release directory if it doesn't exist
    const releaseDir = path.join(__dirname, '..', 'release');
    if (!fs.existsSync(releaseDir)) {
        fs.mkdirSync(releaseDir);
    }

    // Create browser-specific release directory
    const browserReleaseDir = path.join(releaseDir, browser);
    if (!fs.existsSync(browserReleaseDir)) {
        fs.mkdirSync(browserReleaseDir);
    }

    // Copy dist contents to browser release directory
    console.log(`Copying files to ${browser} release directory...`);
    execSync(`xcopy /E /I /Y "${distDir}" "${browserReleaseDir}"`, { stdio: 'inherit' });

    // Merge configs and create manifest.json for the browser
    console.log(`Creating ${browser} manifest...`);
    const manifest = mergeConfigs(browser);
    fs.writeFileSync(path.join(browserReleaseDir, 'manifest.json'), JSON.stringify(manifest, null, 2));

    // Create icons directory if it doesn't exist
    const iconsDir = path.join(browserReleaseDir, 'icons');
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