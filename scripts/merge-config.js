#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

function mergeConfigs(browser) {
    // Load common config
    const commonConfigPath = path.join(__dirname, '..', 'config', 'common.json');
    const commonConfig = JSON.parse(fs.readFileSync(commonConfigPath, 'utf8'));

    // Load browser-specific config
    const browserConfigPath = path.join(__dirname, '..', 'config', `${browser}.json`);
    const browserConfig = JSON.parse(fs.readFileSync(browserConfigPath, 'utf8'));

    // Merge configs (browser-specific overrides common)
    const mergedConfig = { ...commonConfig, ...browserConfig };

    // If both configs have the same top-level keys, browser config overrides common
    // For nested objects, we need to merge them properly
    Object.keys(commonConfig).forEach(key => {
        if (typeof commonConfig[key] === 'object' && typeof browserConfig[key] === 'object' && browserConfig[key] !== null) {
            mergedConfig[key] = { ...commonConfig[key], ...browserConfig[key] };
        }
    });

    return mergedConfig;
}

module.exports = { mergeConfigs };