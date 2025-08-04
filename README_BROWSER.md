# Browser Setup Guide

This guide explains how to run the Preact + Tailwind CSS starter kit as a browser extension/plugin in Firefox, Chrome, Edge, Tor Browser, and Opera for both development and production modes.

## Table of Contents

- [Firefox](#firefox)
  - [Development Mode](#firefox-development-mode)
  - [Production Mode](#firefox-production-mode)
- [Chrome](#chrome)
  - [Development Mode](#chrome-development-mode)
  - [Production Mode](#chrome-production-mode)
- [Edge](#edge)
  - [Development Mode](#edge-development-mode)
  - [Production Mode](#edge-production-mode)
- [Tor Browser](#tor-browser)
  - [Development Mode](#tor-browser-development-mode)
  - [Production Mode](#tor-browser-production-mode)
- [Opera](#opera)

## Firefox

### Firefox Development Mode

1. **Prepare the extension for Firefox**:

   ```bash
   npm run dev:firefox
   ```

   This will build the project and create a Firefox-compatible `manifest.json` in the `dist/` directory.

2. **Open Firefox** and navigate to `about:debugging#/runtime/this-firefox`.

3. Click on **"Load Temporary Add-on..."**.

4. Navigate to your project's `dist/` directory and select the `manifest.json` file.

5. The extension will be loaded temporarily.

**Note**: For development in Firefox, temporary add-ons are automatically allowed. If you encounter signing issues, you can:

- Use Firefox Developer Edition or Nightly builds
- Or set `xpinstall.signatures.required` to `false` in `about:config` (not recommended for regular browsing)

**Hot Reload**: To see changes, you need to rebuild (`npm run dev:firefox`) and click "Reload" next to your extension in the debugging page.

### Firefox Production Mode

1. **Create the production package**:

   ```bash
   npm run release:firefox
   ```

   This creates a production-ready Firefox extension package in the `release/` directory as `preact-tailwind-starterkit.firefox.zip`.

2. **Install the extension for testing**:
   - Open Firefox and navigate to `about:addons`.
   - Click the gear icon and select "Install Add-on From File...".
   - Select the `.zip` file from the `release/` directory.
   - Confirm the installation.

3. **For Firefox Add-ons store submission**:
   - Upload the `.zip` file to [Mozilla Add-ons](https://addons.mozilla.org/developers/)
   - The file will be automatically signed during the review process.

## Chrome

### Chrome Development Mode

1. **Prepare the extension for Chrome**:

   ```bash
   npm run dev:chrome
   ```

   This will build the project and create a Chrome-compatible `manifest.json` in the `dist/` directory.

2. **Open Chrome** and navigate to `chrome://extensions/`.

3. Enable **"Developer mode"** by toggling the switch in the top right corner.

4. Click on **"Load unpacked"**.

5. Navigate to your project's `dist/` directory and select the entire folder.

6. The extension will be loaded for development.

**Hot Reload**: To see changes, rebuild with `npm run dev:chrome` and click the refresh icon next to your extension in the extensions page.

### Chrome Production Mode

1. **Create the production package**:

   ```bash
   npm run release:chrome
   ```

   This creates a production-ready Chrome extension package in the `release/` directory as `preact-tailwind-starterkit.chrome.zip`.

2. **Install the extension for testing**:
   - Open Chrome and navigate to `chrome://extensions/`.
   - Enable "Developer mode".
   - Drag and drop the `.zip` file onto the extensions page, or click "Load unpacked" and select the extracted contents.

3. **For Chrome Web Store submission**:
   - Upload the `.zip` file to the [Chrome Web Store Developer Dashboard](https://chrome.google.com/webstore/devconsole/).

## Edge

### Edge Development Mode

1. **Prepare the extension for Edge**:

   ```bash
   npm run dev:edge
   ```

   This will build the project and create an Edge-compatible `manifest.json` in the `dist/` directory.

2. **Open Edge** and navigate to `edge://extensions/`.

3. Enable **"Developer mode"** by toggling the switch in the bottom left corner.

4. Click on **"Load unpacked"**.

5. Navigate to your project's `dist/` directory and select the entire folder.

6. The extension will be loaded for development.

**Hot Reload**: To see changes, rebuild with `npm run dev:edge` and click the refresh icon next to your extension in the extensions page.

### Edge Production Mode

1. **Create the production package**:

   ```bash
   npm run release:edge
   ```

   This creates a production-ready Edge extension package in the `release/` directory as `preact-tailwind-starterkit.edge.zip`.

2. **Install the extension for testing**:
   - Open Edge and navigate to `edge://extensions/`.
   - Enable "Developer mode".
   - Drag and drop the `.zip` file onto the extensions page, or click "Load unpacked" and select the extracted contents.

3. **For Microsoft Edge Add-ons store submission**:
   - Upload the `.zip` file to the [Microsoft Edge Add-ons Developer Dashboard](https://partner.microsoft.com/dashboard/microsoftedge/).

## Tor Browser

**Tor Browser Compatibility**: Tor Browser is based on Firefox but has stricter security policies and content security requirements.

### Tor Browser Development Mode

1. **Prepare the extension for Tor Browser**:

   ```bash
   npm run dev:tor
   ```

   This will build the project and create a Tor Browser-compatible `manifest.json` with stricter security policies in the `dist/` directory.

2. **Open Tor Browser** and navigate to `about:debugging#/runtime/this-firefox`.

3. Click on **"Load Temporary Add-on..."**.

4. Navigate to your project's `dist/` directory and select the `manifest.json` file.

5. The extension will be loaded temporarily.

**Important Notes for Tor Browser**:

- Tor Browser has stricter Content Security Policy (CSP) - no `'unsafe-eval'` allowed
- Some permissions may be restricted for privacy reasons
- Extensions should not compromise user anonymity
- Test thoroughly as Tor Browser may block certain extension behaviors

**Hot Reload**: To see changes, rebuild with `npm run dev:tor` and click "Reload" next to your extension in the debugging page.

### Tor Browser Production Mode

1. **Create the production package**:

   ```bash
   npm run release:tor
   ```

   This creates a Tor Browser-compatible extension package in the `release/` directory as `preact-tailwind-starterkit.tor.zip`.

2. **Install the extension for testing**:
   - Open Tor Browser and navigate to `about:addons`.
   - Click the gear icon and select "Install Add-on From File...".
   - Select the `.zip` file from the `release/` directory.
   - Confirm the installation.

3. **Distribution**:
   - Tor Browser users typically install extensions manually
   - Consider providing installation instructions for privacy-conscious users
   - Extensions should be distributed through secure channels

## Opera

**Opera Compatibility**: Opera uses the same Chromium engine as Chrome, so it's 100% compatible with Chrome extensions.

### Opera Development Mode

1. **Use Chrome setup**:

   ```bash
   npm run dev:chrome
   ```

2. **Open Opera** and navigate to `opera://extensions/`.

3. Enable **"Developer mode"** by toggling the switch in the top right corner.

4. Click on **"Load unpacked extension"**.

5. Navigate to your project's `dist/` directory and select the entire folder.

6. The extension will be loaded for development.

**Hot Reload**: Same as Chrome - rebuild with `npm run dev:chrome` and click the refresh icon.

### Opera Production Mode

**Use the Chrome package**: Opera extensions use the same format as Chrome extensions.

1. **Create the package**:

   ```bash
   npm run release:chrome
   ```

2. **Distribution options**:
   - **Opera Add-ons**: Upload the Chrome `.zip` file to [Opera Add-ons](https://addons.opera.com/developer/)
   - **Chrome Web Store**: Opera users can install directly from the Chrome Web Store

**Note**: Most Opera extension developers publish to the Chrome Web Store since Opera automatically supports Chrome extensions.

## Important Notes

### Development Workflow

- **Browser-specific setup**: Use `npm run dev:firefox`, `npm run dev:chrome`, or `npm run dev:edge` to prepare your extension for development in each browser.
- **Manifest generation**: The project automatically generates browser-specific `manifest.json` files based on the configurations in the `config/` directory.
- **Hot reload**: After making code changes, you need to rebuild using the appropriate `dev:browser` command and manually reload the extension in the browser.

### Debugging

- **Firefox**: Use the Browser Console (`Ctrl+Shift+J`) and the extension's debugging page at `about:debugging#/runtime/this-firefox`.
- **Chrome**: Use Developer Tools (`F12`) and the Extensions page at `chrome://extensions/` for debugging.
- **Edge**: Use Developer Tools (`F12`) and the Extensions page at `edge://extensions/` for debugging.
- **Opera**: Same as Chrome - use Developer Tools (`F12`) and the Extensions page at `opera://extensions/` for debugging.

### Production Releases

- **Package creation**: Use `npm run release:firefox`, `npm run release:chrome`, or `npm run release:edge` to create store-ready packages.
- **All browsers**: Use `npm run release:all` to create packages for all three browsers at once.
- **Store submission**: Submit your extension to each browser's respective extension store:
  - Firefox: [Mozilla Add-ons](https://addons.mozilla.org/developers/)
  - Chrome: [Chrome Web Store Developer Dashboard](https://chrome.google.com/webstore/devconsole/)
  - Edge: [Microsoft Edge Add-ons](https://partner.microsoft.com/dashboard/microsoftedge/)
  - Opera: [Opera Add-ons](https://addons.opera.com/developer/) or Chrome Web Store (recommended)

### Browser Compatibility Overview

This extension supports multiple browsers through three main configurations:

#### Browsers Using Chrome Setup (Manifest V3)

**Use `npm run dev:chrome` and `npm run release:chrome`**

- ✅ **Google Chrome** - Primary target
- ✅ **Microsoft Edge** - Has dedicated config but Chrome setup also works
- ✅ **Opera** - Full compatibility with Chrome extensions
- ✅ **Brave Browser** - Chromium-based, supports Chrome extensions
- ✅ **Vivaldi** - Chromium-based, supports Chrome extensions
- ✅ **Arc Browser** - Chromium-based, supports Chrome extensions
- ✅ **Kiwi Browser** (Android) - Mobile Chromium with extension support
- ✅ **Yandex Browser** - Chromium-based, supports Chrome extensions

#### Browsers Using Firefox Setup (Manifest V2)

**Use `npm run dev:firefox` and `npm run release:firefox`**

- ✅ **Mozilla Firefox** - Primary target
- ✅ **Firefox Developer Edition** - Same as Firefox
- ✅ **Firefox Nightly** - Same as Firefox
- ✅ **Firefox ESR** - Same as Firefox

#### Browsers Requiring Separate Builds

**These would need additional configuration files and build scripts:**

- ❌ **Safari** - Uses different extension system (Safari App Extensions/Safari Web Extensions)
  - Requires Xcode and different manifest format
  - Needs separate development setup
- ❌ **Tor Browser** - Based on Firefox but has strict security policies
  - May require modified permissions and CSP
- ❌ **Legacy Internet Explorer** - No modern extension support
- ❌ **Legacy Edge (EdgeHTML)** - Discontinued, replaced by Chromium Edge

#### Mobile Browser Extensions

- ✅ **Kiwi Browser (Android)** - Uses Chrome setup
- ✅ **Firefox Mobile** - Uses Firefox setup (limited extension support)
- ❌ **Chrome Mobile** - No extension support
- ❌ **Safari Mobile** - Different extension system

### Testing

- Always test your extension in all target browsers before releasing.
- Test both development and production builds to ensure compatibility.
- Verify that all features work correctly across different browser versions.
- **Chromium-based browsers**: Testing in Chrome covers most Chromium-based browsers
- **Firefox variants**: Testing in Firefox covers Firefox Developer Edition and ESR
